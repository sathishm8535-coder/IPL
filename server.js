const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Serve static files from Frontend folder
app.use(express.static(path.join(__dirname, 'Frontend')));

// Route for root URL - serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend/login.html'));
});

const rooms = {};

function checkRoomReadiness(roomId) {
  const room = rooms[roomId];
  if (!room) return;
  
  if (room.players.length >= 2) {
    io.to(roomId).emit('gameReady', { playerCount: room.players.length });
    console.log(`✅ Room ${roomId} is ready with ${room.players.length} players`);
  } else {
    io.to(roomId).emit('waitingForPlayers', { playerCount: room.players.length });
    console.log(`⏳ Room ${roomId} waiting for players (${room.players.length}/2)`);
  }
}

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on("createRoom", (userData) => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();

    rooms[roomId] = {
      players: [{ socketId: socket.id, userData: userData || { name: 'Anonymous' } }],
      gameState: { 
        currentPlayerIndex: 0, 
        currentPrice: 0,
        phase: 'team_selection',
        selectedTeams: [],
        teams: [],
        highestBidderIdx: -1
      }
    };

    socket.join(roomId);

    console.log("🏠 Room created:", roomId);
    socket.emit("roomCreated", roomId);
    
    checkRoomReadiness(roomId);
  });

  socket.on("joinRoom", (data) => {
    const roomId = (typeof data === 'string' ? data : data.roomId)?.toUpperCase().trim();
    const userData = typeof data === 'object' ? data.userData : null;

    if (!roomId) {
      return socket.emit("joinError", "Invalid room ID");
    }

    console.log("🔍 Trying to join:", roomId);
    console.log("📊 Available rooms:", Object.keys(rooms));

    const room = rooms[roomId];
    
    if (!room) {
      console.log("❌ Room not found:", roomId);
      return socket.emit("joinError", "Room not found");
    }

    // Check if already in room
    const existingPlayer = room.players.find(p => p.socketId === socket.id);
    if (existingPlayer) {
      console.log("🔄 Player reconnecting:", roomId);
      socket.join(roomId);
      socket.emit("joinedRoom", { roomId, players: room.players, gameState: room.gameState });
      checkRoomReadiness(roomId);
      return;
    }

    // Check room capacity (max 10 players)
    if (room.players.length >= 10) {
      console.log("❌ Room full:", roomId);
      return socket.emit("joinError", "Room is full");
    }

    room.players.push({ socketId: socket.id, userData: userData || { name: 'Anonymous' } });
    socket.join(roomId);

    console.log("✅ Player joined:", roomId, "| Players:", room.players.length);

    socket.emit("joinedRoom", { roomId, players: room.players, gameState: room.gameState });
    socket.to(roomId).emit("playerJoined", { player: { socketId: socket.id, ...userData }, playerCount: room.players.length });

    checkRoomReadiness(roomId);
  });

  // Team selection synchronization
  socket.on('selectTeam', (data) => {
    const { roomId, teamName, playerInfo } = data;
    const room = rooms[roomId];
    
    if (!room) {
      socket.emit('teamSelectError', 'Room not found');
      return;
    }

    // Check if team already selected
    if (room.gameState.selectedTeams.includes(teamName)) {
      socket.emit('teamSelectError', 'Team already selected by another player');
      return;
    }

    // Add team to selected teams
    room.gameState.selectedTeams.push(teamName);
    
    // Broadcast team selection to all players in room
    io.to(roomId).emit('teamSelected', {
      teamName,
      playerId: socket.id,
      playerInfo,
      selectedTeams: room.gameState.selectedTeams
    });

    console.log('Team selected:', teamName, 'in room:', roomId);
  });

  socket.on('startAuction', (data) => {
    const { roomId, teams } = data;
    const room = rooms[roomId];
    if (room) {
      room.gameState.teams = teams;
      room.gameState.phase = 'auction';
      room.gameState.currentPlayerIndex = 0;
      room.gameState.currentPrice = 0;
      room.gameState.highestBidderIdx = -1;
      
      io.to(roomId).emit('auctionStarted', { 
        teams, 
        gameState: room.gameState 
      });
      console.log('Auction started in room:', roomId);
    }
  });

  socket.on('placeBid', (data) => {
    const { roomId, bidAmount, teamIndex, playerName, socketId } = data;
    const room = rooms[roomId];
    if (room && room.gameState.phase === 'auction') {
      room.gameState.currentPrice = bidAmount;
      room.gameState.highestBidderIdx = teamIndex;
      
      io.to(roomId).emit('bidPlaced', { 
        bidAmount, 
        teamIndex, 
        playerName, 
        socketId 
      });
      console.log('Bid placed in room:', roomId, 'Amount:', bidAmount);
    }
  });

  socket.on('playerAssigned', (data) => {
    const { roomId, player, winningTeam, price, skipped } = data;
    const room = rooms[roomId];
    if (room) {
      // Update room's game state
      if (winningTeam && !skipped) {
        const teamIndex = room.gameState.teams.findIndex(t => t.teamName === winningTeam.teamName);
        if (teamIndex !== -1) {
          room.gameState.teams[teamIndex] = winningTeam;
        }
      }
      
      io.to(roomId).emit('playerAssigned', data);
      console.log('Player assigned in room:', roomId, 'Player:', player.name);
    }
  });

  socket.on('nextPlayer', (data) => {
    const { roomId, playerIndex } = data;
    const room = rooms[roomId];
    if (room) {
      room.gameState.currentPlayerIndex = playerIndex;
      room.gameState.currentPrice = 0;
      room.gameState.highestBidderIdx = -1;
      
      io.to(roomId).emit('nextPlayer', {
        playerIndex,
        gameState: room.gameState
      });
      console.log('Next player in room:', roomId, 'Index:', playerIndex);
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
    
    // Remove player from all rooms
    for (const roomId in rooms) {
      const room = rooms[roomId];
      const playerIndex = room.players.findIndex(p => p.socketId === socket.id);
      if (playerIndex !== -1) {
        const disconnectedPlayer = room.players[playerIndex];
        room.players.splice(playerIndex, 1);
        
        console.log('🚪 Player left room:', roomId, '| Remaining:', room.players.length);
        
        // Notify other players
        socket.to(roomId).emit('playerLeft', {
          playerId: socket.id,
          playerCount: room.players.length,
          playerData: disconnectedPlayer.userData
        });
        
        // Check if room should be deleted or needs more players
        if (room.players.length === 0) {
          delete rooms[roomId];
          console.log('🗑️ Deleted empty room:', roomId, '| Total rooms:', Object.keys(rooms).length);
        } else {
          // Check readiness (will emit waitingForPlayers if < 2 players)
          checkRoomReadiness(roomId);
        }
        
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🏏 IPL Auction Server running on port ${PORT}`);
  console.log(`🌐 Open your browser: http://localhost:${PORT}`);
  
  // Auto-open browser on Windows
  const { exec } = require('child_process');
  exec(`start http://localhost:${PORT}`);
});
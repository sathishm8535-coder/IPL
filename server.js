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

const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('createRoom', (userData) => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log('Creating room:', roomId);
    rooms.set(roomId, {
      id: roomId,
      players: [{ socketId: socket.id, userData: userData || { name: 'Anonymous' } }],
      gameState: { 
        currentPlayerIndex: 0, 
        currentPrice: 0,
        phase: 'team_selection', // team_selection, auction, completed
        selectedTeams: [], // Track selected IPL teams
        teams: [], // Final team configurations
        highestBidderIdx: -1
      }
    });
    socket.join(roomId);
    socket.emit('roomCreated', roomId);
    console.log('Room created successfully:', roomId, 'Total rooms:', rooms.size);
  });

  socket.on('joinRoom', (data) => {
    console.log('Join room request:', data);
    const { roomId, userData } = data;
    
    if (!roomId) {
      console.log('No room ID provided');
      socket.emit('joinError', 'Room ID is required');
      return;
    }
    
    const upperRoomId = roomId.toString().toUpperCase().trim();
    console.log('Looking for room:', upperRoomId);
    console.log('Available rooms:', Array.from(rooms.keys()));
    
    const room = rooms.get(upperRoomId);
    
    if (!room) {
      console.log('Room not found!');
      socket.emit('joinError', 'Room not found');
      return;
    }
    
    if (room.players.length >= 10) {
      console.log('Room is full');
      socket.emit('joinError', 'Room is full (max 10 players)');
      return;
    }
    
    // Check if player already in room
    const existingPlayer = room.players.find(p => p.socketId === socket.id);
    if (existingPlayer) {
      console.log('Player already in room');
      socket.emit('joinError', 'You are already in this room');
      return;
    }
    
    // Add player to room
    room.players.push({ socketId: socket.id, userData: userData || { name: 'Anonymous' } });
    socket.join(upperRoomId);
    
    socket.emit('joinedRoom', {
      roomId: upperRoomId,
      players: room.players,
      gameState: room.gameState
    });
    
    socket.to(upperRoomId).emit('playerJoined', {
      playerId: socket.id,
      playerCount: room.players.length,
      newPlayer: userData
    });
    
    console.log('Player joined room successfully:', upperRoomId, 'Total players:', room.players.length);
  });

  // Team selection synchronization
  socket.on('selectTeam', (data) => {
    const { roomId, teamName, playerInfo } = data;
    const room = rooms.get(roomId);
    
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
    const room = rooms.get(roomId);
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
    const room = rooms.get(roomId);
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
    const room = rooms.get(roomId);
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
    const room = rooms.get(roomId);
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
    console.log('User disconnected:', socket.id);
    
    // Remove player from all rooms
    for (const [roomId, room] of rooms.entries()) {
      const playerIndex = room.players.findIndex(p => p.socketId === socket.id);
      if (playerIndex !== -1) {
        const disconnectedPlayer = room.players[playerIndex];
        room.players.splice(playerIndex, 1);
        console.log('Removed player from room:', roomId, 'Remaining players:', room.players.length);
        
        // Remove any team selections by this player
        // Note: In a real implementation, you might want to handle this differently
        
        // Notify other players
        socket.to(roomId).emit('playerLeft', {
          playerId: socket.id,
          playerCount: room.players.length,
          playerData: disconnectedPlayer.userData
        });
        
        // Delete room if empty
        if (room.players.length === 0) {
          rooms.delete(roomId);
          console.log('Deleted empty room:', roomId);
        }
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
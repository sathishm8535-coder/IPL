const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Serve static frontend files
const frontendPath = path.join(__dirname, 'Frontend');
app.use(express.static(frontendPath));

const server = http.createServer(app);

// Use a highly robust Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

/* ═══════════════════════════════════════
   ROOM MANAGEMENT
═══════════════════════════════════════ */
// Store rooms in memory: { roomId: { players: [{ socketId, userData }], gameState: {} } }
const rooms = {};

// Helper to check and emit room readiness loosely
function checkRoomReadiness(roomId) {
  const room = rooms[roomId];
  if (!room) return;
  // If at least one human player is technically in the room
  io.to(roomId).emit('gameReady', { playerCount: room.players.length });
  console.log(`📡 Room ${roomId} status broadcasted. Players: ${room.players.length}`);
}

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  /* ----------------------------------------------------
     CREATE ROOM
  ---------------------------------------------------- */
  socket.on("createRoom", (userData) => {
    // Generate a unique 6-character room ID
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Initialize the room structure
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

    // Join the socket.io room
    socket.join(roomId);

    // Store roomId on the socket for easy lookup during disconnects
    socket.roomId = roomId;

    console.log("🏠 Room created:", roomId);
    socket.emit("roomCreated", roomId);
    checkRoomReadiness(roomId);
  });

  /* ----------------------------------------------------
     JOIN ROOM
  ---------------------------------------------------- */
  socket.on("joinRoom", (data) => {
    const roomId = (typeof data === 'string' ? data : data.roomId)?.toUpperCase().trim();
    const userData = typeof data === 'object' ? data.userData : null;

    if (!roomId) {
      return socket.emit("joinError", "Invalid room ID");
    }

    const room = rooms[roomId];

    // 1. Room doesn't exist
    if (!room) {
      console.log(`❌ Attempted to join unknown room: ${roomId}`);
      return socket.emit("joinError", "Room not found or no longer exists");
    }

    // 2. Room is full (Max 10 players)
    if (room.players.length >= 10) {
      console.log(`❌ Room full: ${roomId}`);
      return socket.emit("joinError", "Room is full (max 10 players)");
    }

    // 3. User is already in the room (Reconnect handling)
    const existingPlayerIndex = room.players.findIndex(p => p.socketId === socket.id);
    if (existingPlayerIndex !== -1) {
      console.log(`🔄 Player reconnecting to room: ${roomId}`);
      socket.join(roomId);
      socket.roomId = roomId;
      socket.emit("joinedRoom", { roomId, players: room.players, gameState: room.gameState });
      return;
    }

    // 4. Successful Join
    const newPlayer = { socketId: socket.id, userData: userData || { name: 'Anonymous' } };
    room.players.push(newPlayer);
    socket.join(roomId);
    socket.roomId = roomId;

    console.log(`✅ Player joined room: ${roomId} | Total Players: ${room.players.length}`);

    // Send join success to the user
    socket.emit("joinedRoom", { roomId, players: room.players, gameState: room.gameState, selectedTeams: room.gameState.selectedTeams });

    // Notify EVERYONE ELSE in the room that a new player joined
    socket.to(roomId).emit('playerJoined', { player: newPlayer, playerCount: room.players.length });

    checkRoomReadiness(roomId);
  });

  /* ----------------------------------------------------
     TEAM SELECTION
  ---------------------------------------------------- */
  socket.on('selectTeam', (data) => {
    const { roomId, teamName, playerInfo } = data;
    const room = rooms[roomId];

    if (!room) return socket.emit('teamSelectError', 'Room no longer exists');

    // Check if team is already claimed
    if (room.gameState.selectedTeams.includes(teamName)) {
      socket.emit('teamSelectError', 'Team already selected by another player');
      return;
    }

    room.gameState.selectedTeams.push(teamName);

    // Broadcast team selection to everyone in the room
    io.to(roomId).emit('teamSelected', {
      teamName,
      socketId: socket.id,
      playerInfo,
      selectedTeams: room.gameState.selectedTeams
    });

    console.log(`👕 Team selected: ${teamName} in room: ${roomId}`);
  });

  /* ----------------------------------------------------
     AUCTION EVENTS
  ---------------------------------------------------- */
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
      console.log(`💰 Auction started in room: ${roomId}`);
    }
  });

  socket.on('placeBid', (data) => {
    const { roomId, bidAmount, teamIndex, playerName } = data;
    const room = rooms[roomId];
    if (room) {
      room.gameState.currentPrice = bidAmount;
      room.gameState.highestBidderIdx = teamIndex;

      io.to(roomId).emit('bidPlaced', {
        bidAmount,
        teamIndex,
        playerName,
        socketId: socket.id
      });
      console.log(`📈 Bid placed in ${roomId}: ₹${bidAmount} by team ${teamIndex}`);
    }
  });

  socket.on('nextPlayer', (data) => {
    const { roomId, playerIndex } = data;
    const room = rooms[roomId];
    if (room) {
      room.gameState.currentPlayerIndex = playerIndex;
      room.gameState.highestBidderIdx = -1;
      room.gameState.currentPrice = 0;

      io.to(roomId).emit('nextPlayer', { playerIndex });
    }
  });

  socket.on('playerAssigned', (data) => {
    const { roomId, player, winningTeam, price, skipped } = data;
    const room = rooms[roomId];
    if (room) {
      io.to(roomId).emit('playerAssigned', {
        player,
        winningTeam,
        price,
        skipped
      });
      console.log(`🤝 Player assigned in ${roomId}`);
    }
  });

  /* ----------------------------------------------------
     DISCONNECT HANDLING
  ---------------------------------------------------- */
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);

    const roomId = socket.roomId;
    if (roomId && rooms[roomId]) {
      const room = rooms[roomId];

      // Remove player from the array
      room.players = room.players.filter(p => p.socketId !== socket.id);

      console.log(`👋 Player left room ${roomId}. Remaining players: ${room.players.length}`);

      if (room.players.length === 0) {
        // Automatically cleanup empty rooms to save memory
        console.log(`🗑️ Room ${roomId} abandoned. Cleaning up.`);
        delete rooms[roomId];
      } else {
        // Notify remaining players
        io.to(roomId).emit('playerLeft', {
          playerId: socket.id,
          playerCount: room.players.length,
          selectedTeams: room.gameState.selectedTeams
        });
      }
    }
  });
});

// Serve frontend route fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running perfectly on port ${PORT}`);
});
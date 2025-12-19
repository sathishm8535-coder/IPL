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
app.use(express.static(path.join(__dirname, '../Frontend')));

// Route for root URL - serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/login.html'));
});

// Route for login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/login.html'));
});

// Route for main game (after login)
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

// API status route
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'IPL Auction Server Running', 
    rooms: rooms.size,
    timestamp: new Date().toISOString()
  });
});

const rooms = new Map();

// Log all active rooms for debugging
setInterval(() => {
  console.log('Active rooms:', Array.from(rooms.keys()));
}, 30000);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('createRoom', (userData) => {
    // Generate unique room ID
    let roomId;
    do {
      roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    } while (rooms.has(roomId));
    
    const roomData = {
      id: roomId,
      players: [{ socketId: socket.id, ...userData }],
      gameState: {
        currentPlayerIndex: 0,
        currentPrice: 0,
        highestBidder: null,
        timer: 10,
        isActive: false
      },
      teams: [],
      currentBid: null,
      createdAt: new Date().toISOString(),
      host: socket.id
    };
    rooms.set(roomId, roomData);
    socket.join(roomId);
    socket.emit('roomCreated', roomId);
    console.log(`Room ${roomId} created by ${socket.id}. Total rooms: ${rooms.size}`);
  });

  socket.on('joinRoom', (data) => {
    const { roomId, userData } = data;
    console.log(`Join attempt - Room: ${roomId}, Available rooms:`, Array.from(rooms.keys()));
    const room = rooms.get(roomId);
    if (room && room.players.length < 10) {
      // Check if player already in room
      const existingPlayer = room.players.find(p => p.socketId === socket.id);
      if (!existingPlayer) {
        room.players.push({ socketId: socket.id, ...userData });
      }
      socket.join(roomId);
      socket.emit('joinedRoom', { roomId, players: room.players });
      // Broadcast to all players in room including sender
      io.to(roomId).emit('playerJoined', { 
        playerId: socket.id, 
        playerCount: room.players.length,
        newPlayer: userData
      });
      console.log(`Player ${socket.id} joined room ${roomId}. Total players: ${room.players.length}`);
    } else {
      const errorMsg = room ? 'Room is full (max 10 players)' : 'Room not found';
      socket.emit('joinError', errorMsg);
      console.log(`Join failed for ${socket.id}: ${errorMsg}. Room exists: ${!!room}`);
    }
  });

  socket.on('startAuction', (data) => {
    const { roomId, teams } = data;
    const room = rooms.get(roomId);
    if (room) {
      room.teams = teams;
      room.gameState.isActive = true;
      room.gameState.currentPlayerIndex = 0;
      // Broadcast to ALL players in room including sender
      io.to(roomId).emit('auctionStarted', { teams, gameState: room.gameState });
      console.log(`Auction started in room ${roomId} with ${teams.length} teams`);
    }
  });

  socket.on('placeBid', (data) => {
    const { roomId, bidAmount, teamIndex, playerName, socketId } = data;
    const room = rooms.get(roomId);
    if (room && room.gameState.isActive) {
      room.gameState.currentPrice = bidAmount;
      room.gameState.highestBidder = { teamIndex, playerName };
      room.gameState.timer = 10;
      room.currentBid = { teamIndex, bidAmount, playerName, timestamp: Date.now() };
      // Broadcast to all players in room
      io.to(roomId).emit('bidPlaced', {
        bidAmount,
        teamIndex,
        playerName,
        socketId,
        gameState: room.gameState
      });
      console.log(`Bid placed in room ${roomId}: ${bidAmount} by ${playerName}`);
    }
  });

  socket.on('nextPlayer', (data) => {
    const { roomId, playerIndex } = data;
    const room = rooms.get(roomId);
    if (room) {
      room.gameState.currentPlayerIndex = playerIndex || room.gameState.currentPlayerIndex + 1;
      room.gameState.currentPrice = 0;
      room.gameState.highestBidder = null;
      room.gameState.timer = 10;
      // Broadcast to ALL players in room
      io.to(roomId).emit('playerChanged', { gameState: room.gameState });
      console.log(`Next player in room ${roomId}: index ${room.gameState.currentPlayerIndex}`);
    }
  });

  socket.on('syncGameState', (data) => {
    const { roomId, gameState } = data;
    const room = rooms.get(roomId);
    if (room) {
      room.gameState = { ...room.gameState, ...gameState };
      socket.to(roomId).emit('gameStateUpdated', room.gameState);
    }
  });

  socket.on('playerAssigned', (data) => {
    const { roomId, player, winningTeam, price, skipped } = data;
    const room = rooms.get(roomId);
    if (room) {
      // Update room teams
      if (room.teams && winningTeam && !skipped) {
        const teamIndex = room.teams.findIndex(t => t.teamName === winningTeam.teamName);
        if (teamIndex !== -1) {
          room.teams[teamIndex] = winningTeam;
        }
      }
      // Broadcast player assignment to ALL players
      io.to(roomId).emit('playerAssigned', {
        player,
        winningTeam,
        price,
        skipped
      });
      console.log(`Player ${player.name} assigned in room ${roomId}`);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove player from all rooms
    for (const [roomId, room] of rooms.entries()) {
      const playerIndex = room.players.findIndex(p => p.socketId === socket.id);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);
        socket.to(roomId).emit('playerLeft', { 
          playerId: socket.id, 
          playerCount: room.players.length 
        });
        if (room.players.length === 0) {
          rooms.delete(roomId);
          console.log(`Room ${roomId} deleted - no players left`);
        }
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Listen on all interfaces for network access

server.listen(PORT, HOST, () => {
  console.log(`🏏 IPL Auction Server running on port ${PORT}`);
  console.log(`🔐 Login Page: http://${HOST}:${PORT}`);
  console.log(`🎮 Game URL: http://${HOST}:${PORT}/game`);
  console.log(`📊 API Status: http://${HOST}:${PORT}/api/status`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
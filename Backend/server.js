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

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('createRoom', (userData) => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    rooms.set(roomId, {
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
      currentBid: null
    });
    socket.join(roomId);
    socket.emit('roomCreated', roomId);
    console.log(`Room ${roomId} created by ${socket.id}`);
  });

  socket.on('joinRoom', (data) => {
    const { roomId, userData } = data;
    const room = rooms.get(roomId);
    if (room && room.players.length < 10) {
      room.players.push({ socketId: socket.id, ...userData });
      socket.join(roomId);
      socket.emit('joinedRoom', { roomId, players: room.players });
      socket.to(roomId).emit('playerJoined', { 
        playerId: socket.id, 
        playerCount: room.players.length,
        newPlayer: userData
      });
      console.log(`Player ${socket.id} joined room ${roomId}`);
    } else {
      socket.emit('joinError', 'Room not found or full');
    }
  });

  socket.on('startAuction', (data) => {
    const { roomId, teams } = data;
    const room = rooms.get(roomId);
    if (room) {
      room.teams = teams;
      room.gameState.isActive = true;
      room.gameState.currentPlayerIndex = 0;
      // Broadcast to all other players in room
      socket.to(roomId).emit('auctionStarted', { teams, gameState: room.gameState });
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
      // Broadcast to all players except sender
      socket.to(roomId).emit('playerChanged', { gameState: room.gameState });
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
      // Broadcast player assignment to all other players
      socket.to(roomId).emit('playerAssigned', {
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
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

server.listen(PORT, HOST, () => {
  console.log(`🏏 IPL Auction Server running on port ${PORT}`);
  console.log(`🔐 Login Page: http://${HOST}:${PORT}`);
  console.log(`🎮 Game URL: http://${HOST}:${PORT}/game`);
  console.log(`📊 API Status: http://${HOST}:${PORT}/api/status`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
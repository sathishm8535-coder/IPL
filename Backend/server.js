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

  socket.on('createRoom', () => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    rooms.set(roomId, {
      id: roomId,
      players: [socket.id],
      gameState: {},
      currentBid: null
    });
    socket.join(roomId);
    socket.emit('roomCreated', roomId);
  });

  socket.on('joinRoom', (roomId) => {
    const room = rooms.get(roomId);
    if (room && room.players.length < 10) {
      room.players.push(socket.id);
      socket.join(roomId);
      socket.emit('joinedRoom', roomId);
      io.to(roomId).emit('playerJoined', { playerId: socket.id, playerCount: room.players.length });
    } else {
      socket.emit('joinError', 'Room not found or full');
    }
  });

  socket.on('placeBid', (data) => {
    const { roomId, bidAmount, playerId } = data;
    const room = rooms.get(roomId);
    if (room) {
      room.currentBid = { playerId, bidAmount, timestamp: Date.now() };
      io.to(roomId).emit('bidPlaced', room.currentBid);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
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
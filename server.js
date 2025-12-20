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
    rooms.set(roomId, {
      id: roomId,
      players: [{ socketId: socket.id, userData: userData || { name: 'Anonymous' } }],
      gameState: { currentPlayerIndex: 0, currentPrice: 0 }
    });
    socket.join(roomId);
    socket.emit('roomCreated', roomId);
  });

  socket.on('joinRoom', (data) => {
    const { roomId, userData } = data;
    const room = rooms.get(roomId?.toUpperCase());
    if (room && room.players.length < 10) {
      room.players.push({ socketId: socket.id, userData: userData || { name: 'Anonymous' } });
      socket.join(roomId.toUpperCase());
      socket.emit('joinedRoom', { roomId: roomId.toUpperCase(), players: room.players });
      socket.to(roomId.toUpperCase()).emit('playerJoined', { playerId: socket.id, playerCount: room.players.length });
    } else {
      socket.emit('joinError', room ? 'Room is full' : 'Room not found');
    }
  });

  socket.on('startAuction', (data) => {
    const { roomId, teams } = data;
    const room = rooms.get(roomId);
    if (room) {
      room.gameState.teams = teams;
      io.to(roomId).emit('auctionStarted', { teams, gameState: room.gameState });
    }
  });

  socket.on('placeBid', (data) => {
    const { roomId, bidAmount, teamIndex, playerName, socketId } = data;
    const room = rooms.get(roomId);
    if (room) {
      room.gameState.currentPrice = bidAmount;
      io.to(roomId).emit('bidPlaced', { bidAmount, teamIndex, playerName, socketId });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🏏 IPL Auction Server running on port ${PORT}`);
});
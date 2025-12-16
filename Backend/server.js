const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

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
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
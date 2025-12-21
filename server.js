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
      gameState: { currentPlayerIndex: 0, currentPrice: 0 }
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

  socket.on('startAuction', (data) => {
    const { roomId, teams } = data;
    const room = rooms.get(roomId);
    if (room) {
      room.gameState.teams = teams;
      io.to(roomId).emit('auctionStarted', { teams, gameState: room.gameState });
    }
  });

  socket.on('syncTeams', (data) => {
    const { roomId, teams } = data;
    const room = rooms.get(roomId);
    if (room) {
      room.gameState.teams = teams;
      socket.to(roomId).emit('teamsUpdated', { teams });
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
    
    // Remove player from all rooms
    for (const [roomId, room] of rooms.entries()) {
      const playerIndex = room.players.findIndex(p => p.socketId === socket.id);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);
        console.log('Removed player from room:', roomId, 'Remaining players:', room.players.length);
        
        // Notify other players
        socket.to(roomId).emit('playerLeft', {
          playerId: socket.id,
          playerCount: room.players.length
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

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Another process is listening on this port.`);
    console.error('On Windows you can run: netstat -ano | findstr :'+PORT+' to find the PID, then: taskkill /PID <pid> /F');
    process.exit(1);
  }
  console.error('Server error:', err);
  process.exit(1);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🏏 IPL Auction Server running on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => process.exit(0));
});
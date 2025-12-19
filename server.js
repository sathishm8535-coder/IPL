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

// Route for login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend/login.html'));
});

// Route for main game (after login)
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend/index.html'));
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
    console.log('Creating room:', roomId, 'for user:', userData);
    
    rooms.set(roomId, {
      id: roomId,
      players: [{
        socketId: socket.id,
        userData: userData || { name: 'Anonymous', uid: socket.id }
      }],
      gameState: {
        currentPlayerIndex: 0,
        currentPrice: 0,
        teams: []
      },
      currentBid: null
    });
    
    socket.join(roomId);
    socket.emit('roomCreated', roomId);
    console.log('Room created successfully:', roomId);
  });

  socket.on('joinRoom', (data) => {
    console.log('Join room request:', data);
    const { roomId, userData } = data;
    
    if (!roomId) {
      socket.emit('joinError', 'Room ID is required');
      return;
    }
    
    const room = rooms.get(roomId.toUpperCase());
    console.log('Room found:', room ? 'Yes' : 'No', 'for ID:', roomId.toUpperCase());
    
    if (!room) {
      socket.emit('joinError', 'Room not found');
      return;
    }
    
    if (room.players.length >= 10) {
      socket.emit('joinError', 'Room is full (max 10 players)');
      return;
    }
    
    // Check if player already in room
    const existingPlayer = room.players.find(p => p.socketId === socket.id);
    if (existingPlayer) {
      socket.emit('joinError', 'You are already in this room');
      return;
    }
    
    // Add player to room
    room.players.push({
      socketId: socket.id,
      userData: userData || { name: 'Anonymous', uid: socket.id }
    });
    
    socket.join(roomId.toUpperCase());
    
    socket.emit('joinedRoom', {
      roomId: roomId.toUpperCase(),
      players: room.players,
      gameState: room.gameState
    });
    
    // Notify other players
    socket.to(roomId.toUpperCase()).emit('playerJoined', {
      playerId: socket.id,
      playerCount: room.players.length,
      newPlayer: userData
    });
    
    console.log('Player joined room successfully:', roomId.toUpperCase(), 'Total players:', room.players.length);
  });

  socket.on('startAuction', (data) => {
    const { roomId, teams } = data;
    const room = rooms.get(roomId);
    if (room) {
      room.gameState.teams = teams;
      room.gameState.currentPlayerIndex = 0;
      room.gameState.currentPrice = 0;
      console.log('Auction started in room:', roomId);
      io.to(roomId).emit('auctionStarted', {
        teams: teams,
        gameState: room.gameState
      });
    }
  });

  socket.on('placeBid', (data) => {
    const { roomId, bidAmount, teamIndex, playerName, socketId } = data;
    const room = rooms.get(roomId);
    if (room) {
      room.currentBid = {
        bidAmount,
        teamIndex,
        playerName,
        socketId,
        timestamp: Date.now()
      };
      room.gameState.currentPrice = bidAmount;
      console.log('Bid placed in room:', roomId, 'Amount:', bidAmount, 'By:', playerName);
      io.to(roomId).emit('bidPlaced', room.currentBid);
    }
  });

  socket.on('playerAssigned', (data) => {
    const { roomId, player, winningTeam, price, skipped } = data;
    const room = rooms.get(roomId);
    if (room) {
      console.log('Player assigned in room:', roomId, 'Player:', player.name, 'Team:', winningTeam?.teamName);
      io.to(roomId).emit('playerAssigned', {
        player,
        winningTeam,
        price,
        skipped
      });
    }
  });

  socket.on('nextPlayer', (data) => {
    const { roomId, playerIndex } = data;
    const room = rooms.get(roomId);
    if (room) {
      room.gameState.currentPlayerIndex = playerIndex;
      room.gameState.currentPrice = 0;
      console.log('Next player in room:', roomId, 'Index:', playerIndex);
      io.to(roomId).emit('playerChanged', {
        gameState: room.gameState
      });
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

const PORT = process.env.PORT || 3002;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

server.listen(PORT, HOST, () => {
  console.log(`🏏 IPL Auction Server running on port ${PORT}`);
  console.log(`🔐 Login Page: http://${HOST}:${PORT}`);
  console.log(`🎮 Game URL: http://${HOST}:${PORT}/game`);
  console.log(`📊 API Status: http://${HOST}:${PORT}/api/status`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
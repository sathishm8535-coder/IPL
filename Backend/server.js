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
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  pingTimeout: 60000,
  pingInterval: 25000,
  upgradeTimeout: 30000,
  allowEIO3: true
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

// Test route to check rooms
app.get('/api/rooms', (req, res) => {
  const roomList = Array.from(rooms.entries()).map(([id, room]) => ({
    id,
    players: room.players.length,
    created: room.createdAt
  }));
  res.json({ rooms: roomList, total: rooms.size });
});

const rooms = new Map();
const roomPlayers = new Map(); // Track players in each room

// Log all active rooms for debugging
setInterval(() => {
  console.log('Active rooms:', Array.from(rooms.keys()));
  console.log('Room players:', Array.from(roomPlayers.entries()));
}, 30000);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Send connection confirmation
  socket.emit('connectionConfirmed', { socketId: socket.id, timestamp: Date.now() });

  socket.on('createRoom', (userData) => {
    // Generate unique 6-character room ID
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
      host: socket.id,
      selectedTeams: []
    };
    rooms.set(roomId, roomData);
    roomPlayers.set(socket.id, roomId);
    socket.join(roomId);
    socket.emit('roomCreated', { roomId, playerCount: 1 });
    console.log(`Room ${roomId} created by ${socket.id}`);
  });

  socket.on('joinRoom', (data) => {
    if (!data || !data.roomId) {
      socket.emit('joinError', 'Room ID required');
      return;
    }
    
    const roomId = data.roomId.toString().toUpperCase().trim();
    
    if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      
      if (!room.players.find(p => p.socketId === socket.id)) {
        room.players.push({ socketId: socket.id, ...data.userData });
      }
      
      roomPlayers.set(socket.id, roomId);
      socket.join(roomId);
      
      socket.emit('joinedRoom', { 
        roomId, 
        players: room.players,
        selectedTeams: room.selectedTeams || []
      });
      
      socket.to(roomId).emit('playerJoined', {
        player: { socketId: socket.id, ...data.userData },
        playerCount: room.players.length
      });
      
      console.log(`Player joined room ${roomId}`);
    } else {
      socket.emit('joinError', 'Room not found');
    }
  });

  // Handle team selection in multiplayer
  socket.on('selectTeam', (data) => {
    const { roomId, teamName, playerInfo } = data;
    const room = rooms.get(roomId);
    if (room) {
      if (!room.selectedTeams) room.selectedTeams = [];
      
      // Remove any previous team selection by this player
      room.selectedTeams = room.selectedTeams.filter(t => t.socketId !== socket.id);
      
      // Add new team selection
      room.selectedTeams.push({
        socketId: socket.id,
        teamName,
        playerInfo
      });
      
      // Broadcast team selection to all players in room
      io.to(roomId).emit('teamSelected', {
        socketId: socket.id,
        teamName,
        playerInfo,
        selectedTeams: room.selectedTeams.map(t => t.teamName)
      });
      
      console.log(`Team ${teamName} selected by ${socket.id} in room ${roomId}`);
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
    
    const roomId = roomPlayers.get(socket.id);
    if (roomId && rooms.has(roomId)) {
      const room = rooms.get(roomId);
      
      // Remove player from room
      const playerIndex = room.players.findIndex(p => p.socketId === socket.id);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);
        
        // Remove team selections by this player
        if (room.selectedTeams) {
          room.selectedTeams = room.selectedTeams.filter(t => t.socketId !== socket.id);
        }
        
        // Notify other players
        socket.to(roomId).emit('playerLeft', { 
          playerId: socket.id, 
          playerCount: room.players.length,
          selectedTeams: room.selectedTeams ? room.selectedTeams.map(t => t.teamName) : []
        });
        
        // Delete room if empty
        if (room.players.length === 0) {
          rooms.delete(roomId);
          console.log(`Room ${roomId} deleted - no players left`);
        }
      }
    }
    
    // Clean up player tracking
    roomPlayers.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Listen on all interfaces for network access

// Get local IP address for multiplayer setup
function getLocalIP() {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

server.listen(PORT, HOST, () => {
  const localIP = getLocalIP();
  console.log('\n🏏 IPL AUCTION SERVER STARTED!');
  console.log('=' .repeat(50));
  console.log(`🌐 Server running on port ${PORT}`);
  console.log(`\n📱 MULTIPLAYER SETUP:`);
  console.log(`   Host computer: http://${localIP}:${PORT}`);
  console.log(`   Other devices: http://${localIP}:${PORT}`);
  console.log(`\n⚠️  IMPORTANT: All devices must use the SAME URL above!`);
  console.log(`   Your IP address is: ${localIP}`);
  console.log('=' .repeat(50));
  console.log(`🔐 Login Page: http://localhost:${PORT}`);
  console.log(`🎮 Game URL: http://localhost:${PORT}/game`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please close other applications using this port.`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
  }
});
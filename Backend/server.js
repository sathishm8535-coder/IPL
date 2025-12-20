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

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('createRoom', (userData) => {
    console.log('🏠 Create room request from:', socket.id, 'with data:', userData);
    
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
      selectedTeams: [],
      currentBid: null,
      createdAt: new Date().toISOString(),
      host: socket.id
    };
    rooms.set(roomId, roomData);
    socket.join(roomId);
    socket.emit('roomCreated', roomId);
    console.log(`✅ Room ${roomId} created by ${socket.id}. Total rooms: ${rooms.size}`);
  });

  socket.on('joinRoom', (data) => {
    console.log('🚪 Join room request from:', socket.id, 'with data:', data);
    
    if (!data || !data.roomId) {
      console.log('❌ No room ID provided');
      socket.emit('joinError', 'Room ID required');
      return;
    }
    
    const roomId = data.roomId.toString().toUpperCase().trim();
    console.log('🔍 Looking for room:', roomId);
    console.log('📋 Available rooms:', Array.from(rooms.keys()));
    
    if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      console.log('✅ Room found! Current players:', room.players.length);
      
      if (!room.players.find(p => p.socketId === socket.id)) {
        room.players.push({ socketId: socket.id, ...data.userData });
        console.log('👥 Player added to room. Total players:', room.players.length);
      }
      
      socket.join(roomId);
      socket.emit('joinedRoom', { 
        roomId, 
        players: room.players,
        selectedTeams: room.selectedTeams || []
      });
      
      socket.to(roomId).emit('playerJoined', {
        playerCount: room.players.length,
        selectedTeams: room.selectedTeams || []
      });
      
      console.log(`✅ Player ${socket.id} successfully joined room ${roomId}`);
    } else {
      console.log('❌ Room not found:', roomId);
      socket.emit('joinError', 'Room not found');
    }
  });

  socket.on('startAuction', (data) => {
    const { roomId, playerTeam } = data;
    const room = rooms.get(roomId);
    if (room) {
      if (!room.teams) room.teams = [];
      
      const existingIndex = room.teams.findIndex(t => t.socketId === socket.id);
      if (existingIndex !== -1) {
        room.teams[existingIndex] = { ...playerTeam, socketId: socket.id };
      } else {
        room.teams.push({ ...playerTeam, socketId: socket.id });
      }
      
      room.gameState.isActive = true;
      room.gameState.currentPlayerIndex = 0;
      
      io.to(roomId).emit('teamsUpdated', { teams: room.teams });
      
      if (room.teams.length === room.players.length) {
        io.to(roomId).emit('auctionStarted', { teams: room.teams, gameState: room.gameState });
        console.log(`Auction started in room ${roomId}`);
      } else {
        socket.emit('waitingForPlayers', { 
          ready: room.teams.length, 
          total: room.players.length 
        });
      }
    }
  });

  socket.on('placeBid', (data) => {
    const { roomId, bidAmount, playerName, socketId } = data;
    const room = rooms.get(roomId);
    if (room && room.gameState.isActive) {
      const teamIndex = room.teams.findIndex(t => t.socketId === socketId);
      if (teamIndex === -1) return;
      
      room.gameState.currentPrice = bidAmount;
      room.gameState.highestBidder = { teamIndex, playerName, socketId };
      room.gameState.timer = 10;
      
      io.to(roomId).emit('bidPlaced', {
        bidAmount,
        teamIndex,
        playerName,
        socketId,
        gameState: room.gameState
      });
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
      io.to(roomId).emit('playerChanged', { gameState: room.gameState });
    }
  });

  socket.on('playerAssigned', (data) => {
    const { roomId, player, winningTeam, price, skipped } = data;
    const room = rooms.get(roomId);
    if (room) {
      if (room.teams && winningTeam && !skipped) {
        const teamIndex = room.teams.findIndex(t => t.socketId === winningTeam.socketId);
        if (teamIndex !== -1) {
          room.teams[teamIndex] = { ...room.teams[teamIndex], ...winningTeam };
        }
      }
      io.to(roomId).emit('playerAssigned', {
        player,
        winningTeam,
        price,
        skipped,
        teams: room.teams
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
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
          console.log(`Room ${roomId} deleted`);
        }
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

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
  console.log('='.repeat(50));
  console.log(`🌐 Server running on port ${PORT}`);
  console.log(`\n📱 MULTIPLAYER SETUP:`);
  console.log(`   Host computer: http://${localIP}:${PORT}`);
  console.log(`   Other devices: http://${localIP}:${PORT}`);
  console.log(`\n⚠️  IMPORTANT: All devices must use the SAME URL above!`);
  console.log(`   Your IP address is: ${localIP}`);
  console.log('='.repeat(50));
});
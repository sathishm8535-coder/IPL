const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Professional Socket.IO configuration
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['polling', 'websocket'],
  pingTimeout: 60000,
  pingInterval: 25000,
  allowEIO3: true
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend')));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../Frontend/login.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../Frontend/login.html')));
app.get('/game', (req, res) => res.sendFile(path.join(__dirname, '../Frontend/index.html')));

// Room management
const rooms = new Map();
const playerRooms = new Map();

// API endpoint to check rooms
app.get('/api/rooms', (req, res) => {
  const roomList = Array.from(rooms.entries()).map(([id, room]) => ({
    id,
    players: room.players.length,
    host: room.host,
    created: room.createdAt
  }));
  res.json({ rooms: roomList, total: rooms.size });
});

// Generate secure room ID
function generateRoomId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// Socket connection handling
io.on('connection', (socket) => {
  console.log(`✅ Player connected: ${socket.id}`);
  
  // CREATE ROOM
  socket.on('createRoom', (userData) => {
    let roomId = generateRoomId();
    while (rooms.has(roomId)) {
      roomId = generateRoomId();
    }
    
    const room = {
      id: roomId,
      host: socket.id,
      players: [{ socketId: socket.id, ...userData }],
      selectedTeams: [],
      gameState: { isActive: false, currentPlayerIndex: 0 },
      teams: [],
      createdAt: new Date().toISOString()
    };
    
    rooms.set(roomId, room);
    playerRooms.set(socket.id, roomId);
    socket.join(roomId);
    
    socket.emit('roomCreated', { 
      roomId, 
      playerCount: 1,
      isHost: true 
    });
    
    console.log(`🏠 Room ${roomId} created by ${socket.id}`);\n  });
  
  // JOIN ROOM
  socket.on('joinRoom', (data) => {
    if (!data?.roomId) {
      socket.emit('joinError', 'Room ID required');
      return;
    }
    
    const roomId = data.roomId.toString().toUpperCase().trim();
    console.log(`🔍 Player ${socket.id} trying to join room: ${roomId}`);
    console.log(`📋 Available rooms: [${Array.from(rooms.keys()).join(', ')}]`);
    
    if (!rooms.has(roomId)) {
      socket.emit('joinError', `Room ${roomId} not found`);
      console.log(`❌ Room ${roomId} not found`);
      return;
    }
    
    const room = rooms.get(roomId);
    
    // Add player if not already in room
    if (!room.players.find(p => p.socketId === socket.id)) {
      room.players.push({ socketId: socket.id, ...data.userData });
    }
    
    playerRooms.set(socket.id, roomId);
    socket.join(roomId);
    
    // Confirm join to player
    socket.emit('joinedRoom', {
      roomId,
      players: room.players,
      selectedTeams: room.selectedTeams,
      isHost: room.host === socket.id
    });
    
    // Notify other players
    socket.to(roomId).emit('playerJoined', {
      player: { socketId: socket.id, ...data.userData },
      playerCount: room.players.length
    });
    
    console.log(`✅ Player ${socket.id} joined room ${roomId} (${room.players.length} players)`);
  });
  
  // TEAM SELECTION
  socket.on('selectTeam', (data) => {
    const roomId = playerRooms.get(socket.id);
    if (!roomId || !rooms.has(roomId)) return;
    
    const room = rooms.get(roomId);
    room.selectedTeams = room.selectedTeams.filter(t => t.socketId !== socket.id);
    room.selectedTeams.push({
      socketId: socket.id,
      teamName: data.teamName,
      playerInfo: data.playerInfo
    });
    
    io.to(roomId).emit('teamSelected', {
      socketId: socket.id,
      teamName: data.teamName,
      selectedTeams: room.selectedTeams.map(t => t.teamName)
    });
  });
  
  // START AUCTION
  socket.on('startAuction', (data) => {
    const roomId = playerRooms.get(socket.id);
    if (!roomId || !rooms.has(roomId)) return;
    
    const room = rooms.get(roomId);
    if (room.host !== socket.id) return; // Only host can start
    
    room.teams = data.teams;
    room.gameState.isActive = true;
    
    io.to(roomId).emit('auctionStarted', { 
      teams: data.teams, 
      gameState: room.gameState 
    });
  });
  
  // PLACE BID
  socket.on('placeBid', (data) => {
    const roomId = playerRooms.get(socket.id);
    if (!roomId || !rooms.has(roomId)) return;
    
    const room = rooms.get(roomId);
    if (!room.gameState.isActive) return;
    
    room.gameState.currentPrice = data.bidAmount;
    room.gameState.highestBidder = { teamIndex: data.teamIndex, playerName: data.playerName };
    
    io.to(roomId).emit('bidPlaced', {
      bidAmount: data.bidAmount,
      teamIndex: data.teamIndex,
      playerName: data.playerName,
      socketId: socket.id
    });
  });
  
  // DISCONNECT HANDLING
  socket.on('disconnect', () => {
    console.log(`❌ Player disconnected: ${socket.id}`);
    
    const roomId = playerRooms.get(socket.id);
    if (roomId && rooms.has(roomId)) {
      const room = rooms.get(roomId);
      room.players = room.players.filter(p => p.socketId !== socket.id);
      room.selectedTeams = room.selectedTeams.filter(t => t.socketId !== socket.id);
      
      socket.to(roomId).emit('playerLeft', {
        playerId: socket.id,
        playerCount: room.players.length
      });
      
      // Keep room alive for 10 minutes
      if (room.players.length === 0) {
        setTimeout(() => {
          if (rooms.has(roomId) && rooms.get(roomId).players.length === 0) {
            rooms.delete(roomId);
            console.log(`🗑️ Room ${roomId} deleted`);
          }
        }, 600000);
      }
    }
    
    playerRooms.delete(socket.id);
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
  console.log('\n🏏 IPL AUCTION MULTIPLAYER SERVER');
  console.log('=' .repeat(50));
  console.log(`🌐 Server: http://${localIP}:${PORT}`);
  console.log(`📱 Mobile: http://${localIP}:${PORT}`);
  console.log('=' .repeat(50));
}).on('error', (err) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});
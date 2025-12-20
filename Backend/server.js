const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../Frontend/login.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../Frontend/login.html')));
app.get('/game', (req, res) => res.sendFile(path.join(__dirname, '../Frontend/index.html')));

const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('createRoom', (userData) => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const room = {
      id: roomId,
      players: [{ socketId: socket.id, ...userData }],
      teams: [],
      gameState: { currentPlayerIndex: 0, currentPrice: 0, isActive: false },
      host: socket.id
    };
    rooms.set(roomId, room);
    socket.join(roomId);
    socket.emit('roomCreated', roomId);
    console.log(`Room ${roomId} created`);
  });

  socket.on('joinRoom', (data) => {
    const roomId = data.roomId.toUpperCase();
    const room = rooms.get(roomId);
    if (room) {
      if (!room.players.find(p => p.socketId === socket.id)) {
        room.players.push({ socketId: socket.id, ...data.userData });
      }
      socket.join(roomId);
      socket.emit('joinedRoom', { roomId, players: room.players });
      socket.to(roomId).emit('playerJoined', { playerCount: room.players.length });
      console.log(`Player joined room ${roomId}`);
    } else {
      socket.emit('joinError', 'Room not found');
    }
  });

  socket.on('submitTeam', (data) => {
    const room = rooms.get(data.roomId);
    if (room) {
      const teamIndex = room.teams.findIndex(t => t.socketId === socket.id);
      const team = { ...data.team, socketId: socket.id };
      
      if (teamIndex >= 0) {
        room.teams[teamIndex] = team;
      } else {
        room.teams.push(team);
      }
      
      if (room.teams.length === room.players.length) {
        room.gameState.isActive = true;
        io.to(data.roomId).emit('auctionStarted', { teams: room.teams });
      } else {
        socket.emit('waitingForPlayers', { ready: room.teams.length, total: room.players.length });
      }
    }
  });

  socket.on('placeBid', (data) => {
    const room = rooms.get(data.roomId);
    if (room && room.gameState.isActive) {
      const teamIndex = room.teams.findIndex(t => t.socketId === socket.id);
      if (teamIndex >= 0) {
        room.gameState.currentPrice = data.bidAmount;
        room.gameState.highestBidder = { teamIndex, socketId: socket.id, playerName: data.playerName };
        io.to(data.roomId).emit('bidPlaced', {
          bidAmount: data.bidAmount,
          teamIndex,
          playerName: data.playerName,
          socketId: socket.id
        });
      }
    }
  });

  socket.on('playerSold', (data) => {
    const room = rooms.get(data.roomId);
    if (room && socket.id === room.host) {
      if (data.winningTeam) {
        const teamIndex = room.teams.findIndex(t => t.socketId === data.winningTeam.socketId);
        if (teamIndex >= 0) {
          room.teams[teamIndex] = data.winningTeam;
        }
      }
      room.gameState.currentPlayerIndex++;
      io.to(data.roomId).emit('playerSold', {
        player: data.player,
        winningTeam: data.winningTeam,
        price: data.price,
        teams: room.teams,
        nextPlayerIndex: room.gameState.currentPlayerIndex
      });
    }
  });

  socket.on('disconnect', () => {
    for (const [roomId, room] of rooms.entries()) {
      const playerIndex = room.players.findIndex(p => p.socketId === socket.id);
      if (playerIndex >= 0) {
        room.players.splice(playerIndex, 1);
        if (room.players.length === 0) {
          rooms.delete(roomId);
        } else {
          socket.to(roomId).emit('playerLeft', { playerCount: room.players.length });
        }
        break;
      }
    }
  });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  let localIP = 'localhost';
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        localIP = net.address;
        break;
      }
    }
  }
  console.log(`\n🏏 IPL AUCTION SERVER STARTED!`);
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`📱 Network: http://${localIP}:${PORT}`);
  console.log(`Use the network URL for multiplayer!\n`);
});
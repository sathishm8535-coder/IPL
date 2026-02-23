const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://ipl-two-red.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all for production
      }
    },
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  allowUpgrades: true,
  pingTimeout: 60000,
  pingInterval: 25000,
  connectTimeout: 45000,
  maxHttpBufferSize: 1e6
});

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for production
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("/health", (req, res) => res.json({ status: 'ok', timestamp: Date.now() }));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../Frontend/login.html"))
);

app.get("/game", (req, res) =>
  res.sendFile(path.join(__dirname, "../Frontend/index.html"))
);

function generateRoomId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return io.sockets.adapter.rooms.has(id) ? generateRoomId() : id;
}

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("createRoom", (userData) => {
    const roomId = generateRoomId();
    socket.join(roomId);
    socket.data.roomId = roomId;
    socket.data.userData = userData;
    
    console.log(`🏠 Room ${roomId} created by ${socket.id}`);
    socket.emit("roomCreated", roomId);
  });

  socket.on("joinRoom", ({ roomId, userData }) => {
    if (!roomId) return socket.emit("joinError", "Room ID required");
    
    roomId = roomId.toUpperCase().trim();
    const room = io.sockets.adapter.rooms.get(roomId);
    
    if (!room) {
      console.log(`❌ Room ${roomId} not found`);
      return socket.emit("joinError", "Room not found");
    }

    if (room.has(socket.id)) {
      console.log(`✅ ${socket.id} already in room ${roomId}`);
      const players = [];
      const selectedTeams = [];
      for (const socketId of room) {
        const s = io.sockets.sockets.get(socketId);
        if (s?.data.userData) {
          players.push({ socketId, ...s.data.userData });
          if (s.data.selectedTeam) selectedTeams.push(s.data.selectedTeam);
        }
      }
      return socket.emit("joinedRoom", { roomId, players, selectedTeams });
    }

    if (room.size >= 2) {
      console.log(`❌ Room ${roomId} is full`);
      return socket.emit("joinError", "Room is full (max 2 players)");
    }

    socket.join(roomId);
    socket.data.roomId = roomId;
    socket.data.userData = userData;

    const players = [];
    const selectedTeams = [];
    
    for (const socketId of room) {
      const s = io.sockets.sockets.get(socketId);
      if (s?.data.userData) {
        players.push({ socketId, ...s.data.userData });
        if (s.data.selectedTeam) selectedTeams.push(s.data.selectedTeam);
      }
    }

    console.log(`✅ ${socket.id} joined room ${roomId} (${room.size}/2 players)`);
    socket.emit("joinedRoom", { roomId, players, selectedTeams });
    socket.to(roomId).emit("playerJoined", { player: { socketId: socket.id, ...userData }, playerCount: room.size });
  });

  socket.on("selectTeam", ({ roomId, teamName, playerInfo }) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (!room) return;
    
    socket.data.selectedTeam = teamName;
    
    const selectedTeams = [];
    for (const socketId of room) {
      const s = io.sockets.sockets.get(socketId);
      if (s && s.data.selectedTeam) {
        selectedTeams.push(s.data.selectedTeam);
      }
    }
    
    io.to(roomId).emit("teamSelected", { teamName, socketId: socket.id, selectedTeams, playerInfo });
  });

  socket.on("startAuction", ({ roomId, teams }) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (!room) return;
    
    socket.data.teams = teams;
    io.to(roomId).emit("auctionStarted", { teams, gameState: { isActive: true, currentPlayerIndex: 0 } });
  });

  socket.on("placeBid", ({ roomId, bidAmount, teamIndex, playerName, socketId }) => {
    io.to(roomId).emit("bidPlaced", { bidAmount, teamIndex, playerName, socketId });
  });

  socket.on("nextPlayer", ({ roomId, playerIndex }) => {
    io.to(roomId).emit("nextPlayer", { playerIndex });
  });

  socket.on("playerAssigned", ({ roomId, player, winningTeam, price, skipped }) => {
    io.to(roomId).emit("playerAssigned", { player, winningTeam, price, skipped });
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    
    const roomId = socket.data.roomId;
    if (roomId) {
      const room = io.sockets.adapter.rooms.get(roomId);
      const playerCount = room ? room.size : 0;
      
      console.log(`🚪 ${socket.id} left room ${roomId}, ${playerCount} players remaining`);
      
      if (room) {
        const selectedTeams = [];
        const players = [];
        
        for (const socketId of room) {
          const s = io.sockets.sockets.get(socketId);
          if (s && s.data.userData) {
            players.push({ socketId, ...s.data.userData });
            if (s.data.selectedTeam) {
              selectedTeams.push(s.data.selectedTeam);
            }
          }
        }
        
        socket.to(roomId).emit("playerLeft", { playerId: socket.id, players, playerCount, selectedTeams });
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`🔥 Server running on ${HOST}:${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

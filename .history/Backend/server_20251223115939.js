const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const path = require("path");
const os = require("os");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
  pingTimeout: 60000,
  pingInterval: 25000,
});

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/login.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

// ================= ROOM STORAGE =================
const rooms = new Map(); // roomId -> roomData
const roomPlayers = new Map(); // socketId -> roomId

// ================= SOCKET LOGIC =================
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.emit("connectionConfirmed", socket.id);

  // ---------- CREATE ROOM ----------
  socket.on("createRoom", (userData = {}) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let roomId;

    do {
      roomId = "";
      for (let i = 0; i < 6; i++) {
        roomId += chars[Math.floor(Math.random() * chars.length)];
      }
    } while (rooms.has(roomId));

    const roomData = {
      id: roomId,
      host: socket.id,
      players: [{ socketId: socket.id, ...userData }],
      selectedTeams: [],
      gameState: {},
      createdAt: Date.now(),
    };

    rooms.set(roomId, roomData);
    roomPlayers.set(socket.id, roomId);
    socket.join(roomId);

    socket.emit("roomCreated", {
      success: true,
      roomId,
    });

    console.log(`✅ Room created: ${roomId}`);
  });

  // ---------- JOIN ROOM ----------
  socket.on("joinRoom", ({ roomId, userData = {} }) => {
    if (!roomId) {
      socket.emit("joinError", "Room ID required");
      return;
    }

    roomId = roomId.toUpperCase().trim();

    if (!rooms.has(roomId)) {
      socket.emit("joinError", "Room not found");
      return;
    }

    const room = rooms.get(roomId);

    room.players.push({ socketId: socket.id, ...userData });
    roomPlayers.set(socket.id, roomId);
    socket.join(roomId);

    socket.emit("joinedRoom", {
      roomId,
      players: room.players,
      selectedTeams: room.selectedTeams,
    });

    socket.to(roomId).emit("playerJoined", {
      socketId: socket.id,
      playerCount: room.players.length,
    });

    console.log(`👥 Player joined room: ${roomId}`);
  });

  // ---------- TEAM SELECT ----------
  socket.on("selectTeam", ({ roomId, teamName }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    room.selectedTeams = room.selectedTeams.filter(
      (t) => t.socketId !== socket.id
    );

    room.selectedTeams.push({ socketId: socket.id, teamName });

    io.to(roomId).emit("teamSelected", {
      selectedTeams: room.selectedTeams.map((t) => t.teamName),
    });

    console.log(`🏏 Team selected ${teamName} in room ${roomId}`);
  });

  // ---------- DISCONNECT ----------
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);

    const roomId = roomPlayers.get(socket.id);
    if (!roomId || !rooms.has(roomId)) return;

    const room = rooms.get(roomId);
    room.players = room.players.filter((p) => p.socketId !== socket.id);
    room.selectedTeams = room.selectedTeams.filter(
      (t) => t.socketId !== socket.id
    );

    socket.to(roomId).emit("playerLeft", {
      socketId: socket.id,
      playerCount: room.players.length,
      selectedTeams: room.selectedTeams.map((t) => t.teamName),
    });

    if (room.players.length === 0) {
      setTimeout(() => {
        if (rooms.has(roomId) && rooms.get(roomId).players.length === 0) {
          rooms.delete(roomId);
          console.log(`🗑 Room deleted: ${roomId}`);
        }
      }, 300000);
    }

    roomPlayers.delete(socket.id);
  });
});

// ================= SERVER START =================
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}

server.listen(PORT, HOST, () => {
  const ip = getLocalIP();
  console.log("\n🏏 IPL AUCTION SERVER STARTED");
  console.log("=================================");
  console.log(`🌐 Local:  http://${ip}:${PORT}`);
  console.log(`🎮 Game:   http://${ip}:${PORT}/game`);
  console.log("=================================");
});

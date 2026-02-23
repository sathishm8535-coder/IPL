const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
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
app.use(express.static(path.join(__dirname, "../Frontend")));

// ================= ROUTES =================
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../Frontend/login.html"))
);

app.get("/game", (req, res) =>
  res.sendFile(path.join(__dirname, "../Frontend/index.html"))
);

// ================= ROOM STORAGE =================
const rooms = new Map(); // roomId -> roomData
const roomPlayers = new Map(); // socketId -> roomId

// ================= SOCKET =================
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ---------- CREATE ROOM ----------
  socket.on("createRoom", (userData) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const generateRoomId = () => {
      let id = "";
      for (let i = 0; i < 6; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
      }
      return id;
    };

    let roomId = generateRoomId();
    while (rooms.has(roomId)) roomId = generateRoomId();

    const room = {
      id: roomId,
      host: socket.id,
      players: [{ socketId: socket.id, ...userData }],
      selectedTeams: [],
      teams: [],
      gameState: {
        isActive: false,
        currentPlayerIndex: 0,
        currentPrice: 0,
        highestBidder: null,
        timer: 10,
      },
    };

    rooms.set(roomId, room);
    roomPlayers.set(socket.id, roomId);
    socket.join(roomId);

    socket.emit("roomCreated", { roomId });
    console.log(`Room created: ${roomId}`);
  });

  // ---------- JOIN ROOM ----------
  socket.on("joinRoom", ({ roomId, userData }) => {
    if (!roomId) return socket.emit("joinError", "Room ID required");

    roomId = roomId.toUpperCase().trim();
    if (!rooms.has(roomId)) return socket.emit("joinError", "Room not found");

    const room = rooms.get(roomId);

    if (!room.players.find((p) => p.socketId === socket.id)) {
      room.players.push({ socketId: socket.id, ...userData });
    }

    roomPlayers.set(socket.id, roomId);
    socket.join(roomId);

    socket.emit("joinedRoom", {
      roomId,
      players: room.players,
      selectedTeams: room.selectedTeams,
    });

    socket.to(roomId).emit("playerJoined", room.players);
  });

  // ---------- TEAM SELECT ----------
  socket.on("selectTeam", ({ roomId, teamName, playerInfo }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    room.selectedTeams = room.selectedTeams.filter(
      (t) => t.socketId !== socket.id
    );

    room.selectedTeams.push({ socketId: socket.id, teamName, playerInfo });

    io.to(roomId).emit("teamSelected", {
      teamName,
      socketId: socket.id,
      selectedTeams: room.selectedTeams.map((t) => t.teamName),
    });
  });

  // ---------- START AUCTION ----------
  socket.on("startAuction", ({ roomId, teams }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    room.teams = teams;
    room.gameState.isActive = true;

    io.to(roomId).emit("auctionStarted", {
      teams,
      gameState: room.gameState,
    });
  });

  // ---------- PLACE BID ----------
  socket.on("placeBid", ({ roomId, bidAmount, playerName }) => {
    const room = rooms.get(roomId);
    if (!room || !room.gameState.isActive) return;

    room.gameState.currentPrice = bidAmount;
    room.gameState.highestBidder = playerName;
    room.gameState.timer = 10;

    io.to(roomId).emit("bidPlaced", {
      bidAmount,
      playerName,
      gameState: room.gameState,
    });
  });

  // ---------- NEXT PLAYER ----------
  socket.on("nextPlayer", ({ roomId }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    room.gameState.currentPlayerIndex++;
    room.gameState.currentPrice = 0;
    room.gameState.highestBidder = null;

    io.to(roomId).emit("playerChanged", room.gameState);
  });

  // ---------- DISCONNECT ----------
  socket.on("disconnect", () => {
    const roomId = roomPlayers.get(socket.id);
    if (!roomId || !rooms.has(roomId)) return;

    const room = rooms.get(roomId);
    room.players = room.players.filter((p) => p.socketId !== socket.id);
    room.selectedTeams = room.selectedTeams.filter(
      (t) => t.socketId !== socket.id
    );

    socket.to(roomId).emit("playerLeft", room.players);

    if (room.players.length === 0) {
      setTimeout(() => {
        if (rooms.has(roomId) && rooms.get(roomId).players.length === 0) {
          rooms.delete(roomId);
          console.log(`Room deleted: ${roomId}`);
        }
      }, 300000);
    }

    roomPlayers.delete(socket.id);
  });
});

// ================= START SERVER =================
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});

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

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../Frontend/login.html"))
);

app.get("/game", (req, res) =>
  res.sendFile(path.join(__dirname, "../Frontend/index.html"))
);

const rooms = new Map();
const roomPlayers = new Map();

function generateRoomId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return rooms.has(id) ? generateRoomId() : id;
}

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("createRoom", (userData) => {
    const roomId = generateRoomId();
    const room = {
      id: roomId,
      host: socket.id,
      players: [{ socketId: socket.id, ...userData }],
      selectedTeams: [],
      teams: [],
      gameState: { isActive: false, currentPlayerIndex: 0, currentPrice: 0, highestBidder: null, timer: 10 },
    };

    rooms.set(roomId, room);
    roomPlayers.set(socket.id, roomId);
    socket.join(roomId);

    console.log(`🏠 Room created: ${roomId}`);
    socket.emit("roomCreated", { roomId });
  });

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

    socket.emit("joinedRoom", { roomId, players: room.players, selectedTeams: room.selectedTeams.map(t => t.teamName) });
    socket.to(roomId).emit("playerJoined", { player: { socketId: socket.id, ...userData }, playerCount: room.players.length });
  });

  socket.on("selectTeam", ({ roomId, teamName, playerInfo }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    room.selectedTeams = room.selectedTeams.filter((t) => t.socketId !== socket.id);
    room.selectedTeams.push({ socketId: socket.id, teamName, playerInfo });
    io.to(roomId).emit("teamSelected", { teamName, socketId: socket.id, selectedTeams: room.selectedTeams.map((t) => t.teamName) });
  });

  socket.on("startAuction", ({ roomId, teams }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    room.teams = teams;
    room.gameState.isActive = true;
    io.to(roomId).emit("auctionStarted", { teams, gameState: room.gameState });
  });

  socket.on("placeBid", ({ roomId, bidAmount, teamIndex, playerName, socketId }) => {
    const room = rooms.get(roomId);
    if (!room || !room.gameState.isActive) return;
    room.gameState.currentPrice = bidAmount;
    room.gameState.highestBidder = playerName;
    room.gameState.timer = 10;
    io.to(roomId).emit("bidPlaced", { bidAmount, teamIndex, playerName, socketId, gameState: room.gameState });
  });

  socket.on("nextPlayer", ({ roomId, playerIndex }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    room.gameState.currentPlayerIndex = playerIndex;
    room.gameState.currentPrice = 0;
    room.gameState.highestBidder = null;
    io.to(roomId).emit("nextPlayer", { playerIndex, gameState: room.gameState });
  });

  socket.on("playerAssigned", ({ roomId, player, winningTeam, price, skipped }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    io.to(roomId).emit("playerAssigned", { player, winningTeam, price, skipped });
  });

  socket.on("disconnect", () => {
    const roomId = roomPlayers.get(socket.id);
    if (!roomId || !rooms.has(roomId)) return;
    const room = rooms.get(roomId);
    room.players = room.players.filter((p) => p.socketId !== socket.id);
    room.selectedTeams = room.selectedTeams.filter((t) => t.socketId !== socket.id);
    socket.to(roomId).emit("playerLeft", room.players);
    if (room.players.length === 0) {
      setTimeout(() => {
        if (rooms.has(roomId) && rooms.get(roomId).players.length === 0) {
          rooms.delete(roomId);
          console.log(`🗑️ Room deleted: ${roomId}`);
        }
      }, 300000);
    }
    roomPlayers.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

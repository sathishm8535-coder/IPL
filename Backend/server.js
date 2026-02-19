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

const roomData = new Map();

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
    
    roomData.set(roomId, {
      host: socket.id,
      players: [{ socketId: socket.id, ...userData }],
      selectedTeams: [],
      teams: [],
      gameState: { isActive: false, currentPlayerIndex: 0, currentPrice: 0, highestBidder: null, timer: 10 },
    });

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

    const data = roomData.get(roomId);
    if (!data) {
      console.log(`❌ Room data for ${roomId} not found`);
      return socket.emit("joinError", "Room not found");
    }

    // Allow same socket to rejoin (reconnection scenario)
    if (room.has(socket.id)) {
      console.log(`✅ ${socket.id} reconnecting to room ${roomId}`);
      return socket.emit("joinedRoom", { roomId, players: data.players, selectedTeams: data.selectedTeams.map(t => t.teamName) });
    }

    // Join room (each socket.id is unique per device/connection)
    socket.join(roomId);
    data.players.push({ socketId: socket.id, ...userData });

    console.log(`✅ ${socket.id} (${userData.name || 'User'}) joined room ${roomId}`);
    socket.emit("joinedRoom", { roomId, players: data.players, selectedTeams: data.selectedTeams.map(t => t.teamName) });
    socket.to(roomId).emit("playerJoined", { player: { socketId: socket.id, ...userData }, playerCount: data.players.length });
  });

  socket.on("selectTeam", ({ roomId, teamName, playerInfo }) => {
    const data = roomData.get(roomId);
    if (!data) return;
    data.selectedTeams = data.selectedTeams.filter((t) => t.socketId !== socket.id);
    data.selectedTeams.push({ socketId: socket.id, teamName, playerInfo });
    io.to(roomId).emit("teamSelected", { teamName, socketId: socket.id, selectedTeams: data.selectedTeams.map((t) => t.teamName) });
  });

  socket.on("startAuction", ({ roomId, teams }) => {
    const data = roomData.get(roomId);
    if (!data) return;
    data.teams = teams;
    data.gameState.isActive = true;
    io.to(roomId).emit("auctionStarted", { teams, gameState: data.gameState });
  });

  socket.on("placeBid", ({ roomId, bidAmount, teamIndex, playerName, socketId }) => {
    const data = roomData.get(roomId);
    if (!data || !data.gameState.isActive) return;
    data.gameState.currentPrice = bidAmount;
    data.gameState.highestBidder = playerName;
    data.gameState.timer = 10;
    io.to(roomId).emit("bidPlaced", { bidAmount, teamIndex, playerName, socketId, gameState: data.gameState });
  });

  socket.on("nextPlayer", ({ roomId, playerIndex }) => {
    const data = roomData.get(roomId);
    if (!data) return;
    data.gameState.currentPlayerIndex = playerIndex;
    data.gameState.currentPrice = 0;
    data.gameState.highestBidder = null;
    io.to(roomId).emit("nextPlayer", { playerIndex, gameState: data.gameState });
  });

  socket.on("playerAssigned", ({ roomId, player, winningTeam, price, skipped }) => {
    const data = roomData.get(roomId);
    if (!data) return;
    io.to(roomId).emit("playerAssigned", { player, winningTeam, price, skipped });
  });

  socket.on("disconnect", () => {
    for (const [roomId, data] of roomData.entries()) {
      const playerIndex = data.players.findIndex((p) => p.socketId === socket.id);
      if (playerIndex !== -1) {
        data.players.splice(playerIndex, 1);
        data.selectedTeams = data.selectedTeams.filter((t) => t.socketId !== socket.id);
        socket.to(roomId).emit("playerLeft", data.players);
        
        if (data.players.length === 0) {
          setTimeout(() => {
            if (roomData.has(roomId) && roomData.get(roomId).players.length === 0) {
              roomData.delete(roomId);
              console.log(`🗑️ Room ${roomId} deleted`);
            }
          }, 300000);
        }
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

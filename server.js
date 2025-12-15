const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const path = require("path");

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

let rooms = {};

io.on("connection", (socket) => {
    console.log("New Player Connected:", socket.id);

    // Create Room
    socket.on("createRoom", () => {
        const roomId = Math.random().toString(36).substr(2, 5);
        rooms[roomId] = { players: [] };
        socket.join(roomId);
        rooms[roomId].players.push(socket.id);
        socket.emit("roomCreated", roomId);
    });

    // Join Room
    socket.on("joinRoom", (roomId) => {
        if (!rooms[roomId]) return socket.emit("errorMsg", "Room not found");
        if (rooms[roomId].players.length >= 10) return socket.emit("errorMsg", "Room full");
        socket.join(roomId);
        rooms[roomId].players.push(socket.id);
        io.to(roomId).emit("playerJoined", rooms[roomId].players.length);
    });

    // Player action sync
    socket.on("playerAction", (data) => {
        const roomIds = Object.keys(socket.rooms).filter(r => r != socket.id);
        roomIds.forEach(roomId => socket.to(roomId).emit("playerAction", data));
    });

    // Disconnect
    socket.on("disconnect", () => {
        console.log("Player disconnected:", socket.id);
        for (let roomId in rooms) {
            rooms[roomId].players = rooms[roomId].players.filter(id => id != socket.id);
            if (rooms[roomId].players.length === 0) delete rooms[roomId];
        }
    });
});

http.listen(3000, () => console.log("Server running on port 3000"));

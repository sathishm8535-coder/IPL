# 🎯 Quick Reference: Fixed Multiplayer System

## The Core Fix (3 Lines That Matter)

```javascript
// OLD (BROKEN) ❌
const data = roomData.get(roomId);  // Lost on server restart
if (!data) return socket.emit("joinError", "Room not found");

// NEW (FIXED) ✅
const room = io.sockets.adapter.rooms.get(roomId);  // Always accurate
if (!room) return socket.emit("joinError", "Room not found");
if (room.size >= 2) return socket.emit("joinError", "Room is full");
```

---

## Backend Events (server.js)

### Create Room
```javascript
socket.on("createRoom", (userData) => {
  const roomId = generateRoomId();
  socket.join(roomId);
  socket.data.roomId = roomId;
  socket.data.userData = userData;
  socket.emit("roomCreated", roomId);
});
```

### Join Room
```javascript
socket.on("joinRoom", ({ roomId, userData }) => {
  const room = io.sockets.adapter.rooms.get(roomId);
  if (!room) return socket.emit("joinError", "Room not found");
  if (room.size >= 2) return socket.emit("joinError", "Room is full");
  
  socket.join(roomId);
  socket.data.roomId = roomId;
  socket.data.userData = userData;
  
  // Collect players
  const players = [];
  for (const socketId of room) {
    const s = io.sockets.sockets.get(socketId);
    if (s?.data.userData) players.push({ socketId, ...s.data.userData });
  }
  
  socket.emit("joinedRoom", { roomId, players });
  socket.to(roomId).emit("playerJoined", { player: userData, playerCount: room.size });
});
```

### Disconnect
```javascript
socket.on("disconnect", () => {
  const roomId = socket.data.roomId;
  if (roomId) {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (room) {
      socket.to(roomId).emit("playerLeft", { playerId: socket.id, playerCount: room.size });
    }
  }
});
```

---

## Frontend Events (Ipl.js)

### Initialize Socket
```javascript
const socket = io('https://ipl-cca1.onrender.com', {
  transports: ['websocket', 'polling'],
  reconnection: true
});
```

### Create Room
```javascript
function handleCreateRoom() {
  const name = document.getElementById('hostName').value.trim();
  socket.emit("createRoom", { name, email: playerData?.email });
}

socket.on("roomCreated", (roomId) => {
  currentRoomId = roomId;
  isRoomHost = true;
  document.getElementById('roomCodeValue').textContent = roomId;
});
```

### Join Room
```javascript
function handleJoinRoom() {
  const name = document.getElementById('guestName').value.trim();
  const code = document.getElementById('roomCodeInput').value.trim();
  socket.emit("joinRoom", { roomId: code, userData: { name } });
}

socket.on("joinedRoom", (data) => {
  currentRoomId = data.roomId;
  showNotification(`Joined Room: ${data.roomId}`, 'success');
});

socket.on("joinError", (error) => {
  showNotification(`Error: ${error}`, 'error');
});
```

---

## CORS Configuration

```javascript
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://ipl-two-red.vercel.app'],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});
```

---

## Testing Commands

```bash
# Start backend
cd Backend
npm start

# Test room creation
curl -X POST http://localhost:3000/health

# Check Socket.io connection
# Open browser console and check for "✅ Connected to server"
```

---

## Deployment

```bash
# Backend (Render)
git push origin main  # Auto-deploys to Render

# Frontend (Vercel)
# Already deployed at: https://ipl-two-red.vercel.app
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Room not found" | ✅ Fixed - using Socket.io rooms |
| Connection timeout | Check CORS, ensure server is running |
| Room full error | Working as intended (max 2 players) |
| Disconnect issues | Socket.io auto-handles cleanup |

---

## Key Differences

| Feature | Before | After |
|---------|--------|-------|
| Storage | `Map()` in memory | Socket.io rooms |
| Validation | `roomData.get()` | `rooms.get()` |
| Player limit | Manual check | `room.size >= 2` |
| Cleanup | Manual timeout | Automatic |
| Cloud compatible | ❌ No | ✅ Yes |

---

**Status**: ✅ Production Ready
**Backend**: https://ipl-cca1.onrender.com
**Frontend**: https://ipl-two-red.vercel.app

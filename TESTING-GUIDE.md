# 🧪 Testing Guide - Multiplayer Room System

## 🎯 Pre-Test Checklist

- [ ] Backend deployed to Render: https://ipl-cca1.onrender.com
- [ ] Frontend deployed to Vercel: https://ipl-two-red.vercel.app
- [ ] Socket.io CDN loaded in index.html
- [ ] CORS configured for Vercel domain
- [ ] Two devices/browsers ready for testing

---

## 📱 Test Setup

### Device 1 (Host)
- Browser: Chrome/Firefox
- URL: https://ipl-two-red.vercel.app
- Role: Room creator

### Device 2 (Guest)
- Browser: Chrome/Firefox (different device/incognito)
- URL: https://ipl-two-red.vercel.app
- Role: Room joiner

---

## ✅ Test Case 1: Basic Room Creation & Join

### Steps
1. **Device 1 (Host)**
   ```
   1. Open https://ipl-two-red.vercel.app
   2. Enter name: "Player1"
   3. Click "🎯 Create Room"
   4. Wait for room code (e.g., "ABC123")
   5. Copy room code
   ```

2. **Device 2 (Guest)**
   ```
   1. Open https://ipl-two-red.vercel.app
   2. Enter name: "Player2"
   3. Enter room code: "ABC123"
   4. Click "🚀 Join Room"
   ```

### Expected Results
- ✅ Device 1 shows: "Room Created: ABC123"
- ✅ Device 2 shows: "Joined Room: ABC123"
- ✅ Both devices show: "2 players connected"
- ✅ No "Room not found" error
- ✅ "Enter Auction Room" button appears

### Browser Console Logs
```javascript
// Device 1
✅ Connected to server
🏠 Room ABC123 created by socket_xyz123

// Device 2
✅ Connected to server
✅ socket_abc456 joined room ABC123 (2/2 players)
```

---

## ✅ Test Case 2: Room Full Validation

### Steps
1. **Device 1 & 2**: Already in room "ABC123"
2. **Device 3 (New)**:
   ```
   1. Open https://ipl-two-red.vercel.app
   2. Enter name: "Player3"
   3. Enter room code: "ABC123"
   4. Click "🚀 Join Room"
   ```

### Expected Results
- ✅ Device 3 shows: "Error: Room is full (max 2 players)"
- ✅ Red notification appears
- ✅ Cannot join room

### Browser Console Logs
```javascript
// Device 3
❌ Room ABC123 is full
```

---

## ✅ Test Case 3: Invalid Room Code

### Steps
1. **Device 1**:
   ```
   1. Open https://ipl-two-red.vercel.app
   2. Enter name: "Player1"
   3. Enter room code: "XYZ999" (non-existent)
   4. Click "🚀 Join Room"
   ```

### Expected Results
- ✅ Shows: "Error: Room not found"
- ✅ Red notification appears
- ✅ Cannot join room

### Browser Console Logs
```javascript
// Device 1
❌ Room XYZ999 not found
```

---

## ✅ Test Case 4: Team Selection Sync

### Steps
1. **Both devices**: In room "ABC123"
2. **Device 1**:
   ```
   1. Click "▶ Enter Auction Room"
   2. Select team: "Chennai Super Kings"
   ```
3. **Device 2**:
   ```
   1. Click "▶ Enter Auction Room"
   2. Check team dropdown
   ```

### Expected Results
- ✅ Device 1 selects "CSK"
- ✅ Device 2 sees "CSK (Selected by another player)" - disabled
- ✅ Device 2 can only select remaining teams
- ✅ Real-time sync works

### Browser Console Logs
```javascript
// Both devices
Team selected by another player: Chennai Super Kings
```

---

## ✅ Test Case 5: Auction Start & Bidding

### Steps
1. **Device 1 (Host)**:
   ```
   1. Select team: "Chennai Super Kings"
   2. Click "Start Auction"
   ```
2. **Device 2 (Guest)**:
   ```
   1. Select team: "Mumbai Indians"
   2. Wait for auction to start
   ```
3. **Device 1**:
   ```
   1. Click bid button for "Player1 — CSK"
   2. Price increases by ₹1 Cr
   ```
4. **Device 2**:
   ```
   1. Check if bid update appears
   2. Click bid button for "Player2 — MI"
   ```

### Expected Results
- ✅ Both devices see auction screen simultaneously
- ✅ Device 1 bids → Device 2 sees price update instantly
- ✅ Timer resets to 10s after each bid
- ✅ Highest bidder name updates in real-time
- ✅ Both players can bid competitively

### Browser Console Logs
```javascript
// Both devices
Auction started - All players can bid!
Bid received: ₹3 Cr by Player1 (CSK)
Bid received: ₹4 Cr by Player2 (MI)
```

---

## ✅ Test Case 6: Disconnect & Reconnect

### Steps
1. **Device 1 & 2**: In room "ABC123"
2. **Device 1**:
   ```
   1. Close browser tab
   2. Wait 5 seconds
   ```
3. **Device 2**:
   ```
   1. Check player count
   ```
4. **Device 1**:
   ```
   1. Reopen https://ipl-two-red.vercel.app
   2. Try to rejoin room "ABC123"
   ```

### Expected Results
- ✅ Device 2 shows: "A player left the room"
- ✅ Player count updates: "1 players connected"
- ✅ Device 1 can rejoin room (if room still exists)
- ✅ Socket.io auto-cleanup works

### Browser Console Logs
```javascript
// Device 2
🚪 socket_xyz123 left room ABC123, 1 players remaining

// Device 1 (after rejoin)
✅ socket_new789 joined room ABC123 (2/2 players)
```

---

## ✅ Test Case 7: Server Restart Simulation

### Steps
1. **Device 1**: Create room "ABC123"
2. **Backend**: Restart Render server
   ```bash
   # Render dashboard → Manual Deploy → Deploy Latest Commit
   ```
3. **Device 2**: Try to join room "ABC123"

### Expected Results (After Fix)
- ✅ Device 1 reconnects automatically
- ✅ Device 2 can join if Device 1 is still connected
- ✅ No "Room not found" error (if host is connected)
- ✅ Room persists during active connections

### Expected Results (Before Fix)
- ❌ Device 2 sees: "Room not found"
- ❌ Room lost after restart

---

## 🔍 Debugging Tools

### Browser Console Commands

#### Check Socket Connection
```javascript
// In browser console
socket.connected  // Should be true
socket.id  // Shows your socket ID
```

#### Check Current Room
```javascript
currentRoomId  // Shows room code (e.g., "ABC123")
isRoomHost  // true if you created the room
```

#### Check Players
```javascript
playersInRoom  // Array of players in room
selectedTeamsInRoom  // Array of selected teams
```

#### Manual Socket Events
```javascript
// Test room creation
socket.emit("createRoom", { name: "TestPlayer" });

// Test room join
socket.emit("joinRoom", { roomId: "ABC123", userData: { name: "TestPlayer" } });
```

### Backend Logs (Render Dashboard)

#### Successful Room Creation
```
✅ User connected: socket_xyz123
🏠 Room ABC123 created by socket_xyz123
```

#### Successful Room Join
```
✅ User connected: socket_abc456
✅ socket_abc456 joined room ABC123 (2/2 players)
```

#### Room Full Error
```
❌ Room ABC123 is full
```

#### Room Not Found Error
```
❌ Room XYZ999 not found
```

---

## 📊 Performance Benchmarks

### Expected Response Times
- Room creation: < 100ms
- Room join: < 200ms
- Bid broadcast: < 50ms
- Team selection sync: < 100ms

### Load Testing
```bash
# Test with multiple rooms
Room 1: 2 players ✅
Room 2: 2 players ✅
Room 3: 2 players ✅
Total: 6 concurrent players
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Room not found" (After Fix)
**Cause**: Host disconnected before guest joined
**Solution**: ✅ Working as intended - room deleted when empty

### Issue 2: Connection timeout
**Cause**: CORS or network issue
**Solution**: 
```javascript
// Check CORS in server.js
const allowedOrigins = [
  'https://ipl-two-red.vercel.app'
];
```

### Issue 3: Bid not syncing
**Cause**: Socket not connected
**Solution**:
```javascript
// Check connection
if (!socket || !socket.connected) {
  initializeSocket();
}
```

### Issue 4: Team selection not syncing
**Cause**: Event listener not set up
**Solution**: Already fixed in Ipl.js - check `setupSocketListeners()`

---

## ✅ Final Verification Checklist

### Backend (server.js)
- [ ] No `roomData` Map references
- [ ] Using `io.sockets.adapter.rooms.get()`
- [ ] Player limit: `room.size >= 2`
- [ ] Data stored on `socket.data`
- [ ] CORS configured for Vercel

### Frontend (Ipl.js)
- [ ] Socket.io initialized
- [ ] All event listeners set up
- [ ] Error handling implemented
- [ ] Notifications working
- [ ] Room code copy function works

### Deployment
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set
- [ ] Health check endpoint working

### Testing
- [ ] Room creation works
- [ ] Room join works
- [ ] Room full validation works
- [ ] Invalid room code handled
- [ ] Team selection syncs
- [ ] Auction bidding syncs
- [ ] Disconnect cleanup works

---

## 🎉 Success Criteria

All tests pass with:
- ✅ No "Room not found" errors (when room exists)
- ✅ 2-player limit enforced
- ✅ Real-time sync working
- ✅ Auto-cleanup on disconnect
- ✅ Production-ready performance

---

## 📝 Test Report Template

```
Test Date: ___________
Tester: ___________
Environment: Production / Staging

Test Case 1: Room Creation & Join
Status: ✅ Pass / ❌ Fail
Notes: ___________

Test Case 2: Room Full Validation
Status: ✅ Pass / ❌ Fail
Notes: ___________

Test Case 3: Invalid Room Code
Status: ✅ Pass / ❌ Fail
Notes: ___________

Test Case 4: Team Selection Sync
Status: ✅ Pass / ❌ Fail
Notes: ___________

Test Case 5: Auction Bidding
Status: ✅ Pass / ❌ Fail
Notes: ___________

Test Case 6: Disconnect & Reconnect
Status: ✅ Pass / ❌ Fail
Notes: ___________

Overall Status: ✅ All Pass / ❌ Some Fail
Deployment Ready: Yes / No
```

---

**Status**: ✅ Ready for Testing
**Last Updated**: 2024
**Next Step**: Deploy and test with 2 devices

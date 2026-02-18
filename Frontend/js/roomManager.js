/* ═══════════════════════════════════════
   ROOM MANAGER - Socket.IO Integration
   Minimal integration for Create/Join Room
═══════════════════════════════════════ */

console.log('✅ Room Manager loaded - Using Socket.IO (No PeerJS)');

let roomSocket = null;
let isHost = false;
let myName = '';
let myRoomCode = '';

// Initialize Socket.IO
function initSocket() {
  if (!roomSocket) {
    roomSocket = io();
    setupSocketListeners();
  }
  return roomSocket;
}

// Setup Socket listeners
function setupSocketListeners() {
  roomSocket.on('roomCreated', ({ roomId }) => {
    myRoomCode = roomId;
    isHost = true;
    console.log('Room created:', roomId);
    showRoomCode(roomId);
    updateConnectedPlayers();
  });

  roomSocket.on('joinedRoom', ({ roomId, players }) => {
    myRoomCode = roomId;
    console.log('Joined room:', roomId);
    updateConnectedPlayers(players.length);
  });

  roomSocket.on('joinError', (msg) => {
    alert('Join failed: ' + msg);
  });

  roomSocket.on('playerJoined', (players) => {
    console.log('Player joined');
    updateConnectedPlayers(players.length);
  });

  roomSocket.on('playerLeft', (players) => {
    console.log('Player left');
    updateConnectedPlayers(players.length);
  });

  roomSocket.on('auctionStarted', ({ teams, gameState }) => {
    syncAuctionState({ teams, gameState });
  });

  roomSocket.on('bidPlaced', ({ bidAmount, playerName, gameState }) => {
    syncAuctionState({ gameState });
  });
}

// Create Room (Host)
function createRoom(userName) {
  myName = userName;
  initSocket();
  roomSocket.emit('createRoom', { name: userName });
}

// Join Room (Guest)
function joinRoom(userName, roomCode) {
  myName = userName;
  initSocket();
  roomSocket.emit('joinRoom', { roomId: roomCode.toUpperCase(), userData: { name: userName } });
}

// Broadcast to room
function broadcast(data) {
  if (roomSocket && myRoomCode) {
    roomSocket.emit('placeBid', { roomId: myRoomCode, ...data });
  }
}

// Get current auction state (to be implemented based on your Ipl.js)
function getCurrentAuctionState() {
  return {
    teams: window.teams || [],
    currentPlayerIndex: window.currentPlayerIndex || 0,
    currentPrice: window.currentPrice || 0,
    highestBidderIdx: window.highestBidderIdx || -1,
  };
}

// Sync auction state (guest receives from host)
function syncAuctionState(data) {
  if (data.teams) window.teams = data.teams;
  if (data.currentPlayerIndex !== undefined) window.currentPlayerIndex = data.currentPlayerIndex;
  if (data.currentPrice !== undefined) window.currentPrice = data.currentPrice;
  if (data.highestBidderIdx !== undefined) window.highestBidderIdx = data.highestBidderIdx;
  
  // Trigger UI update
  if (window.updateAuctionUI) window.updateAuctionUI();
}

// UI Helpers
function showRoomCode(code) {
  const display = document.getElementById('roomCodeDisplay');
  const value = document.getElementById('roomCodeValue');
  if (display && value) {
    value.textContent = code;
    display.style.display = 'block';
  }
}

function updateConnectedPlayers(count = 1) {
  const display = document.getElementById('connectedCount');
  if (display) display.textContent = `${count} players connected`;
}

// Export functions
window.RoomManager = {
  createRoom,
  joinRoom,
  broadcast,
  isHost: () => isHost,
  getRoomCode: () => myRoomCode,
};

/* ═══════════════════════════════════════
   ROOM MANAGER - PeerJS Integration
   Minimal integration for Create/Join Room
═══════════════════════════════════════ */

let peer = null;
let hostConn = null;
let guestConns = [];
let isHost = false;
let myName = '';
let myRoomCode = '';

const MSG = {
  FULL_STATE: 'FULL_STATE',
  SYNC_AUCTION: 'SYNC_AUCTION',
  BID_PLACED: 'BID_PLACED',
  PLAYER_SOLD: 'PLAYER_SOLD',
  NEXT_PLAYER: 'NEXT_PLAYER',
  JOIN_INFO: 'JOIN_INFO',
};

// Create Room (Host)
function createRoom(userName) {
  myName = userName;
  isHost = true;
  
  const code = randomCode(6);
  myRoomCode = code;
  const hostPeerId = 'iplauc-' + code;

  peer = new Peer(hostPeerId, {
    host: 'peerjs.com',
    secure: true,
    port: 443,
    path: '/',
    config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
  });

  peer.on('open', id => {
    console.log('Room created:', code);
    showRoomCode(code);
    setupHostListeners();
  });

  peer.on('connection', conn => {
    guestConns.push(conn);
    setupGuestConnection(conn);
  });

  peer.on('error', e => {
    console.error('Peer error:', e);
    alert('Failed to create room: ' + e.type);
  });
}

// Join Room (Guest)
function joinRoom(userName, roomCode) {
  myName = userName;
  isHost = false;
  myRoomCode = roomCode.toUpperCase();

  peer = new Peer(undefined, {
    host: 'peerjs.com',
    secure: true,
    port: 443,
    path: '/',
    config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
  });

  peer.on('open', myId => {
    const hostPeerId = 'iplauc-' + myRoomCode;
    hostConn = peer.connect(hostPeerId, { metadata: { name: userName }, reliable: true });

    hostConn.on('open', () => {
      console.log('Connected to room:', myRoomCode);
      hostConn.send(JSON.stringify({ type: MSG.JOIN_INFO, name: userName }));
      setupGuestReceiver();
    });

    hostConn.on('error', e => {
      console.error('Connection error:', e);
      alert('Room not found. Check code.');
    });
  });
}

// Setup host listeners
function setupHostListeners() {
  // Host will broadcast auction state changes
  window.addEventListener('auctionStateChange', (e) => {
    broadcast({ type: MSG.SYNC_AUCTION, data: e.detail });
  });
}

// Setup guest connection
function setupGuestConnection(conn) {
  conn.on('open', () => {
    console.log('Guest connected:', conn.peer);
    // Send current auction state to new guest
    const currentState = getCurrentAuctionState();
    conn.send(JSON.stringify({ type: MSG.FULL_STATE, data: currentState }));
  });

  conn.on('data', raw => {
    const msg = JSON.parse(raw);
    handleHostReceive(msg, conn);
  });

  conn.on('close', () => {
    guestConns = guestConns.filter(c => c !== conn);
    console.log('Guest disconnected');
  });
}

// Setup guest receiver
function setupGuestReceiver() {
  hostConn.on('data', raw => {
    const msg = JSON.parse(raw);
    handleGuestReceive(msg);
  });

  hostConn.on('close', () => {
    alert('Disconnected from host');
  });
}

// Handle messages from guests (host side)
function handleHostReceive(msg, conn) {
  if (msg.type === MSG.JOIN_INFO) {
    console.log('Guest joined:', msg.name);
    updateConnectedPlayers();
  }
  // Add more message handlers as needed
}

// Handle messages from host (guest side)
function handleGuestReceive(msg) {
  if (msg.type === MSG.FULL_STATE) {
    syncAuctionState(msg.data);
  } else if (msg.type === MSG.SYNC_AUCTION) {
    syncAuctionState(msg.data);
  }
}

// Broadcast to all guests
function broadcast(data) {
  guestConns.forEach(c => {
    if (c.open) c.send(JSON.stringify(data));
  });
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

// Helper: Random code generator
function randomCode(n) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// UI Helpers
function showRoomCode(code) {
  const display = document.getElementById('roomCodeDisplay');
  if (display) {
    display.textContent = `Room Code: ${code}`;
    display.style.display = 'block';
  }
}

function updateConnectedPlayers() {
  const count = isHost ? guestConns.length + 1 : 1;
  const display = document.getElementById('connectedCount');
  if (display) display.textContent = `${count} connected`;
}

// Export functions
window.RoomManager = {
  createRoom,
  joinRoom,
  broadcast,
  isHost: () => isHost,
  getRoomCode: () => myRoomCode,
};

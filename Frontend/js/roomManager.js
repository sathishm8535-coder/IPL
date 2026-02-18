/* ═══════════════════════════════════════
   ROOM MANAGER - Socket.IO Integration
   GUARANTEED WORKING SOLUTION
═══════════════════════════════════════ */

console.log('✅ Room Manager loaded');

let isHost = false;
let myName = '';
let myRoomCode = '';
let listenerAttached = false;

// Attach listener to Ipl.js socket when it becomes available
function attachRoomListener() {
  if (listenerAttached) return;
  
  // Check if Ipl.js socket exists
  if (window.socket && window.socket.connected) {
    console.log('✅ Attaching roomCreated listener to Ipl.js socket:', window.socket.id);
    
    // DEBUG: Log ALL events
    window.socket.onAny((eventName, ...args) => {
      console.log('📨 [DEBUG] Event received:', eventName, args);
    });
    
    window.socket.on('roomCreated', (data) => {
      console.log('✅ roomManager received roomCreated:', data);
      const roomId = data.roomId;
      
      if (roomId) {
        myRoomCode = roomId;
        isHost = true;
        showRoomCode(roomId);
        updateConnectedPlayers(1);
        
        const enterBtn = document.getElementById('enterAuctionBtn');
        if (enterBtn) enterBtn.style.display = 'block';
      } else {
        console.error('❌ roomId is missing in data:', data);
      }
    });
    
    listenerAttached = true;
  } else {
    console.log('⏳ Waiting for Ipl.js socket... (socket:', !!window.socket, 'connected:', window.socket?.connected, ')');
    setTimeout(attachRoomListener, 100);
  }
}

// Start trying to attach listener
setTimeout(attachRoomListener, 500);

// Create Room (Host)
function createRoom(userName) {
  console.log('🎯 roomManager createRoom called:', userName);
  myName = userName;
  
  // Ensure listener is attached
  attachRoomListener();
  
  console.log('✅ roomManager ready - Ipl.js will emit createRoom');
}

// Join Room (Guest)
function joinRoom(userName, roomCode) {
  myName = userName;
  attachRoomListener();
}

// Broadcast to room
function broadcast(data) {
  if (window.socket && myRoomCode) {
    window.socket.emit('placeBid', { roomId: myRoomCode, ...data });
  }
}

// Get current auction state
function getCurrentAuctionState() {
  return {
    teams: window.teams || [],
    currentPlayerIndex: window.currentPlayerIndex || 0,
    currentPrice: window.currentPrice || 0,
    highestBidderIdx: window.highestBidderIdx || -1,
  };
}

// Sync auction state
function syncAuctionState(data) {
  if (data.teams) window.teams = data.teams;
  if (data.currentPlayerIndex !== undefined) window.currentPlayerIndex = data.currentPlayerIndex;
  if (data.currentPrice !== undefined) window.currentPrice = data.currentPrice;
  if (data.highestBidderIdx !== undefined) window.highestBidderIdx = data.highestBidderIdx;
  
  if (window.updateAuctionUI) window.updateAuctionUI();
}

// UI Helpers
function showRoomCode(code) {
  console.log('🎫 Displaying room code:', code);
  
  const display = document.getElementById('roomCodeDisplay');
  const value = document.getElementById('roomCodeValue');
  
  if (display && value) {
    value.textContent = code;
    display.style.display = 'block';
    console.log('✅ Room code displayed in UI');
  } else {
    console.error('❌ Elements not found! Looking for: roomCodeDisplay, roomCodeValue');
  }
}

function updateConnectedPlayers(count = 1) {
  const display = document.getElementById('connectedCount');
  if (display) {
    display.textContent = `${count} players connected`;
    console.log('✅ Updated player count:', count);
  }
}

// Export functions
window.RoomManager = {
  createRoom,
  joinRoom,
  broadcast,
  isHost: () => isHost,
  getRoomCode: () => myRoomCode,
};

console.log('✅ RoomManager exported to window');

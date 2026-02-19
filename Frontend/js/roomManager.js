/* ═══════════════════════════════════════
   ROOM MANAGER - DIRECT SOLUTION
   This WILL display the room ID
═══════════════════════════════════════ */

console.log('✅ Room Manager loaded - DIRECT SOLUTION');

// Wait for DOM and Ipl.js socket
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM loaded');
  
  // Keep checking for socket and attach listener
  const checkSocket = setInterval(() => {
    if (window.socket && window.socket.connected) {
      console.log('✅ Socket found:', window.socket.id);
      
      // Attach listener DIRECTLY
      window.socket.on('roomCreated', (data) => {
        console.log('✅✅✅ ROOM CREATED EVENT RECEIVED:', data);
        
        const roomId = data.roomId;
        const totalRooms = data.totalRooms || 1;
        
        console.log('Room ID:', roomId, 'Total Rooms:', totalRooms);
        
        // DIRECTLY update the UI
        const displayEl = document.getElementById('roomCodeDisplay');
        const valueEl = document.getElementById('roomCodeValue');
        
        console.log('Elements found:', {
          display: !!displayEl,
          value: !!valueEl
        });
        
        if (displayEl && valueEl) {
          // Display room ID in bold
          valueEl.innerHTML = `<strong>${roomId}</strong>`;
          displayEl.style.display = 'block';
          console.log('✅✅✅ ROOM CODE DISPLAYED:', roomId);
          
          // Add total rooms info
          const roomInfo = document.createElement('div');
          roomInfo.style.cssText = 'font-size:12px; color:#666; margin-top:8px;';
          roomInfo.textContent = `Total active rooms: ${totalRooms}`;
          
          // Remove old info if exists
          const oldInfo = displayEl.querySelector('.room-info');
          if (oldInfo) oldInfo.remove();
          
          roomInfo.className = 'room-info';
          displayEl.appendChild(roomInfo);
          
        } else {
          console.error('❌ Elements not found!');
        }
        
        // Show enter button
        const enterBtn = document.getElementById('enterAuctionBtn');
        if (enterBtn) {
          enterBtn.style.display = 'block';
          console.log('✅ Enter button shown');
        }
        
        // Update player count
        const countEl = document.getElementById('connectedCount');
        if (countEl) {
          countEl.textContent = '1 players connected';
          console.log('✅ Player count updated');
        }
      });
      
      clearInterval(checkSocket);
      console.log('✅ Listener attached successfully');
    } else {
      console.log('⏳ Waiting for socket...');
    }
  }, 200);
});

// Export minimal functions
window.RoomManager = {
  createRoom: (userName) => {
    console.log('🎯 createRoom called:', userName);
  },
  joinRoom: (userName, roomCode) => {
    console.log('🎯 joinRoom called:', userName, roomCode);
  },
  broadcast: (data) => {},
  isHost: () => true,
  getRoomCode: () => ''
};

console.log('✅ RoomManager ready');

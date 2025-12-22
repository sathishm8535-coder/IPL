// Professional Multiplayer System for IPL Auction
class MultiplayerManager {
  constructor() {
    this.socket = null;
    this.currentRoomId = null;
    this.isHost = false;
    this.playerData = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.connectionAttempts = 0;
    this.maxAttempts = 10;
  }

  // Initialize connection
  connect() {
    if (this.socket?.connected) return Promise.resolve();
    
    return new Promise((resolve, reject) => {
      this.socket = io(window.location.origin, {
        transports: ['polling'],
        timeout: 5000,
        reconnection: true,
        reconnectionAttempts: 20,
        forceNew: true
      });

      this.socket.on('connect', () => {
        console.log('✅ Connected:', this.socket.id);
        this.updateStatus('✅ Connected', '#4CAF50');
        resolve();
      });

      this.socket.on('connect_error', () => {
        this.connectionAttempts++;
        if (this.connectionAttempts >= this.maxAttempts) {
          this.updateStatus('❌ Connection failed', '#f44336');
          reject(new Error('Connection failed'));
        }
      });

      this.setupEventListeners();
    });
  }

  // Create room
  async createRoom() {
    try {
      await this.connect();
      
      this.socket.emit('createRoom', {
        name: this.playerData.name || 'Anonymous',
        email: this.playerData.email || '',
        uid: this.playerData.uid || Date.now()
      });
      
      this.showNotification('Creating room...', 'info');
    } catch (error) {
      this.showNotification('Failed to connect to server', 'error');
    }
  }

  // Join room
  async joinRoom(roomId) {
    if (!roomId?.trim()) {
      this.showNotification('Enter a Room ID!', 'error');
      return;
    }

    try {
      await this.connect();
      
      this.socket.emit('joinRoom', {
        roomId: roomId.toUpperCase().trim(),
        userData: {
          name: this.playerData.name || 'Anonymous',
          email: this.playerData.email || '',
          uid: this.playerData.uid || Date.now()
        }
      });
      
      this.showNotification('Joining room...', 'info');
    } catch (error) {
      this.showNotification('Failed to connect to server', 'error');
    }
  }

  // Setup event listeners
  setupEventListeners() {
    // Room created
    this.socket.on('roomCreated', (data) => {
      this.currentRoomId = data.roomId;
      this.isHost = true;
      
      document.getElementById('roomId').value = data.roomId;
      document.getElementById('roomStatus').innerHTML = `
        <div style="color:#4CAF50;font-weight:bold">🏠 Room Created: ${data.roomId}</div>
        <div style="font-size:12px;color:#666">Share this ID with friends • ${data.playerCount} player(s)</div>
      `;
      
      this.showNotification(`Room Created: ${data.roomId}`, 'success');
    });

    // Room joined
    this.socket.on('joinedRoom', (data) => {
      this.currentRoomId = data.roomId;
      this.isHost = data.isHost || false;
      
      document.getElementById('roomStatus').innerHTML = `
        <div style="color:#4CAF50;font-weight:bold">✅ Joined Room: ${data.roomId}</div>
        <div style="font-size:12px;color:#666">${data.players.length} player(s) connected</div>
      `;
      
      this.showNotification(`Joined Room: ${data.roomId}`, 'success');
    });

    // Join error
    this.socket.on('joinError', (error) => {
      document.getElementById('roomStatus').innerHTML = `
        <div style="color:#f44336;font-weight:bold">❌ Failed to join room</div>
        <div style="font-size:12px;color:#666">${error}</div>
      `;
      this.showNotification(`Join Error: ${error}`, 'error');
    });

    // Player joined
    this.socket.on('playerJoined', (data) => {
      this.showNotification(`${data.player.name || 'Player'} joined`, 'info');
      this.updateRoomStatus(data.playerCount);
    });

    // Player left
    this.socket.on('playerLeft', (data) => {
      this.showNotification('A player left the room', 'info');
      this.updateRoomStatus(data.playerCount);
    });

    // Auction started
    this.socket.on('auctionStarted', (data) => {
      if (window.teams) {
        window.teams = data.teams;
      }
      this.showNotification('Auction Started!', 'success');
    });
  }

  // Update room status
  updateRoomStatus(playerCount) {
    if (this.currentRoomId) {
      const statusEl = document.getElementById('roomStatus');
      const currentHtml = statusEl.innerHTML;
      statusEl.innerHTML = currentHtml.replace(/\d+ player\(s\)/, `${playerCount} player(s)`);
    }
  }

  // Update server status
  updateStatus(message, color) {
    const statusEl = document.getElementById('serverStatus');
    if (statusEl) {
      statusEl.textContent = message;
      statusEl.style.color = color;
    }
  }

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; padding: 12px 16px;
      border-radius: 6px; color: white; font-weight: bold; z-index: 1001;
      max-width: 300px; word-wrap: break-word;
    `;
    
    const colors = {
      success: '#4CAF50',
      error: '#f44336',
      info: '#2196F3'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 4000);
  }
}

// Initialize multiplayer manager
const multiplayer = new MultiplayerManager();

// Setup button handlers
document.addEventListener('DOMContentLoaded', () => {
  const createBtn = document.getElementById('createRoom');
  const joinBtn = document.getElementById('joinRoom');
  const roomInput = document.getElementById('roomId');

  if (createBtn) {
    createBtn.addEventListener('click', () => multiplayer.createRoom());
  }

  if (joinBtn) {
    joinBtn.addEventListener('click', () => {
      const roomId = roomInput.value.trim();
      multiplayer.joinRoom(roomId);
    });
  }

  // Auto-connect on page load
  setTimeout(() => multiplayer.connect().catch(() => {}), 1000);
});
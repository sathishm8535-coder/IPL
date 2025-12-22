// Force connection fix for IPL Auction
(function() {
  console.log('🔧 Loading connection fix...');
  
  // Override socket initialization with simpler approach
  window.forceSocketConnection = function() {
    if (window.socket) {
      window.socket.disconnect();
    }
    
    window.socket = io(window.location.origin, {
      transports: ['polling'],
      timeout: 3000,
      reconnection: true,
      reconnectionAttempts: 100,
      reconnectionDelay: 1000,
      forceNew: true
    });
    
    window.socket.on('connect', () => {
      console.log('✅ Force connection successful');
      document.getElementById('serverStatus').textContent = '✅ Force connected';
      document.getElementById('serverStatus').style.color = '#4CAF50';
    });
    
    window.socket.on('connect_error', () => {
      console.log('❌ Force connection failed, retrying...');
      setTimeout(window.forceSocketConnection, 2000);
    });
  };
  
  // Auto-retry connection every 5 seconds
  setInterval(() => {
    if (!window.socket || !window.socket.connected) {
      console.log('🔄 Auto-retrying connection...');
      window.forceSocketConnection();
    }
  }, 5000);
  
  // Start force connection immediately
  setTimeout(window.forceSocketConnection, 2000);
  
  console.log('🔧 Connection fix loaded');
})();
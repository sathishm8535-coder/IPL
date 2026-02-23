const io = require('socket.io-client');

// Test room creation and joining
const socket1 = io('http://localhost:3000');
const socket2 = io('http://localhost:3000');

let roomId = null;

socket1.on('connect', () => {
  console.log('Socket 1 connected');
  
  // Create room
  socket1.emit('createRoom', { name: 'Test User 1' });
});

socket1.on('roomCreated', (id) => {
  console.log('Room created:', id);
  roomId = id;
  
  // Now connect socket 2 and try to join
  socket2.on('connect', () => {
    console.log('Socket 2 connected');
    console.log('Trying to join room:', roomId);
    
    socket2.emit('joinRoom', { 
      roomId: roomId, 
      userData: { name: 'Test User 2' } 
    });
  });
});

socket2.on('joinedRoom', (data) => {
  console.log('Successfully joined room:', data);
  process.exit(0);
});

socket2.on('joinError', (error) => {
  console.log('Join error:', error);
  process.exit(1);
});

setTimeout(() => {
  console.log('Test timeout');
  process.exit(1);
}, 5000);
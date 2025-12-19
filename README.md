# IPL Auction Multiplayer Game

A real-time multiplayer IPL auction game where multiple players can bid on cricket players simultaneously across different devices.

## Features

- **Multiplayer Support**: Multiple players can join the same auction room
- **Real-time Bidding**: Live synchronization of bids across all devices
- **Mobile Responsive**: Optimized for mobile devices and touch interactions
- **PWA Support**: Can be installed as a mobile app
- **Google Authentication**: Secure login with Google accounts
- **Live Scoreboard**: Real-time updates of team standings
- **Cross-platform**: Works on desktop, tablet, and mobile devices

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Quick Start

1. **Start the Server** (Windows):
   - Double-click `start-server.bat`
   - Or manually run:
     ```bash
     cd Backend
     npm install
     npm start
     ```

2. **Access the Game**:
   - Open browser and go to: `http://localhost:3000`
   - On mobile devices, use your computer's IP address: `http://YOUR_IP:3000`

### For Mobile Multiplayer

1. **Find your computer's IP address**:
   - Windows: Open Command Prompt and type `ipconfig`
   - Look for "IPv4 Address" (usually starts with 192.168.x.x)

2. **Connect mobile devices**:
   - Ensure all devices are on the same WiFi network
   - Open browser on mobile and go to: `http://YOUR_IP:3000`
   - Example: `http://192.168.1.100:3000`

### Multiplayer Setup

1. **Create a Room**:
   - One player clicks "Create Room"
   - Share the Room ID with other players

2. **Join a Room**:
   - Other players enter the Room ID and click "Join Room"
   - All players will see the same auction in real-time

3. **Start Auction**:
   - Set up teams and player names
   - Click "Start Auction"
   - All players can now bid simultaneously

## How to Play

1. **Login**: Use Google account to login
2. **Setup Teams**: 
   - Select number of friends (1-10)
   - Assign team names and IPL franchises
   - Upload custom avatars (optional)
3. **Multiplayer** (optional):
   - Create or join a room for multiplayer experience
4. **Start Auction**:
   - Players appear one by one
   - Click your team button to place bids
   - Timer counts down after first bid
   - Highest bidder wins the player
5. **View Results**: See final team compositions and winner

## Game Rules

- **Budget**: Each team starts with ₹100 Crores
- **Team Size**: Maximum 26 players per team
- **Foreign Players**: Maximum 8 foreign players per team
- **Bidding**: Increments of ₹1 Crore per bid
- **Timer**: 10 seconds after first bid
- **Winning**: Team with highest total points wins

## Troubleshooting

### Connection Issues
- Ensure all devices are on the same WiFi network
- Check firewall settings (allow port 3000)
- Try refreshing the page if connection fails

### Mobile Issues
- Use Chrome or Safari for best compatibility
- Enable JavaScript in browser settings
- Clear browser cache if experiencing issues

### Server Issues
- Make sure Node.js is installed
- Run `npm install` in Backend folder
- Check if port 3000 is available

## Technical Details

- **Backend**: Node.js with Express and Socket.IO
- **Frontend**: Vanilla JavaScript with responsive CSS
- **Real-time**: WebSocket connections for live updates
- **Authentication**: Firebase Google Auth
- **PWA**: Service Worker for offline functionality

## File Structure

```
IPL-/
├── Backend/
│   ├── server.js          # Main server file
│   └── package.json       # Server dependencies
├── Frontend/
│   ├── index.html         # Main game page
│   ├── login.html         # Login page
│   ├── css/IpL.css       # Styles
│   ├── js/Ipl.js         # Game logic
│   ├── assets/           # Images and icons
│   ├── manifest.json     # PWA manifest
│   └── sw.js            # Service worker
└── start-server.bat      # Quick start script
```

## Support

For issues or questions:
1. Check that all devices are connected to the same network
2. Ensure the server is running on port 3000
3. Try refreshing the browser page
4. Check browser console for error messages

Enjoy your IPL Auction experience! 🏏
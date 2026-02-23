# IPL Auction Multiplayer Game

🏏 **QUICK START**: Double-click `cleanup-and-setup.bat` to auto-setup and start!

A real-time multiplayer IPL auction game where multiple players can bid on cricket players simultaneously across different devices.

## 🚀 Quick Setup

### Windows (Recommended):
1. **Double-click** `cleanup-and-setup.bat`
2. Server starts automatically on http://localhost:3000
3. For mobile: Use your IP address (e.g., http://192.168.1.100:3000)

### Manual Setup:
```bash
cd Backend
npm install
npm start
```

## 🎮 How to Play

### Multiplayer Mode:
1. **Host**: Click "Create Room" → Share Room ID
2. **Players**: Enter Room ID → Click "Join Room" 
3. **All**: Select IPL teams
4. **Host**: Click "Start Auction"
5. **Everyone**: Bid in real-time!

## 🌐 Mobile Access
- Find your IP: Run `ipconfig` in Command Prompt
- Mobile URL: http://YOUR_IP:3000
- Example: http://192.168.1.100:3000

## ✨ Features
- Real-time multiplayer bidding
- Google authentication
- Mobile responsive design
- PWA support (install as app)
- Live scoreboard
- Room-based multiplayer
- Complete auction management

## 📁 Structure
```
IPL/
├── Backend/server.js     # Main server
├── Frontend/            # Game files
├── cleanup-and-setup.bat # Auto setup
└── COMPLETE-SETUP.md    # Detailed guide
```

## 🔧 Troubleshooting
- **Server issues**: Run as Administrator
- **Mobile connection**: Same WiFi network required
- **Port conflicts**: Ensure port 3000 is free

**Ready to play? Run `cleanup-and-setup.bat`! 🏆**
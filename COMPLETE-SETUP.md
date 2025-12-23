# 🏏 IPL Auction Multiplayer Game - Complete Setup

## ✅ QUICK START (Windows)

### Method 1: Automatic Setup
1. **Double-click** `cleanup-and-setup.bat`
2. **Wait** for dependencies to install
3. **Server starts automatically** on http://localhost:3000

### Method 2: Manual Setup
1. Open Command Prompt in project folder
2. Run: `cd Backend && npm install && npm start`
3. Open browser: http://localhost:3000

## 🌐 MULTIPLAYER ACCESS

### For Mobile/Other Devices:
1. **Find your IP address**: Run `ipconfig` in Command Prompt
2. **Look for IPv4 Address** (e.g., 192.168.1.100)
3. **On mobile**: Open browser → http://YOUR_IP:3000
4. **Example**: http://192.168.1.100:3000

## 🎮 HOW TO PLAY

### Single Player Mode:
1. Go to http://localhost:3000
2. Login with Google
3. Select friends (1-10)
4. Choose IPL teams
5. Click "Start Auction"
6. Bid on players!

### Multiplayer Mode:
1. **Host**: Click "Create Room" → Share Room ID
2. **Players**: Enter Room ID → Click "Join Room"
3. **All players**: Select teams
4. **Host**: Click "Start Auction"
5. **Everyone can bid** in real-time!

## 📁 PROJECT STRUCTURE
```
IPL/
├── Backend/
│   ├── server.js          # Main server
│   └── package.json       # Dependencies
├── Frontend/
│   ├── index.html         # Main game
│   ├── login.html         # Google login
│   ├── css/IpL.css       # Styles
│   ├── js/Ipl.js         # Game logic
│   └── assets/           # Player images
├── cleanup-and-setup.bat  # Auto setup
└── start-server.bat      # Quick start
```

## 🔧 FEATURES
- ✅ **Real-time Multiplayer** - Multiple players bid simultaneously
- ✅ **Google Authentication** - Secure login
- ✅ **Mobile Responsive** - Works on phones/tablets
- ✅ **PWA Support** - Install as mobile app
- ✅ **Live Scoreboard** - Real-time team updates
- ✅ **Room System** - Create/Join private rooms
- ✅ **Team Management** - Budget tracking, player limits
- ✅ **Auction History** - Track all bids and sales

## 🚀 DEPLOYMENT OPTIONS

### Local Network (Recommended):
- Use your computer's IP address
- All devices on same WiFi can join

### Cloud Deployment:
- Deploy to Heroku, Railway, or Render
- Update socket connection URLs

## 🛠️ TROUBLESHOOTING

### Server Won't Start:
- Check if port 3000 is free
- Run `npm install` in Backend folder
- Restart Command Prompt as Administrator

### Mobile Can't Connect:
- Ensure same WiFi network
- Check Windows Firewall settings
- Use computer's IP address, not localhost

### Room Creation Issues:
- Refresh the page
- Check browser console for errors
- Restart the server

## 📱 MOBILE INSTALLATION
1. Open game in mobile browser
2. Tap browser menu → "Add to Home Screen"
3. Game installs as native app!

## 🎯 GAME RULES
- **Budget**: ₹100 Crores per team
- **Team Size**: Max 26 players
- **Foreign Players**: Max 8 per team
- **Bidding**: ₹1 Crore increments
- **Timer**: 10 seconds after first bid
- **Winner**: Highest total points

## 🔥 READY TO PLAY!
Run `cleanup-and-setup.bat` and start your IPL auction! 🏆
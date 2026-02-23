# 🎮 MULTIPLAYER SETUP - STEP BY STEP

## ⚠️ IMPORTANT: Follow These Steps Exactly

### Step 1: Start Server on ONE Computer Only
1. Double-click `start-server.bat` on ONE computer (the host computer)
2. Wait for message: "IPL Auction Server running on port 3000"
3. **DO NOT** start server on other devices!

### Step 2: Find Host Computer's IP Address
1. On the host computer, press `Windows + R`
2. Type `cmd` and press Enter
3. Type `ipconfig` and press Enter
4. Look for "IPv4 Address" (example: 192.168.1.100)
5. **Write down this IP address!**

### Step 3: Connect All Devices to Same Server
**All devices must use the SAME URL:**

- Host computer: `http://192.168.1.100:3000` (use your actual IP)
- Friend's phone: `http://192.168.1.100:3000` (same IP)
- Friend's laptop: `http://192.168.1.100:3000` (same IP)

### Step 4: Test Connection
1. Open the URL on each device
2. Check top-right corner shows "🟢 Connected"
3. If shows "🔴 Disconnected", check:
   - All devices on same WiFi network
   - Using correct IP address
   - Server is running on host computer

### Step 5: Create and Join Room
1. **Host player**: Click "Create Room" → Get room ID (like ABC123)
2. **Other players**: Enter room ID and click "Join Room"
3. All players should see "Room ABC123 - X players connected"

### Step 6: Start Auction
1. **Any player** can set up teams and start auction
2. All players will see the same auction screen
3. Everyone can bid in real-time!

## 🔧 Troubleshooting

### "Room not found" error:
- Make sure all devices connect to SAME IP address
- Only ONE server should be running
- Check room ID is typed correctly

### "🔴 Disconnected" status:
- Check all devices on same WiFi
- Verify IP address is correct
- Restart server if needed

### Can't connect from phone:
- Make sure phone is on same WiFi as computer
- Try typing IP address manually in phone browser
- Disable mobile data, use only WiFi

## 📱 Quick Test
1. Host: Start server, get IP (like 192.168.1.100)
2. Host: Open `http://192.168.1.100:3000`
3. Friend: Open `http://192.168.1.100:3000` on their device
4. Both should see "🟢 Connected"
5. Host: Create room → Share room ID
6. Friend: Join room with ID
7. Start auction and bid!

**Remember: Everyone uses the SAME IP address!**
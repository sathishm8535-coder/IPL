# Multiplayer Setup Instructions

## The Problem
Each device is connecting to its own local server, not a shared server. That's why rooms created on one device can't be joined from another device.

## Solution: Use ONE Shared Server

### Option 1: Local Network (Same WiFi)

1. **Start Server on ONE Computer**
   - Run `start-server.bat` on ONE computer only
   - Find this computer's IP address:
     - Windows: Open Command Prompt, type `ipconfig`
     - Look for "IPv4 Address" (e.g., 192.168.1.100)

2. **Connect All Devices to This Server**
   - Device 1 (Server computer): `http://192.168.1.100:3000`
   - Device 2 (Mobile): `http://192.168.1.100:3000`
   - Device 3 (Mobile): `http://192.168.1.100:3000`
   - All devices use the SAME IP address

3. **Test Connection**
   - All devices should show "🟢 Connected" in top-right
   - If not connected, check:
     - All devices on same WiFi
     - Firewall allows port 3000
     - Using correct IP address

### Option 2: Deploy to Cloud (Internet)

Deploy the server to a cloud service so anyone can connect:

1. **Deploy to Render.com** (Free)
   - Push code to GitHub
   - Connect Render to your GitHub repo
   - Deploy the Backend folder
   - Get public URL (e.g., https://your-app.onrender.com)

2. **All Devices Connect to Cloud URL**
   - Everyone uses: https://your-app.onrender.com
   - Works from anywhere with internet

## Current Issue

Right now, the code tries to connect to `window.location.host`, which means:
- Device 1 connects to its own localhost
- Device 2 connects to its own localhost
- They're on DIFFERENT servers, so rooms don't match!

## Quick Fix for Testing

All devices must use the SAME server URL. Make sure:
1. Only ONE server is running
2. All devices connect to that ONE server's IP address
3. Check server console to see connection logs

## Verify It's Working

1. Start server, check console shows: "IPL Auction Server running on port 3000"
2. Device 1 creates room, console shows: "Room ABC123 created"
3. Device 2 joins room, console shows: "JOIN ROOM EVENT RECEIVED"
4. If console shows "Room not found", devices are on different servers!
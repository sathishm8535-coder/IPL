@echo off
echo ========================================
echo IPL AUCTION PROJECT CLEANUP & SETUP
echo ========================================

echo.
echo 1. Removing duplicate files...
if exist "test-room-setup.html" del "test-room-setup.html"
if exist "debug-room.html" del "debug-room.html"
if exist "test-server.bat" del "test-server.bat"

echo.
echo 2. Installing dependencies...
cd Backend
if not exist "node_modules" (
    echo Installing backend dependencies...
    npm install
) else (
    echo Backend dependencies already installed.
)

echo.
echo 3. Checking server configuration...
if exist "server.js" (
    echo ✅ Server file found
) else (
    echo ❌ Server file missing!
    pause
    exit /b 1
)

echo.
echo 4. Starting IPL Auction Server...
echo ========================================
echo 🏏 IPL AUCTION MULTIPLAYER SERVER
echo ========================================
echo.
echo Server will start on http://localhost:3000
echo For mobile access, use your IP address
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

npm start
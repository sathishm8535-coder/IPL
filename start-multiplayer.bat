@echo off
title IPL Auction Multiplayer Server
color 0A

echo.
echo ========================================
echo   IPL AUCTION MULTIPLAYER SERVER
echo ========================================
echo.

echo [1/5] Checking Node.js...
node --version > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Install from https://nodejs.org/
    pause & exit /b 1
)
echo ✅ Node.js ready

echo.
echo [2/5] Checking port 3000...
netstat -an | findstr :3000 > nul
if %errorlevel% == 0 (
    echo ⚠️  Port 3000 in use, killing process...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do taskkill /PID %%a /F > nul 2>&1
    timeout /t 2 > nul
)
echo ✅ Port 3000 available

echo.
echo [3/5] Installing dependencies...
cd Backend
npm install > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause & exit /b 1
)
echo ✅ Dependencies installed

echo.
echo [4/5] Getting network info...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set IP=%%a
    set IP=!IP: =!
)

echo.
echo [5/5] Starting server...
echo.
echo ========================================
echo   🏏 IPL AUCTION SERVER READY!
echo ========================================
echo.
echo 💻 Local:    http://localhost:3000
echo 📱 Mobile:   http://!IP!:3000
echo.
echo ✅ Server starting...
echo ========================================
echo.

npm start
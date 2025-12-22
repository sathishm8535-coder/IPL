@echo off
echo ========================================
echo IPL AUCTION CONNECTION FIX UTILITY
echo ========================================
echo.

echo Step 1: Checking if server is running...
netstat -an | findstr :3000 > nul
if %errorlevel% == 0 (
    echo ✅ Server is running on port 3000
) else (
    echo ❌ Server is NOT running on port 3000
    echo Starting server...
    start "IPL Server" cmd /k "cd Backend && npm install && npm start"
    timeout /t 5 > nul
)

echo.
echo Step 2: Checking Windows Firewall...
netsh advfirewall firewall show rule name="Node.js" > nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Firewall rule exists for Node.js
) else (
    echo ⚠️  Adding firewall rule for Node.js...
    netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\Program Files\nodejs\node.exe" enable=yes
    netsh advfirewall firewall add rule name="Node.js" dir=out action=allow program="C:\Program Files\nodejs\node.exe" enable=yes
)

echo.
echo Step 3: Getting your IP address for mobile devices...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set IP=%%a
    set IP=!IP: =!
    echo Your IP Address: !IP!
    echo Mobile URL: http://!IP!:3000
)

echo.
echo Step 4: Testing connection...
timeout /t 3 > nul
curl -s http://localhost:3000/api/rooms > nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Connection test successful
) else (
    echo ❌ Connection test failed
    echo Please check if server is running properly
)

echo.
echo ========================================
echo CONNECTION FIX COMPLETE
echo ========================================
echo.
echo If you still have issues:
echo 1. Make sure all devices are on the same WiFi network
echo 2. Disable Windows Defender Firewall temporarily
echo 3. Try using your computer's IP address instead of localhost
echo 4. Restart the server by running start-server.bat
echo.
pause
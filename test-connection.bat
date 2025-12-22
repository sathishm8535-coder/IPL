@echo off
echo ========================================
echo IPL AUCTION CONNECTION TEST
echo ========================================
echo.

echo Testing server connection...
echo.

echo 1. Checking if Node.js is installed...
node --version > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js is installed

echo.
echo 2. Checking if server is running on port 3000...
netstat -an | findstr :3000 > nul
if %errorlevel% == 0 (
    echo ✅ Server is running on port 3000
) else (
    echo ❌ Server is NOT running
    echo Starting server now...
    echo.
    start "IPL Server" cmd /k "cd Backend && npm install && npm start"
    echo Waiting for server to start...
    timeout /t 10 > nul
)

echo.
echo 3. Testing HTTP connection...
curl -s http://localhost:3000/api/rooms > nul 2>&1
if %errorlevel% == 0 (
    echo ✅ HTTP connection successful
) else (
    echo ❌ HTTP connection failed
    echo Trying alternative method...
    powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:3000/api/rooms' -TimeoutSec 5 | Out-Null; Write-Host '✅ PowerShell connection successful' } catch { Write-Host '❌ PowerShell connection failed' }"
)

echo.
echo 4. Getting network information...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set IP=%%a
    set IP=!IP: =!
    echo Your computer IP: !IP!
    echo Mobile URL: http://!IP!:3000
)

echo.
echo 5. Testing firewall...
netsh advfirewall firewall show rule name="Node.js" > nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Firewall rule exists
) else (
    echo ⚠️  Adding firewall rule...
    netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\Program Files\nodejs\node.exe" enable=yes > nul 2>&1
    if %errorlevel% == 0 (
        echo ✅ Firewall rule added
    ) else (
        echo ❌ Failed to add firewall rule (run as administrator)
    )
)

echo.
echo ========================================
echo CONNECTION TEST COMPLETE
echo ========================================
echo.
echo If all tests pass, your connection should work.
echo If you still have issues:
echo 1. Try refreshing the browser page
echo 2. Use your IP address instead of localhost
echo 3. Make sure all devices are on same WiFi
echo 4. Temporarily disable Windows Firewall
echo.
pause
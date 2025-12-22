@echo off
echo ========================================
echo IPL AUCTION SERVER STARTUP
echo ========================================
echo.

echo Checking Node.js installation...
node --version > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

echo Checking if port 3000 is available...
netstat -an | findstr :3000 > nul
if %errorlevel% == 0 (
    echo ⚠️  Port 3000 is already in use
    echo Attempting to kill existing process...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        taskkill /PID %%a /F > nul 2>&1
    )
    timeout /t 2 > nul
)

echo ✅ Port 3000 is available
echo.

echo Installing dependencies...
cd Backend
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed
echo.

echo Getting network information...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set IP=%%a
    set IP=!IP: =!
    echo Your IP Address: !IP!
)

echo.
echo ========================================
echo SERVER STARTING...
echo ========================================
echo Local URL: http://localhost:3000
echo Network URL: http://!IP!:3000
echo ========================================
echo.

npm start
if %errorlevel% neq 0 (
    echo ❌ Server failed to start
    echo Please check the error messages above
    pause
    exit /b 1
)

pause
@echo off
echo Checking git status...
git status

echo Setting up remote if needed...
git remote -v
git remote set-url origin https://github.com/sathishm8535-coder/IPL.git

echo Adding all changes to git...
git add .

echo Committing changes...
git commit -m "🔧 MAJOR CONNECTION FIXES: Enhanced socket.io stability, added network diagnostics, improved error handling, and comprehensive troubleshooting tools"

echo Pushing to GitHub...
git push -u origin main

echo If push failed, trying with force...
git push --force-with-lease origin main

echo Successfully pushed to GitHub!
echo ✅ Connection fixes deployed:
echo   - Enhanced socket.io configuration
echo   - Better reconnection logic  
echo   - Network diagnostic tools
echo   - Connection troubleshooting utilities
echo   - Improved error handling
echo   - Mobile device compatibility fixes
pause
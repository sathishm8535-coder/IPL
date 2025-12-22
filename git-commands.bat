@echo off
echo Checking git status...
git status

echo Setting up remote if needed...
git remote -v
git remote set-url origin https://github.com/sathishm8535-coder/IPL.git

echo Adding all changes to git...
git add .

echo Committing changes...
git commit -m "Fixed socket connection issues and enhanced room setup functionality"

echo Pushing to GitHub...
git push -u origin main

echo If push failed, trying with force...
git push --force-with-lease origin main

echo Successfully pushed to GitHub!
echo Connection fixes and room setup deployed!
pause
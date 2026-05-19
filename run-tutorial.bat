@echo off
title BudgetFit Immersive Tutorial & Architecture Portal
echo =======================================================
echo     BudgetFit Immersive Tutorial Launch Script
echo =======================================================

echo [1/3] Checking and installing backend dependencies...
cd backend
call npm install

echo [2/3] Checking and installing frontend dependencies...
cd ../frontend
call npm install

echo [3/3] Launching Backend API (Port 5000) and Frontend Dev Server (Port 5173)...
cd ..

rem Start backend server in a separate window
start "BudgetFit Backend API (Port 5000)" cmd /c "cd backend && npm start"

rem Start frontend dev server in the current window
cd frontend
call npm run dev

pause

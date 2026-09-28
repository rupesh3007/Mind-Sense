@echo off
cd /d "%~dp0"
title MindSense API - Port 5000
cls
echo.
echo  ========================================
echo    MindSense BACKEND (do not close this)
echo  ========================================
echo    Using folder:
echo    %CD%
echo  ========================================
echo.
node server.js
echo.
echo  --- The server stopped (read errors above) ---
pause

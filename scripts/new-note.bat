@echo off
setlocal
cd /d "%~dp0.." || exit /b 1
node "scripts\new-note.mjs" %*
exit /b %ERRORLEVEL%

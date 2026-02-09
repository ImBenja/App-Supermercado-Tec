@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════
echo      INICIANDO FRONTEND (Puerto 5500)
echo ════════════════════════════════════════
echo.
echo ✓ Frontend disponible en: http://localhost:5500
echo.
cd frontend
py -m http.server 5500

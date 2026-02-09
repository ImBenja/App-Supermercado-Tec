# Script para iniciar el Frontend (PowerShell)
Clear-Host
Write-Host "`n════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "    INICIANDO FRONTEND (Puerto 5500)" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════`n" -ForegroundColor Cyan

Write-Host "✓ Frontend disponible en: http://localhost:5500`n" -ForegroundColor Green

Set-Location frontend
python -m http.server 5500

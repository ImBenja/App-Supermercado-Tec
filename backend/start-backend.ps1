# Script para iniciar el Backend (PowerShell)
Clear-Host
Write-Host "`n════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "    INICIANDO BACKEND (Puerto 8080)" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════`n" -ForegroundColor Cyan

Set-Location appsupermercado

Write-Host "[INFO] Ejecutando backend...`n" -ForegroundColor Yellow
& .\mvnw spring-boot:run

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n════════════════════════════════════════" -ForegroundColor Red
    Write-Host "    ERROR: Intenta lo siguiente:" -ForegroundColor Red
    Write-Host "════════════════════════════════════════`n" -ForegroundColor Red
    Write-Host "1. Elimina manualmente: appsupermercado\target" -ForegroundColor Yellow
    Write-Host "2. Vuelve a ejecutar este script`n" -ForegroundColor Yellow
    Read-Host "Presiona Enter para cerrar"
    exit 1
}

$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"

Copy-Item `
".\index.html" `
".\backups\index_$timestamp.html"

Write-Host ""
Write-Host "? Backup created:" -ForegroundColor Green
Write-Host ".\backups\index_$timestamp.html"

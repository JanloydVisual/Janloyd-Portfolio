$websiteRoot = Split-Path $PSScriptRoot -Parent

$file = Join-Path $websiteRoot "index.html"

$html = Get-Content $file -Raw

$pattern = 'src="data:image/png;base64,[^"]+"'

$replacement = 'src="assets/images/logo.png"'

if ($html -match $pattern) {

    $html = [regex]::Replace($html, $pattern, $replacement, 1)

    Set-Content $file $html -Encoding UTF8

    Write-Host ""
    Write-Host "? Base64 logo replaced." -ForegroundColor Green
}
else {

    Write-Host "No Base64 logo found." -ForegroundColor Yellow

}

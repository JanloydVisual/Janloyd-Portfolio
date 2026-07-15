$websiteRoot = Split-Path $PSScriptRoot -Parent

$file = Join-Path $websiteRoot "index.html"
$out  = Join-Path $websiteRoot "assets\images\logo.png"

$html = Get-Content $file -Raw

if ($html -match 'src="data:image/png;base64,([^"]+)"') {

    $base64 = $Matches[1]

    [System.IO.File]::WriteAllBytes(
        $out,
        [Convert]::FromBase64String($base64)
    )

    Write-Host ""
    Write-Host "? Logo extracted successfully." -ForegroundColor Green
    Write-Host $out
}
else {

    Write-Host "No Base64 logo found." -ForegroundColor Red

}

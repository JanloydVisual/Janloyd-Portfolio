$file = ".\index.html"
$cssFile = ".\css\styles.css"

$html = Get-Content $file -Raw

if ($html -match '(?s)<style>(.*?)</style>') {

    $css = $Matches[1].Trim()

    Set-Content $cssFile $css -Encoding UTF8

    $html = [regex]::Replace(
        $html,
        '(?s)<style>.*?</style>',
        '<link rel="stylesheet" href="css/styles.css">'
    )

    Set-Content $file $html -Encoding UTF8

    Write-Host ""
    Write-Host "? CSS extracted successfully." -ForegroundColor Green
}
else {
    Write-Host "No <style> block found." -ForegroundColor Red
}

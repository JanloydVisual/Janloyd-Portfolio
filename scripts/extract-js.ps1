$file = ".\index.html"
$jsFile = ".\js\main.js"

$html = Get-Content $file -Raw

$matches = [regex]::Matches(
    $html,
    '(?s)<script>(.*?)</script>'
)

if($matches.Count -eq 0){
    Write-Host "No inline JavaScript found." -ForegroundColor Red
    exit
}

$js = ""

foreach($m in $matches){
    $js += $m.Groups[1].Value.Trim()
    $js += "`r`n`r`n"
}

Set-Content $jsFile $js -Encoding UTF8

$html = [regex]::Replace(
    $html,
    '(?s)<script>(.*?)</script>',
    '',
    [System.Text.RegularExpressions.RegexOptions]::Singleline
)

$html = $html -replace '</body>', '  <script src="js/main.js"></script>`r`n</body>'

Set-Content $file $html -Encoding UTF8

Write-Host ""
Write-Host "? JavaScript extracted successfully." -ForegroundColor Green

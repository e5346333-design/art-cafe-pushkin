# Builds the standalone pushkin-onefile.html: inline CSS/JS, images as base64.
# Usage from the project root:
#   powershell -ExecutionPolicy Bypass -File tools/build-onefile.ps1
# Keep this file ASCII-only: Windows PowerShell 5.1 reads .ps1 without BOM as ANSI.

$root = Split-Path -Parent $PSScriptRoot
$html = [System.IO.File]::ReadAllText((Join-Path $root 'index.html'), [System.Text.Encoding]::UTF8)
$css  = [System.IO.File]::ReadAllText((Join-Path $root 'styles.css'), [System.Text.Encoding]::UTF8)
$js   = [System.IO.File]::ReadAllText((Join-Path $root 'script.js'), [System.Text.Encoding]::UTF8)

function To-DataUri($relativePath) {
  $path = Join-Path $root $relativePath
  $ext = [System.IO.Path]::GetExtension($path).TrimStart('.').ToLower()
  if ($ext -eq 'png') { $mime = 'image/png' } else { $mime = 'image/jpeg' }
  $b64 = [System.Convert]::ToBase64String([System.IO.File]::ReadAllBytes($path))
  return "data:$mime;base64,$b64"
}

# 1. external stylesheet -> inline <style>
$html = $html.Replace('<link rel="stylesheet" href="styles.css">', "<style>`n$css`n</style>")

# 2. images -> base64, drop the now useless preload of the hero image
foreach ($img in @('assets/hall.jpg', 'assets/coffee.jpg')) {
  $html = $html.Replace($img, (To-DataUri $img))
}
$html = $html -replace '(?m)^\s*<link rel="preload" as="image"[^>]*>\s*$', ''

# 3. external script -> inline
$html = $html.Replace('<script src="script.js"></script>', "<script>`n$js`n</script>")

$out = Join-Path $root 'pushkin-onefile.html'
[System.IO.File]::WriteAllText($out, $html, (New-Object System.Text.UTF8Encoding($false)))
Write-Host ("Done: {0} ({1:N0} KB)" -f $out, ((Get-Item $out).Length / 1KB))

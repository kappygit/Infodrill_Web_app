Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $projectRoot "public"
$logoPath = Join-Path $publicDir "logo.png"

Write-Host "Reading master logo from: $logoPath"

# Load original logo
$logo = [System.Drawing.Bitmap]::FromFile($logoPath)

# Exact emblem bounds in logo.png: minX=259, maxX=400, minY=85, maxY=285
$emblemRect = [System.Drawing.Rectangle]::FromLTRB(259, 85, 401, 286)
$emblem = $logo.Clone($emblemRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

function Create-SquareIcon($srcImage, $outPath, $canvasSize, $paddingRatio) {
    $bmp = New-Object System.Drawing.Bitmap($canvasSize, $canvasSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    
    $availHeight = $canvasSize * (1.0 - ($paddingRatio * 2.0))
    $drawHeight = $availHeight
    $drawWidth = $drawHeight * ($srcImage.Width / [double]$srcImage.Height)
    
    if ($drawWidth -gt ($canvasSize * (1.0 - ($paddingRatio * 2.0)))) {
        $drawWidth = $canvasSize * (1.0 - ($paddingRatio * 2.0))
        $drawHeight = $drawWidth * ($srcImage.Height / [double]$srcImage.Width)
    }
    
    $x = ($canvasSize - $drawWidth) / 2.0
    $y = ($canvasSize - $drawHeight) / 2.0
    
    $destRect = New-Object System.Drawing.RectangleF($x, $y, $drawWidth, $drawHeight)
    $srcRect = New-Object System.Drawing.RectangleF(0, 0, $srcImage.Width, $srcImage.Height)
    
    $g.DrawImage($srcImage, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $g.Dispose()
    
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created: $outPath ($($canvasSize)x$($canvasSize))"
}

# 1. Generate PNG variants
Create-SquareIcon $emblem (Join-Path $publicDir "favicon-16x16.png") 16 0.06
Create-SquareIcon $emblem (Join-Path $publicDir "favicon-32x32.png") 32 0.06
Create-SquareIcon $emblem (Join-Path $publicDir "favicon-48x48.png") 48 0.06
Create-SquareIcon $emblem (Join-Path $publicDir "apple-touch-icon.png") 180 0.12
Create-SquareIcon $emblem (Join-Path $publicDir "favicon-192x192.png") 192 0.08
Create-SquareIcon $emblem (Join-Path $publicDir "favicon-512x512.png") 512 0.08
Create-SquareIcon $emblem (Join-Path $publicDir "favicon.png") 512 0.08

# 2. Pack multi-size ICO file (16, 32, 48)
function Pack-Ico($pngPaths, $outIcoPath) {
    $pngDataList = [System.Collections.Generic.List[byte[]]]::new()
    $sizes = [System.Collections.Generic.List[int]]::new()
    
    foreach ($p in $pngPaths) {
        $bytes = [System.IO.File]::ReadAllBytes($p)
        $pngDataList.Add($bytes)
        $img = [System.Drawing.Image]::FromFile($p)
        $sizes.Add($img.Width)
        $img.Dispose()
    }
    
    $fs = [System.IO.File]::Create($outIcoPath)
    $bw = [System.IO.BinaryWriter]::new($fs)
    
    # ICO Header: Reserved (0), Type (1 = ICO), Count
    $bw.Write([uint16]0)
    $bw.Write([uint16]1)
    $bw.Write([uint16]$pngPaths.Length)
    
    $offset = 6 + ($pngPaths.Length * 16)
    
    for ($i = 0; $i -lt $pngPaths.Length; $i++) {
        $w = if ($sizes[$i] -ge 256) { [byte]0 } else { [byte]$sizes[$i] }
        $h = $w
        $len = $pngDataList[$i].Length
        
        $bw.Write([byte]$w)
        $bw.Write([byte]$h)
        $bw.Write([byte]0)
        $bw.Write([byte]0)
        $bw.Write([uint16]1)
        $bw.Write([uint16]32)
        $bw.Write([uint32]$len)
        $bw.Write([uint32]$offset)
        
        $offset += $len
    }
    
    for ($i = 0; $i -lt $pngPaths.Length; $i++) {
        $bytes = $pngDataList[$i]
        $bw.Write($bytes, 0, $bytes.Length)
    }
    
    $bw.Flush()
    $bw.Dispose()
    $fs.Dispose()
    
    Write-Host "Created multi-size ICO: $outIcoPath"
}

$icoList = @(
    (Join-Path $publicDir "favicon-16x16.png"),
    (Join-Path $publicDir "favicon-32x32.png"),
    (Join-Path $publicDir "favicon-48x48.png")
)
Pack-Ico $icoList (Join-Path $publicDir "favicon.ico")

$emblem.Dispose()
$logo.Dispose()

Write-Host "All favicons generated successfully!"


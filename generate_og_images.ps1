Add-Type -AssemblyName System.Drawing

$imagesMap = @(
    @{ out = "og-beranda.jpg"; src = "assets/images/vidioproduk-poster.jpg" },
    @{ out = "og-tentang-kami.jpg"; src = "assets/images/ai-about-luxury-hamper.jpg" },
    @{ out = "og-portofolio.jpg"; src = "assets/images/corporate-gift-exclusive.jpg" },
    @{ out = "og-paket.jpg"; src = "assets/images/corporate-hampers-premium.jpg" },
    @{ out = "og-kontak.jpg"; src = "assets/images/vendor-hampers-corporate.jpg" },
    @{ out = "og-custom.jpg"; src = "assets/images/personalized-corporate-hampers.jpg" },
    @{ out = "og-cara-pesan.jpg"; src = "assets/images/custom-corporate-gift-production.jpg" },
    @{ out = "og-faq.jpg"; src = "assets/images/branded-hampers-box.jpg" },
    @{ out = "og-hampers-100-ribuan.jpg"; src = "assets/images/ai-catalog-tumbler-led.jpg" },
    @{ out = "og-hampers-250-ribuan.jpg"; src = "assets/images/ai-catalog-merchandise-set.jpg" },
    @{ out = "og-hampers-500-ribuan.jpg"; src = "assets/images/ai-koleksi-executive.jpg" },
    @{ out = "og-hampers-premium.jpg"; src = "assets/images/executive-corporate-gift.jpg" },
    @{ out = "og-hampers-lebaran.jpg"; src = "assets/images/ai-catalog-cookies-box.jpg" },
    @{ out = "og-hampers-kue-kering.jpg"; src = "assets/images/ai-catalog-cookies-box.jpg" },
    @{ out = "og-hampers-kopi-teh.jpg"; src = "assets/images/ai-koleksi-wellness.jpg" },
    @{ out = "og-hampers-sehat.jpg"; src = "assets/images/ai-koleksi-wellness.jpg" },
    @{ out = "og-hampers-tahun-baru.jpg"; src = "assets/images/corporate-gift-client-appreciation.jpg" },
    @{ out = "og-hampers-corporate-malang.jpg"; src = "assets/images/hampers-karyawan-premium.jpg" },
    @{ out = "og-penulis.jpg"; src = "assets/images/panduan-corporate-gift-executive.jpg" },
    @{ out = "og-kebijakan-privasi.jpg"; src = "assets/images/vendor-hampers-corporate.jpg" },
    @{ out = "og-blog.jpg"; src = "assets/images/panduan-corporate-gift-executive.jpg" },
    @{ out = "og-art-100-ribuan.jpg"; src = "assets/images/ai-catalog-tumbler-led.jpg" },
    @{ out = "og-art-hitung-budget.jpg"; src = "assets/images/ai-catalog-merchandise-set.jpg" },
    @{ out = "og-art-kapan-pesan.jpg"; src = "assets/images/custom-corporate-gift-production.jpg" },
    @{ out = "og-art-cara-memilih.jpg"; src = "assets/images/vendor-hampers-corporate.jpg" },
    @{ out = "og-art-loyalitas-klien.jpg"; src = "assets/images/corporate-gifting-client-relationship.jpg" },
    @{ out = "og-art-ide-eksklusif.jpg"; src = "assets/images/corporate-gift-exclusive.jpg" },
    @{ out = "og-art-panduan-karyawan.jpg"; src = "assets/images/employee-appreciation-gift.jpg" },
    @{ out = "og-art-tren-2025.jpg"; src = "assets/images/corporate-hamper-business-relationship.jpg" },
    @{ out = "og-art-ramadhan.jpg"; src = "assets/images/ai-catalog-cookies-box.jpg" },
    @{ out = "og-art-souvenir-unik.jpg"; src = "assets/images/ai-koleksi-event.jpg" },
    @{ out = "og-art-perbedaan.jpg"; src = "assets/images/ai-about-luxury-hamper.jpg" },
    @{ out = "og-art-tips-lebaran.jpg"; src = "assets/images/ai-catalog-cookies-box.jpg" },
    @{ out = "og-art-eco-friendly.jpg"; src = "assets/images/personalized-corporate-hampers.jpg" },
    @{ out = "og-art-akhir-tahun.jpg"; src = "assets/images/corporate-gift-client-appreciation.jpg" },
    @{ out = "og-art-kesalahan-vendor.jpg"; src = "assets/images/branded-hampers-box.jpg" },
    @{ out = "og-art-jakarta.jpg"; src = "assets/images/hampers-corporate-jakarta.jpg" }
)

$targetW = 1200
$targetH = 630

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]82)

$outDir = "assets/images/og"
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

foreach ($item in $imagesMap) {
    $srcPath = $item.src
    $outFile = Join-Path $outDir $item.out
    
    if (!(Test-Path $srcPath)) {
        Write-Warning "Source not found: $srcPath"
        continue
    }

    $src = [System.Drawing.Bitmap]::FromFile((Resolve-Path $srcPath).Path)

    # Cover crop
    $scale = [Math]::Max($targetW / $src.Width, $targetH / $src.Height)
    $srcCropW = [int]($targetW / $scale)
    $srcCropH = [int]($targetH / $scale)
    $srcCropX = [int](($src.Width - $srcCropW) / 2)
    $srcCropY = [int](($src.Height - $srcCropH) / 2)

    $dest = New-Object System.Drawing.Bitmap $targetW, $targetH
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $destRect = New-Object System.Drawing.Rectangle 0, 0, $targetW, $targetH
    $g.DrawImage($src, $destRect, $srcCropX, $srcCropY, $srcCropW, $srcCropH, [System.Drawing.GraphicsUnit]::Pixel)

    $dest.Save($outFile, $codec, $params)

    $g.Dispose()
    $dest.Dispose()
    $src.Dispose()

    $fi = Get-Item $outFile
    Write-Host "Generated: $($item.out) -> $([math]::round($fi.Length / 1024, 1)) KB"
}

Write-Host "ALL OG IMAGES GENERATED SUCCESSFULLY!"


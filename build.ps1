$destination = "./ludum_dare_51.zip"

npm run build

if (Test-Path $destination) {
    Remove-Item $destination -Force
}

$compress = @{
    Path             = "./dist/*"
    CompressionLevel = "Optimal"
    DestinationPath  = $destination
}

Compress-Archive @compress

echo "Done."

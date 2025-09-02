# Script PowerShell para actualizar rutas de imágenes en productos.json
$jsonPath = "productos.json"

# Leer el contenido del archivo JSON
$jsonContent = Get-Content $jsonPath -Raw -Encoding UTF8
$productosData = $jsonContent | ConvertFrom-Json

# Función para actualizar las rutas de imágenes de un producto
function Update-ProductImages {
    param($producto)
    
    $id = $producto.id
    $categoria = if ($producto.category -eq "almohadas") { "almohadas" } else { $producto.category }
    
    # Generar rutas de imágenes sin extensión
    $producto.images = @(
        "images/productos/$categoria/$id/principal",
        "images/productos/$categoria/$id/detalle1", 
        "images/productos/$categoria/$id/detalle2"
    )
}

# Actualizar todas las categorías
foreach ($categoria in $productosData.PSObject.Properties.Name) {
    $productos = $productosData.$categoria
    if ($productos -is [Array]) {
        foreach ($producto in $productos) {
            Update-ProductImages $producto
        }
    }
}

# Guardar el archivo actualizado
$updatedJson = $productosData | ConvertTo-Json -Depth 10 -Compress:$false
$updatedJson | Out-File $jsonPath -Encoding UTF8

Write-Host "Rutas de imagenes actualizadas en productos.json" -ForegroundColor Green
Write-Host "Estructura de carpetas necesaria:" -ForegroundColor Cyan
Write-Host "Ahora acepta tanto .jpg como .jpeg automaticamente" -ForegroundColor Yellow
Write-Host ""

# Mostrar estructura necesaria
foreach ($categoria in $productosData.PSObject.Properties.Name) {
    $productos = $productosData.$categoria
    if ($productos -is [Array] -and $productos.Count -gt 0) {
        Write-Host "images/productos/$categoria/" -ForegroundColor Blue
        foreach ($producto in $productos) {
            Write-Host "   $($producto.id)/" -ForegroundColor Blue
            Write-Host "      principal.jpg o principal.jpeg" -ForegroundColor Green
            Write-Host "      detalle1.jpg o detalle1.jpeg" -ForegroundColor Green
            Write-Host "      detalle2.jpg o detalle2.jpeg" -ForegroundColor Green
        }
        Write-Host ""
    }
}

# Script PowerShell para actualizar productos.json con una sola imagen principal
$jsonPath = "productos.json"

# Leer el contenido del archivo JSON
$jsonContent = Get-Content $jsonPath -Raw -Encoding UTF8
$productosData = $jsonContent | ConvertFrom-Json

# Función para actualizar las rutas de imagen de un producto (solo principal)
function Update-ProductImage {
    param($producto)
    
    $id = $producto.id
    $categoria = if ($producto.category -eq "almohadas") { "almohadas" } else { $producto.category }
    
    # Solo imagen principal sin extensión
    $producto.images = @(
        "images/productos/$categoria/$id/principal"
    )
}

# Actualizar todas las categorías
foreach ($categoria in $productosData.PSObject.Properties.Name) {
    $productos = $productosData.$categoria
    if ($productos -is [Array]) {
        foreach ($producto in $productos) {
            Update-ProductImage $producto
        }
    }
}

# Guardar el archivo actualizado
$updatedJson = $productosData | ConvertTo-Json -Depth 10 -Compress:$false
$updatedJson | Out-File $jsonPath -Encoding UTF8

Write-Host "Rutas de imagen principal actualizadas en productos.json" -ForegroundColor Green
Write-Host "Estructura de carpetas simplificada:" -ForegroundColor Cyan
Write-Host "Solo una imagen principal por producto (acepta .jpg o .jpeg)" -ForegroundColor Yellow
Write-Host ""

# Mostrar estructura necesaria
foreach ($categoria in $productosData.PSObject.Properties.Name) {
    $productos = $productosData.$categoria
    if ($productos -is [Array] -and $productos.Count -gt 0) {
        Write-Host "images/productos/$categoria/" -ForegroundColor Blue
        foreach ($producto in $productos) {
            Write-Host "   $($producto.id)/" -ForegroundColor Blue
            Write-Host "      principal.jpg o principal.jpeg" -ForegroundColor Green
        }
        Write-Host ""
    }
}

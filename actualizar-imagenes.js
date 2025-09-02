// Script para actualizar las rutas de imágenes en productos.json
const fs = require('fs');
const path = require('path');

// Leer el archivo productos.json
const productosPath = './productos.json';
const productosData = JSON.parse(fs.readFileSync(productosPath, 'utf8'));

// Función para actualizar las rutas de imágenes de un producto
function actualizarImagenesProducto(producto) {
    const id = producto.id;
    const categoria = producto.category === 'almohadas' ? 'almohadas' : producto.category;
    
    // Generar rutas de imágenes sin extensión (el sistema detectará .jpg o .jpeg automáticamente)
    producto.images = [
        `images/productos/${categoria}/${id}/principal`,
        `images/productos/${categoria}/${id}/detalle1`,
        `images/productos/${categoria}/${id}/detalle2`
    ];
}

// Actualizar todas las categorías
Object.keys(productosData).forEach(categoria => {
    if (Array.isArray(productosData[categoria])) {
        productosData[categoria].forEach(actualizarImagenesProducto);
    }
});

// Guardar el archivo actualizado
fs.writeFileSync(productosPath, JSON.stringify(productosData, null, 2), 'utf8');

console.log('✅ Rutas de imágenes actualizadas en productos.json');
console.log('📁 Estructura de carpetas necesaria:');
console.log('🖼️ Ahora acepta tanto .jpg como .jpeg automáticamente');
console.log('');

// Mostrar estructura necesaria
Object.keys(productosData).forEach(categoria => {
    if (Array.isArray(productosData[categoria]) && productosData[categoria].length > 0) {
        console.log(`📂 images/productos/${categoria}/`);
        productosData[categoria].forEach(producto => {
            console.log(`   📂 ${producto.id}/`);
            console.log(`      📷 principal.jpg o principal.jpeg`);
            console.log(`      📷 detalle1.jpg o detalle1.jpeg`);
            console.log(`      📷 detalle2.jpg o detalle2.jpeg`);
        });
        console.log('');
    }
});

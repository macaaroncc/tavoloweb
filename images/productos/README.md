# Organización de Imágenes de Productos

## Estructura de Carpetas

Cada producto debe tener su propia carpeta con el siguiente formato:

```
images/productos/
├── almohadas/
│   ├── memory-foam-premium/
│   │   ├── principal.jpg (imagen principal - obligatoria)
│   │   ├── detalle1.jpg (imagen adicional)
│   │   ├── detalle2.jpg (imagen adicional)
│   │   └── detalle3.jpg (opcional)
│   ├── cervical-ergonomica/
│   │   ├── principal.jpg
│   │   └── detalle1.jpg
│   └── ...
├── cojines/
│   ├── decorativo-velvet/
│   │   ├── principal.jpg
│   │   └── colores.jpg
│   └── ...
├── edredones/
├── relleno/
└── mascotas/
    ├── cuna-perro-terciopelo-47x57cm-gris/
    │   ├── principal.jpg
    │   ├── detalle1.jpg (textura terciopelo)
    │   └── detalle2.jpg (producto en uso)
    ├── cuna-perro-terciopelo-60x70cm-gris/
    │   ├── principal.jpg
    │   ├── detalle1.jpg
    │   └── detalle2.jpg
    ├── cuna-perro-terciopelo-70x90cm-marron/
    │   ├── principal.jpg
    │   ├── detalle1.jpg
    │   └── detalle2.jpg
    ├── cuna-perro-redonda-3pcs-gris/
    │   ├── principal.jpg (foto del set completo)
    │   ├── detalle1.jpg (cuna pequeña)
    │   ├── detalle2.jpg (cuna mediana)
    │   ├── detalle3.jpg (cuna grande)
    │   └── uso.jpg (mascotas usando las cunas)
    ├── cuna-perro-redonda-3pcs-marron/
    │   ├── principal.jpg (foto del set completo)
    │   ├── detalle1.jpg (cuna pequeña)
    │   ├── detalle2.jpg (cuna mediana)
    │   ├── detalle3.jpg (cuna grande)
    │   └── uso.jpg (mascotas usando las cunas)
    └── ...
```

## Naming Convention

### Carpetas de productos:
- Usar el ID del producto (mismo que en productos.json)
- Solo minúsculas, sin espacios, usar guiones
- Ejemplo: `memory-foam-premium`, `cervical-ergonomica`

### Archivos de imagen:
- **principal.jpg** - Imagen principal del producto (obligatoria)
- **detalle1.jpg, detalle2.jpg, etc.** - Imágenes adicionales
- **colores.jpg** - Para mostrar variaciones de color
- **uso.jpg** - Imagen del producto en uso
- **packaging.jpg** - Imagen del empaque

## Especificaciones de Imagen

### Tamaños recomendados:
- **Imagen principal**: 800x800px (cuadrada)
- **Imágenes de detalle**: 600x600px o 800x600px
- **Formato**: JPG (para fotografías) o PNG (para gráficos)
- **Calidad**: 80-90% para JPG
- **Peso máximo**: 200KB por imagen

### Consejos para las fotos:
- Fondo blanco o neutro
- Buena iluminación
- Múltiples ángulos del producto
- Mostrar el producto en uso cuando sea posible
- Incluir imágenes del empaque/etiquetas

## Productos de Ejemplo

Ya están creadas las carpetas para:
- `almohadas/memory-foam-premium/`
- `almohadas/cervical-ergonomica/`
- `almohadas/plumas-ganso/`

Solo necesitas subir las imágenes con los nombres correctos.

## Cómo agregar un nuevo producto:

1. Crear carpeta con el ID del producto
2. Subir al menos `principal.jpg`
3. Agregar el producto en `productos.json`
4. La página web automáticamente mostrará las imágenes disponibles

## Productos de Mascotas - Nuevos agregados

### Cunas de Terciopelo:
- `cuna-perro-terciopelo-47x57cm-gris/` - Cuna pequeña de terciopelo gris
- `cuna-perro-terciopelo-60x70cm-gris/` - Cuna grande de terciopelo gris  
- `cuna-perro-terciopelo-70x90cm-marron/` - Cuna extra grande de terciopelo marrón

### Sets de Cunas Redondas:
- `cuna-perro-redonda-3pcs-gris/` - Set de 3 cunas redondas grises
- `cuna-perro-redonda-3pcs-marron/` - Set de 3 cunas redondas marrones

### Consideraciones especiales para mascotas:
- Mostrar las cunas con mascotas reales cuando sea posible
- Para sets, incluir tanto foto grupal como individuales
- Destacar la textura del terciopelo en close-ups
- Mostrar diferentes tamaños de mascotas usando los productos

## Imágenes placeholder

Mientras no tengas las imágenes reales, el sistema mostrará placeholders con el texto "Imagen del producto".

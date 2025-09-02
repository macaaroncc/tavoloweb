// Utilidad para manejar la carga de imágenes con soporte para .jpg y .jpeg
class ImageLoader {
    constructor() {
        this.cache = new Map();
    }

    /**
     * Busca una imagen con las extensiones .jpg y .jpeg
     * @param {string} basePath - Ruta base sin extensión
     * @returns {Promise<string>} - URL de la imagen encontrada
     */
    async findImage(basePath) {
        // Verificar cache primero
        if (this.cache.has(basePath)) {
            return this.cache.get(basePath);
        }

        const extensions = ['jpg', 'jpeg'];
        
        for (const ext of extensions) {
            const imagePath = `${basePath}.${ext}`;
            
            try {
                const response = await fetch(imagePath, { method: 'HEAD' });
                if (response.ok) {
                    this.cache.set(basePath, imagePath);
                    return imagePath;
                }
            } catch (error) {
                // Continuar con la siguiente extensión
                console.log(`Imagen no encontrada: ${imagePath}`);
            }
        }
        
        // Si no se encuentra ninguna imagen, devolver la ruta por defecto con .jpg
        const defaultPath = `${basePath}.jpg`;
        this.cache.set(basePath, defaultPath);
        return defaultPath;
    }

    /**
     * Procesa un array de rutas de imágenes y devuelve las URLs correctas
     * @param {string[]} imagePaths - Array de rutas de imágenes (con extensión)
     * @returns {Promise<string[]>} - Array de URLs corregidas
     */
    async processImagePaths(imagePaths) {
        const promises = imagePaths.map(async (imagePath) => {
            // Extraer la ruta base sin extensión
            const basePath = imagePath.replace(/\.(jpg|jpeg)$/i, '');
            return await this.findImage(basePath);
        });

        return await Promise.all(promises);
    }

    /**
     * Limpia el cache
     */
    clearCache() {
        this.cache.clear();
    }
}

// Instancia global del cargador de imágenes
window.imageLoader = new ImageLoader();

/**
 * Función auxiliar para cargar imágenes de un producto
 * @param {object} product - Objeto del producto
 * @returns {Promise<string[]>} - Array de URLs de imágenes procesadas
 */
async function loadProductImages(product) {
    if (!product.images || !Array.isArray(product.images)) {
        return [];
    }

    return await window.imageLoader.processImagePaths(product.images);
}

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ImageLoader, loadProductImages };
}

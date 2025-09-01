// Variables globales para la página de producto
let allProductsData = {};
let currentProduct = null;

// Función para obtener parámetros de la URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Función para cargar datos de productos desde JSON
async function loadProductsData() {
    try {
        const response = await fetch('productos.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo de productos');
        }
        allProductsData = await response.json();
        return true;
    } catch (error) {
        console.error('Error cargando productos:', error);
        return false;
    }
}

// Función para encontrar un producto por ID
function findProductById(productId) {
    for (const category in allProductsData) {
        const product = allProductsData[category].find(p => p.id === productId);
        if (product) {
            return product;
        }
    }
    return null;
}

// Función para generar estrellas de rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHtml = '';
    
    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    
    // Media estrella
    if (halfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>';
    }
    
    return starsHtml;
}

// Función para mostrar el producto en la página
function displayProduct(product) {
    currentProduct = product;
    
    // Actualizar título de la página
    document.title = `${product.name} - Tavolo Casa`;
    
    // Actualizar breadcrumb
    document.getElementById('category-breadcrumb').textContent = 
        product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('product-breadcrumb').textContent = product.name;
    
    // Actualizar información principal
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('current-price').textContent = product.price;
    document.getElementById('original-price').textContent = product.originalPrice;
    document.getElementById('discount-badge').textContent = product.discount;
    document.getElementById('product-description').textContent = product.detailed_description;
    
    // Actualizar rating
    const ratingHtml = `
        <div class="stars">${generateStars(product.rating)}</div>
        <span class="rating-text">${product.rating}/5 (${product.reviews} opiniones)</span>
    `;
    document.getElementById('product-rating').innerHTML = ratingHtml;
    
    // Generar thumbnails de imágenes
    generateImageThumbnails(product.images);
    
    // Generar contenido de tabs
    generateTabsContent(product);
    
    // Mostrar contenido y ocultar loading
    document.getElementById('loading').style.display = 'none';
    document.getElementById('product-content').style.display = 'block';
}

// Función para generar thumbnails de imágenes
function generateImageThumbnails(images) {
    const thumbnailsContainer = document.getElementById('image-thumbnails');
    
    thumbnailsContainer.innerHTML = images.map((image, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="selectImage(${index})">
            Img ${index + 1}
        </div>
    `).join('');
}

// Función para seleccionar imagen principal
function selectImage(index) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnails[index].classList.add('active');
    
    // Aquí podrías cambiar la imagen principal si tuvieras las imágenes reales
    document.getElementById('main-image').textContent = `Imagen ${index + 1} del producto`;
}

// Función para generar contenido de las tabs
function generateTabsContent(product) {
    // Tab de características
    const featuresList = document.getElementById('features-list');
    featuresList.innerHTML = product.features.map(feature => `<li>${feature}</li>`).join('');
    
    // Tab de especificaciones
    const specsGrid = document.getElementById('specifications-grid');
    const specsHtml = Object.entries(product.specifications).map(([key, value]) => {
        const label = formatSpecLabel(key);
        const formattedValue = Array.isArray(value) ? value.join(', ') : value;
        return `
            <div class="spec-item">
                <div class="spec-label">${label}</div>
                <div class="spec-value">${formattedValue}</div>
            </div>
        `;
    }).join('');
    specsGrid.innerHTML = specsHtml;
    
    // Tab de beneficios
    const benefitsList = document.getElementById('benefits-list');
    benefitsList.innerHTML = product.benefits.map(benefit => `<li>${benefit}</li>`).join('');
    
    // Tab de cuidados
    const careList = document.getElementById('care-list');
    careList.innerHTML = product.care_instructions.map(instruction => `<li>${instruction}</li>`).join('');
}

// Función para formatear etiquetas de especificaciones
function formatSpecLabel(key) {
    const labels = {
        dimensions: 'Dimensiones',
        material: 'Material',
        cover: 'Funda',
        firmness: 'Firmeza',
        weight: 'Peso',
        warranty: 'Garantía',
        certifications: 'Certificaciones',
        filling: 'Relleno',
        colors: 'Colores disponibles',
        tog_rating: 'Clasificación TOG'
    };
    return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

// Función para mostrar/ocultar tabs
function showTab(tabName) {
    // Ocultar todos los contenidos de tab
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar tab seleccionado
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Activar botón correspondiente
    event.target.classList.add('active');
}

// Función para contactar por un producto específico
function contactForProduct() {
    if (currentProduct) {
        const message = `Hola, estoy interesado en el producto: ${currentProduct.name} (${currentProduct.price}). ¿Podrían darme más información?`;
        
        // Crear enlace de WhatsApp con mensaje predefinido
        const phone = '34655586462'; // Número sin espacios ni símbolos
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        
        // Abrir WhatsApp o mostrar opciones de contacto
        if (window.innerWidth <= 768) {
            // En móvil, abrir WhatsApp directamente
            window.open(whatsappUrl, '_blank');
        } else {
            // En desktop, mostrar modal con opciones
            alert(`Para contactar sobre "${currentProduct.name}":\n\n📞 Teléfono: 655 586 462\n📧 Email: info@tavolocasa.com\n💬 WhatsApp: Haz clic en OK para abrir`);
            window.open(whatsappUrl, '_blank');
        }
    }
}

// Función para compartir producto
function shareProduct() {
    if (currentProduct && navigator.share) {
        navigator.share({
            title: currentProduct.name,
            text: `${currentProduct.name} - ${currentProduct.price} en Tavolo Casa`,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('¡Enlace del producto copiado al portapapeles!');
        }).catch(() => {
            alert(`Comparte este producto: ${url}`);
        });
    }
}

// Función para mostrar error
function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
}

// Función de inicialización de la página de producto
async function initProductPage() {
    const productId = getUrlParameter('id');
    
    if (!productId) {
        showError();
        return;
    }
    
    // Cargar datos de productos
    const dataLoaded = await loadProductsData();
    if (!dataLoaded) {
        showError();
        return;
    }
    
    // Buscar el producto
    const product = findProductById(productId);
    if (!product) {
        showError();
        return;
    }
    
    // Mostrar el producto
    displayProduct(product);
}

// Función para crear un ID válido desde el nombre del producto
function createProductId(productName) {
    return productName
        .toLowerCase()
        .replace(/[áàâãä]/g, 'a')
        .replace(/[éèêë]/g, 'e')
        .replace(/[íìîï]/g, 'i')
        .replace(/[óòôõö]/g, 'o')
        .replace(/[úùûü]/g, 'u')
        .replace(/ñ/g, 'n')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Función auxiliar para buscar en productos actuales (compatibilidad con script.js)
function findProductInCurrentData(productName) {
    // Esta función ayuda a hacer la transición desde el sistema actual
    // Busca por nombre en los datos actuales y devuelve un ID
    
    if (!window.productosData) return null;
    
    for (const category in window.productosData) {
        const product = window.productosData[category].find(p => p.name === productName);
        if (product) {
            return createProductId(product.name);
        }
    }
    return null;
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initProductPage();
});

// Funciones para compatibilidad con el script principal
window.findProductInCurrentData = findProductInCurrentData;
window.createProductId = createProductId;

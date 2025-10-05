// Variables globales (compatibles con el sistema de variantes)
let productosData = {
    almohadas: [],
    cojines: [],
    edredones: [],
    mascotas: []
};

// Variables del sistema de variantes (incluidas desde script-variantes-simple.js)
let productosOriginales = {};
let productosAgrupados = {};

// Función para cargar productos desde JSON
async function loadProductsData() {
    try {
        const response = await fetch('productos.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Asignar directamente los datos
        productosData = data;
        
        console.log('✅ Productos cargados correctamente');
        console.log('Categorías disponibles:', Object.keys(productosData));
        
        // Mostrar conteo por categoría
        Object.keys(productosData).forEach(categoria => {
            console.log(`- ${categoria}: ${productosData[categoria].length} productos`);
        });
        
        return productosData;
    } catch (error) {
        console.error('❌ Error cargando productos:', error);
        return productosData;
    }
}

// Las funciones de agrupación han sido simplificadas para carga directa

// Funciones auxiliares simplificadas - no necesarias para carga directa


// Función para cargar imagen con detección automática de extensión
function loadProductImage(imagePath) {
    return new Promise((resolve) => {
        const img = new Image();
        
        // Primero intentar con .jpg
        img.onload = () => resolve(imagePath + '.jpg');
        img.onerror = () => {
            // Si falla, intentar con .jpeg
            const imgJpeg = new Image();
            imgJpeg.onload = () => resolve(imagePath + '.jpeg');
            imgJpeg.onerror = () => resolve(null); // Si ambas fallan, devolver null
            imgJpeg.src = imagePath + '.jpeg';
        };
        
        img.src = imagePath + '.jpg';
    });
}

// Variables globales
let currentPage = 1;
const productsPerPage = 12;
let currentCategory = 'todo';
let currentProducts = [];

// Función para obtener todos los productos mezclados
function getAllProducts() {
    let allProducts = [];
    Object.keys(productosData).forEach(category => {
        allProducts = allProducts.concat(productosData[category]);
    });
    return allProducts;
}

// Función para crear una tarjeta de producto
function createProductCard(product, index) {
    const imageId = `product-image-${index}`;
    
    // Crear la tarjeta inicialmente con placeholder
    const cardHtml = `
        <div class="product-card" onclick="irAProductoConVariantes('${product.id}')">
            <div class="product-image" id="${imageId}" style="position: relative;">
                <div class="image-placeholder">
                    <i class="fas fa-image"></i>
                    <span>Cargando imagen...</span>
                </div>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price-section">
                    <div class="product-price">${product.price}</div>
                    <div class="product-discount">${product.discount}</div>
                </div>
            </div>
        </div>
    `;
    
    // Cargar imagen asíncronamente si existe la ruta
    if (product.images && product.images.length > 0) {
        setTimeout(async () => {
            const imageContainer = document.getElementById(imageId);
            if (imageContainer) {
                const imagePath = await loadProductImage(product.images[0]);
                if (imagePath) {
                    imageContainer.innerHTML = `
                        <img src="${imagePath}" alt="${product.name}" class="product-main-image">
                    `;
                } else {
                    imageContainer.innerHTML = `
                        <div class="image-placeholder no-image">
                            <i class="fas fa-image"></i>
                            <span>Sin imagen</span>
                        </div>
                    `;
                }
            }
        }, 100);
    } else {
        // Si no hay imagen definida, mostrar placeholder permanente
        setTimeout(() => {
            const imageContainer = document.getElementById(imageId);
            if (imageContainer) {
                imageContainer.innerHTML = `
                    <div class="image-placeholder no-image">
                        <i class="fas fa-image"></i>
                        <span>Sin imagen</span>
                    </div>
                `;
            }
        }, 100);
    }
    
    return cardHtml;
}

// Función para navegar a producto con variantes
function irAProductoConVariantes(productId) {
    window.location.href = `producto.html?id=${productId}`;
}

// Función para mostrar productos de una página específica
function showPage(page) {
    currentPage = page;
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = currentProducts.slice(startIndex, endIndex);
    
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = productsToShow.map((product, index) => 
        createProductCard(product, startIndex + index)
    ).join('');
    
    // Actualizar botones de paginación
    updatePaginationButtons(page);
    
    // Aplicar efectos de scroll
    setTimeout(handleScrollEffects, 100);
}

// Función para actualizar botones de paginación
function updatePaginationButtons(activePage) {
    const totalPages = Math.ceil(currentProducts.length / productsPerPage);
    const paginationContainer = document.querySelector('.pagination');
    
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }
    
    paginationContainer.style.display = 'flex';
    paginationContainer.innerHTML = '';
    
    // Crear contenedor de controles
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'pagination-controls';
    
    // Botón "Anterior"
    if (activePage > 1) {
        const prevBtn = createPaginationButton('«', activePage - 1, false, 'Página anterior');
        prevBtn.classList.add('prev-btn');
        controlsContainer.appendChild(prevBtn);
    }
    
    // Lógica para mostrar números de página
    let startPage = 1;
    let endPage = totalPages;
    
    if (totalPages > 7) {
        if (activePage <= 4) {
            endPage = 5;
        } else if (activePage >= totalPages - 3) {
            startPage = totalPages - 4;
        } else {
            startPage = activePage - 2;
            endPage = activePage + 2;
        }
    }
    
    // Primera página y elipsis si es necesario
    if (startPage > 1) {
        controlsContainer.appendChild(createPaginationButton(1, 1, activePage === 1));
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            controlsContainer.appendChild(ellipsis);
        }
    }
    
    // Páginas del rango
    for (let i = startPage; i <= endPage; i++) {
        controlsContainer.appendChild(createPaginationButton(i, i, activePage === i));
    }
    
    // Elipsis y última página si es necesario
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            controlsContainer.appendChild(ellipsis);
        }
        controlsContainer.appendChild(createPaginationButton(totalPages, totalPages, activePage === totalPages));
    }
    
    // Botón "Siguiente"
    if (activePage < totalPages) {
        const nextBtn = createPaginationButton('»', activePage + 1, false, 'Página siguiente');
        nextBtn.classList.add('next-btn');
        controlsContainer.appendChild(nextBtn);
    }
    
    // Agregar contenedor de controles al contenedor principal
    paginationContainer.appendChild(controlsContainer);
    
    // Información de página actual
    const pageInfo = document.createElement('div');
    pageInfo.className = 'page-info';
    pageInfo.style.cssText = 'margin-left: 20px; color: #666; font-size: 14px; display: flex; align-items: center;';
    const startItem = (activePage - 1) * productsPerPage + 1;
    const endItem = Math.min(activePage * productsPerPage, currentProducts.length);
    pageInfo.innerHTML = `Mostrando ${startItem}-${endItem} de ${currentProducts.length} productos`;
    paginationContainer.appendChild(pageInfo);
}

// Función para crear un botón de paginación
function createPaginationButton(text, page, isActive, title = '') {
    const button = document.createElement('button');
    button.className = `page-btn${isActive ? ' active' : ''}`;
    button.textContent = text;
    button.title = title || `Ir a página ${page}`;
    button.onclick = () => showPage(page);
    return button;
}

// Función para mostrar detalles del producto (navegar a página individual)
function showProductDetails(index) {
    const product = currentProducts[index];
    
    // Si el producto tiene un ID definido, usarlo directamente
    // Si no, crear ID basado en el nombre (para compatibilidad)
    const productId = product.id || createProductId(product.name);
    
    // Navegar a la página de producto individual
    window.location.href = `producto.html?id=${productId}`;
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

// Función para seleccionar categoría del menú horizontal
function selectCategory(category, element) {
    // Prevenir comportamiento por defecto del enlace
    event.preventDefault();
    
    // Actualizar categoría actual
    currentCategory = category;
    
    // Si es "todo", obtener todos los productos
    if (category === 'todo') {
        currentProducts = getAllProducts();
    } 
    // Si es "cojines", buscar productos que contengan "cojin", "cojín" o "cojines"
    else if (category === 'cojines') {
        currentProducts = [];
        const searchTerms = ['cojin', 'cojín', 'cojines'];
        
        // Buscar en todas las categorías productos que contengan estas palabras
        Object.keys(productosData).forEach(cat => {
            productosData[cat].forEach(product => {
                const productText = (product.name + ' ' + product.description).toLowerCase();
                if (searchTerms.some(term => productText.includes(term))) {
                    currentProducts.push(product);
                }
            });
        });
    }
    // Para otras categorías, usar el comportamiento normal
    else {
        currentProducts = productosData[category] || [];
    }
    
    currentPage = 1;
    
    // Actualizar clases activas en el menú
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    element.closest('.category-item').classList.add('active');
    
    // Mover el slider animado
    moveSliderToActive();
    
    // Actualizar título de la sección
    updateCategoryTitle(category);
    
    // Limpiar paginación antes de mostrar nuevos productos
    const paginationContainer = document.querySelector('.pagination');
    if (paginationContainer) {
        paginationContainer.innerHTML = '';
    }
    
    // Mostrar productos de la nueva categoría
    showPage(1);
    
    // Mostrar paginación si estaba oculta
    if (paginationContainer) {
        paginationContainer.style.display = 'flex';
    }
    
    // Limpiar barra de búsqueda
    const searchInput = document.querySelector('.search-section .search-bar input');
    if (searchInput) {
        searchInput.value = '';
    }
}

// Función para mover el slider a la posición activa
function moveSliderToActive() {
    const activeItem = document.querySelector('.category-item.active');
    const slider = document.querySelector('.category-slider');
    const categoryList = document.querySelector('.category-list');
    
    if (activeItem && slider) {
        const itemIndex = Array.from(activeItem.parentNode.children).indexOf(activeItem);
        const movePercentage = itemIndex * 100;
        slider.style.transform = `translateX(${movePercentage}%)`;
    }
}

// Función para actualizar el título según la categoría
function updateCategoryTitle(category) {
    const titleElement = document.getElementById('category-title');
    const titles = {
        todo: 'Todos los Productos - Catálogo Completo',
        almohadas: 'Almohadas - Colección Premium',
        cojines: 'Cojines - Decoración y Confort',
        edredones: 'Edredones - Calor y Suavidad',
        mascotas: 'Mascotas - Descanso para tus Amigos'
    };
    
    titleElement.textContent = titles[category] || 'Productos - Colección Premium';
}

// Función para manejar el formulario de contacto
function handleContactForm() {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = e.target.querySelector('input[placeholder="Nombre"]').value;
            const telefono = e.target.querySelector('input[placeholder="Teléfono"]').value;
            const email = e.target.querySelector('input[placeholder="Email"]').value;
            const poblacion = e.target.querySelector('input[placeholder="Población"]').value;
            const mensaje = e.target.querySelector('textarea').value;
            
            if (nombre && telefono && email && poblacion && mensaje) {
                alert(`¡Gracias ${nombre}!\n\nTu mensaje ha sido enviado correctamente.\nNos pondremos en contacto contigo pronto.`);
                form.reset();
            } else {
                alert('Por favor, completa todos los campos del formulario.');
            }
        });
    });
}

// Función para manejar la búsqueda
function handleSearch() {
    const searchInput = document.querySelector('.search-section .search-bar input');
    const searchButton = document.querySelector('.search-section .search-bar button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            // Buscar en todos los productos de todas las categorías
            let allFilteredProducts = [];
            
            Object.keys(productosData).forEach(category => {
                const categoryProducts = productosData[category].filter(product => 
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );
                allFilteredProducts = allFilteredProducts.concat(categoryProducts);
            });
            
            if (allFilteredProducts.length > 0) {
                const productsGrid = document.getElementById('products-grid');
                productsGrid.innerHTML = allFilteredProducts.map((product, index) => 
                    createProductCard(product, index)
                ).join('');
                
                document.getElementById('category-title').textContent = 
                    `Resultados de búsqueda: "${searchTerm}" (${allFilteredProducts.length} productos)`;
            } else {
                document.getElementById('products-grid').innerHTML = 
                    '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No se encontraron productos que coincidan con tu búsqueda.</div>';
                document.getElementById('category-title').textContent = 
                    `Sin resultados para: "${searchTerm}"`;
            }
            
            // Ocultar paginación durante búsqueda
            document.querySelector('.pagination').style.display = 'none';
        } else {
            // Restaurar vista normal de la categoría actual
            showPage(1);
            updateCategoryTitle(currentCategory);
            document.querySelector('.pagination').style.display = 'flex';
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Función para efectos de scroll
function handleScrollEffects() {
    const cards = document.querySelectorAll('.product-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Función para toggle del menú lateral
function toggleMobileMenu() {
    const sideMenu = document.getElementById('side-menu');
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    
    sideMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
    
    // Prevenir scroll del body cuando el menú está abierto
    if (sideMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Función para cerrar el menú lateral
function closeSideMenu() {
    const sideMenu = document.getElementById('side-menu');
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    
    sideMenu.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    document.body.style.overflow = '';
    
    // Cerrar todos los submenus
    document.querySelectorAll('.has-submenu').forEach(item => {
        item.classList.remove('active');
    });
}

// Función para seleccionar categoría desde el menú lateral
function selectCategoryFromSideMenu(category, element) {
    // Prevenir comportamiento por defecto del enlace
    event.preventDefault();
    
    // Llamar a la función selectCategory existente
    // Necesitamos simular el elemento del menú horizontal para que funcione correctamente
    const horizontalCategoryItem = document.querySelector(`.category-item[data-category="${category}"]`);
    
    if (horizontalCategoryItem) {
        selectCategory(category, horizontalCategoryItem.querySelector('a'));
    }
    
    // Cerrar el menú lateral después de seleccionar
    closeSideMenu();
    
    // Scroll suave hacia la sección de productos
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Función para toggle del submenu en el menú lateral
function toggleSideSubmenu(event) {
    event.preventDefault();
    const submenuItem = event.target.closest('.has-submenu');
    const allSubmenus = document.querySelectorAll('.has-submenu');
    
    // Cerrar otros submenus
    allSubmenus.forEach(item => {
        if (item !== submenuItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle del submenu actual
    submenuItem.classList.toggle('active');
}

// Función para toggle del dropdown de productos
function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = event.target.closest('.dropdown');
    const allDropdowns = document.querySelectorAll('.dropdown');
    
    // Cerrar otros dropdowns
    allDropdowns.forEach(d => {
        if (d !== dropdown) {
            d.classList.remove('active');
        }
    });
    
    // Toggle del dropdown actual
    dropdown.classList.toggle('active');
}

// Cerrar dropdowns al hacer clic fuera
function handleClickOutside() {
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Función para navegación móvil
function handleMobileNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-menu a');
    
    // Cerrar menú móvil al hacer clic en un enlace
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navMenu.classList.remove('mobile-active');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            const icon = mobileBtn.querySelector('i');
            icon.className = 'fas fa-bars';
        });
    });
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', async function() {
    // Cargar productos desde JSON
    await loadProductsData();
    
    // Inicializar con todos los productos
    currentProducts = getAllProducts();
    currentCategory = 'todo';
    
    // Actualizar título inicial
    updateCategoryTitle('todo');
    
    // Inicializar el slider del menú de categorías
    setTimeout(moveSliderToActive, 100);
    
    // Mostrar primera página de productos
    showPage(1);
    
    // Configurar formulario de contacto
    handleContactForm();
    
    // Configurar búsqueda
    handleSearch();
    
    // Configurar navegación móvil
    handleMobileNavigation();
    
    // Configurar cerrar dropdowns al hacer clic fuera
    handleClickOutside();
    
    // Agregar efectos de scroll después de un breve delay
    setTimeout(handleScrollEffects, 100);
    
    // Efecto de carga suave
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Inicializar carrusel
    initCarousel();
});

// Variables globales del carrusel
let currentSlide = 0;
let carouselInterval;

// Función para inicializar el carrusel
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0 || indicators.length === 0) return;
    
    // Función para cambiar a una slide específica
    function goToSlide(slideIndex) {
        // Remover clase active de todas las slides e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Activar la slide e indicador correspondientes
        slides[slideIndex].classList.add('active');
        indicators[slideIndex].classList.add('active');
        
        currentSlide = slideIndex;
        console.log('Carrusel: cambio a slide', slideIndex + 1);
    }
    
    // Función para avanzar al siguiente slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }
    
    // Agregar event listeners a los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
    });
    
    // Función para resetear el intervalo automático
    function resetInterval() {
        clearInterval(carouselInterval);
        startAutoSlide();
        console.log('Carrusel: intervalo reiniciado');
    }
    
    // Función para iniciar el cambio automático
    function startAutoSlide() {
        carouselInterval = setInterval(() => {
            nextSlide();
            console.log('Carrusel: cambio automático cada 5 segundos');
        }, 5000); // Cambia cada 5 segundos exactos
        console.log('Carrusel: iniciado con intervalo de 5 segundos');
    }
    
    // Pausar carrusel cuando el mouse está sobre el hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
            console.log('Carrusel: pausado (mouse sobre hero)');
        });
        
        heroSection.addEventListener('mouseleave', () => {
            startAutoSlide();
            console.log('Carrusel: reanudado (mouse fuera del hero)');
        });
    }
    
    // Pausar carrusel cuando la ventana no está visible
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            startAutoSlide();
            console.log('Carrusel: reanudado (ventana visible)');
        } else {
            clearInterval(carouselInterval);
            console.log('Carrusel: pausado (ventana no visible)');
        }
    });
    
    // Inicializar con el primer slide
    goToSlide(0);
    
    // Iniciar el carrusel automático inmediatamente
    setTimeout(() => {
        startAutoSlide();
        console.log('Carrusel: iniciado automáticamente tras inicialización');
    }, 1000); // Dar 1 segundo para que se cargue todo
}

// Función para smooth scroll en navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Datos de productos por categorías
const productosData = {
    almohadas: [
    { name: "Almohada Memory Foam Premium", description: "Espuma viscoelástica de alta densidad. 70x40cm", price: "29.95€", discount: "25% OFF" },
    { name: "Almohada Cervical Ergonómica", description: "Diseño ortopédico para cuello y cervicales. 60x40cm", price: "34.95€", discount: "20% OFF" },
    { name: "Almohada Plumas de Ganso", description: "Relleno 100% plumas naturales. 70x40cm", price: "24.95€", discount: "15% OFF" },
    { name: "Almohada Fibra Hueca Siliconada", description: "Transpirable y lavable. 70x40cm", price: "19.95€", discount: "30% OFF" },
    { name: "Almohada Látex Natural", description: "100% látex natural transpirable. 70x40cm", price: "39.95€", discount: "10% OFF" },
    { name: "Almohada Bambú Ecológica", description: "Fibra de bambú antibacteriana. 70x40cm", price: "27.95€", discount: "20% OFF" },
    { name: "Almohada Gel Cooling", description: "Efecto refrescante toda la noche. 70x40cm", price: "32.95€", discount: "25% OFF" },
    { name: "Almohada Extra Firme", description: "Soporte máximo para dormida boca abajo. 70x40cm", price: "22.95€", discount: "15% OFF" },
    { name: "Almohada Ultra Suave", description: "Tacto sedoso y suave. 70x40cm", price: "21.95€", discount: "20% OFF" },
    { name: "Almohada Antiácaros", description: "Tratamiento hipoalergénico. 70x40cm", price: "26.95€", discount: "18% OFF" },
    { name: "Almohada King Size", description: "Tamaño extra grande. 90x40cm", price: "35.95€", discount: "22% OFF" },
    { name: "Almohada para Niños", description: "Tamaño infantil seguro. 50x30cm", price: "16.95€", discount: "25% OFF" },
    { name: "Almohada Microfibra Premium", description: "Suavidad y durabilidad. 70x40cm", price: "18.95€", discount: "30% OFF" },
    { name: "Almohada Dual Comfort", description: "Dos firmezas en una. 70x40cm", price: "28.95€", discount: "20% OFF" },
    { name: "Almohada Aloe Vera", description: "Con extracto natural de aloe. 70x40cm", price: "31.95€", discount: "15% OFF" },
    { name: "Almohada Plumón Sintético", description: "Tacto de plumón sin alergias. 70x40cm", price: "23.95€", discount: "25% OFF" },
    { name: "Almohada Viscoelástica", description: "Se adapta perfectamente. 70x40cm", price: "33.95€", discount: "20% OFF" },
    { name: "Almohada Transpirable 3D", description: "Estructura 3D ultra ventilada. 70x40cm", price: "36.95€", discount: "12% OFF" },
    { name: "Almohada Cervical Mariposa", description: "Forma anatómica especial. 60x35cm", price: "29.95€", discount: "18% OFF" },
    { name: "Almohada Térmica", description: "Regula la temperatura corporal. 70x40cm", price: "41.95€", discount: "15% OFF" },
    { name: "Almohada Espuma HR", description: "Alta resistencia y durabilidad. 70x40cm", price: "25.95€", discount: "22% OFF" },
    { name: "Almohada Fibra Hueca", description: "Ligera y confortable. 70x40cm", price: "17.95€", discount: "28% OFF" },
    { name: "Almohada Lavanda", description: "Relleno con esencia de lavanda. 70x40cm", price: "24.95€", discount: "20% OFF" },
    { name: "Almohada Memory Gel", description: "Viscoelástica con gel. 70x40cm", price: "37.95€", discount: "17% OFF" },
    { name: "Almohada Microgel", description: "Sensación de frescor. 70x40cm", price: "30.95€", discount: "20% OFF" },
    { name: "Almohada Ergonómica Plus", description: "Diseño científico avanzado. 70x40cm", price: "42.95€", discount: "10% OFF" },
    { name: "Almohada Soft Touch", description: "Ultrasuave al tacto. 70x40cm", price: "20.95€", discount: "25% OFF" },
    { name: "Almohada Plumas de Pato", description: "Relleno natural premium. 70x40cm", price: "26.95€", discount: "22% OFF" },
    { name: "Almohada Carbón Activado", description: "Propiedades purificadoras. 70x40cm", price: "33.95€", discount: "15% OFF" },
    { name: "Almohada Pocket Springs", description: "Muelles ensacados independientes. 70x40cm", price: "45.95€", discount: "12% OFF" },
    { name: "Almohada Orgánica", description: "Materiales 100% orgánicos. 70x40cm", price: "38.95€", discount: "18% OFF" },
    { name: "Almohada Antibacteriana", description: "Tratamiento antimicrobiano. 70x40cm", price: "27.95€", discount: "20% OFF" },
    { name: "Almohada Firm Support", description: "Soporte firme para cuello. 70x40cm", price: "24.95€", discount: "25% OFF" },
    { name: "Almohada Coolmax", description: "Tecnología de refrigeración. 70x40cm", price: "35.95€", discount: "15% OFF" },
    { name: "Almohada Pluma Sintética", description: "Alternativa vegana a las plumas. 70x40cm", price: "22.95€", discount: "28% OFF" },
    { name: "Almohada Magnética", description: "Con imanes terapéuticos. 70x40cm", price: "39.95€", discount: "10% OFF" },
    { name: "Almohada Contour", description: "Forma de contorno cervical. 60x35cm", price: "31.95€", discount: "20% OFF" },
    { name: "Almohada Soja Memory", description: "Viscoelástica con aceite de soja. 70x40cm", price: "34.95€", discount: "17% OFF" },
    { name: "Almohada Wellness", description: "Bienestar y relajación. 70x40cm", price: "29.95€", discount: "22% OFF" },
    { name: "Almohada Blue Cool", description: "Gel azul refrescante. 70x40cm", price: "36.95€", discount: "15% OFF" },
    { name: "Almohada Luxury Plush", description: "Lujo y confort premium. 70x40cm", price: "43.95€", discount: "12% OFF" },
    { name: "Almohada Travel Size", description: "Perfecta para viajar. 45x30cm", price: "19.95€", discount: "25% OFF" },
    { name: "Almohada Híbrida", description: "Combinación de materiales. 70x40cm", price: "32.95€", discount: "20% OFF" },
    { name: "Almohada Posture Perfect", description: "Corrige la postura al dormir. 70x40cm", price: "37.95€", discount: "15% OFF" },
    { name: "Almohada Therapeutic", description: "Propiedades terapéuticas. 70x40cm", price: "40.95€", discount: "18% OFF" },
    { name: "Almohada Cloud Soft", description: "Suavidad como una nube. 70x40cm", price: "25.95€", discount: "25% OFF" },
    { name: "Almohada Pro Sleep", description: "Diseñada por expertos. 70x40cm", price: "44.95€", discount: "10% OFF" },
    { name: "Almohada Fresh Air", description: "Máxima ventilación. 70x40cm", price: "28.95€", discount: "22% OFF" },
    { name: "Almohada Smart Memory", description: "Memoria inteligente. 70x40cm", price: "41.95€", discount: "15% OFF" },
    { name: "Almohada Dream Comfort", description: "El confort de tus sueños. 70x40cm", price: "26.95€", discount: "20% OFF" }
    ],
    cojines: [
        { name: "Cojín Decorativo Velvet", description: "Terciopelo suave y elegante. 45x45cm", price: "14.95€", discount: "20% OFF" },
        { name: "Cojín Memory Foam", description: "Espuma viscoelástica adaptable. 40x40cm", price: "19.95€", discount: "25% OFF" },
        { name: "Cojín Lumbar Ergonómico", description: "Soporte para la espalda. 35x20cm", price: "16.95€", discount: "15% OFF" },
        { name: "Cojín Piel Sintética", description: "Efecto cuero premium. 50x30cm", price: "22.95€", discount: "18% OFF" },
        { name: "Cojín Lino Natural", description: "100% lino transpirable. 45x45cm", price: "17.95€", discount: "22% OFF" },
        { name: "Cojín Bordado Artesanal", description: "Diseño único hecho a mano. 40x40cm", price: "24.95€", discount: "20% OFF" }
    ],
    edredones: [
        { name: "Edredón Nórdico 4 Estaciones", description: "Adaptable a cualquier época. 240x220cm", price: "89.95€", discount: "30% OFF" },
        { name: "Edredón Plumón Natural", description: "Relleno de plumón de ganso. 240x220cm", price: "129.95€", discount: "25% OFF" },
        { name: "Edredón Fibra Hueca", description: "Ligero y cálido. 240x220cm", price: "59.95€", discount: "35% OFF" },
        { name: "Edredón Bambú Ecológico", description: "Sostenible y antibacteriano. 240x220cm", price: "79.95€", discount: "28% OFF" },
        { name: "Edredón Microfibra", description: "Fácil lavado y secado. 240x220cm", price: "49.95€", discount: "40% OFF" },
        { name: "Edredón Luxury Premium", description: "Máxima calidad y confort. 240x220cm", price: "159.95€", discount: "20% OFF" }
    ],
    relleno: [
        { name: "Relleno Fibra Hueca 500g", description: "Para almohadas y cojines. Bolsa 500g", price: "8.95€", discount: "25% OFF" },
        { name: "Relleno Plumón Sintético 1kg", description: "Tacto suave y natural. Bolsa 1kg", price: "15.95€", discount: "30% OFF" },
        { name: "Relleno Memory Foam Triturado", description: "Espuma viscoelástica. Bolsa 500g", price: "12.95€", discount: "20% OFF" },
        { name: "Relleno Micro Perlas", description: "Microesferas adaptables. Bolsa 300g", price: "18.95€", discount: "15% OFF" },
        { name: "Relleno Bambú Natural", description: "Fibra de bambú ecológica. Bolsa 400g", price: "11.95€", discount: "28% OFF" },
        { name: "Relleno Algodón Orgánico", description: "100% algodón certificado. Bolsa 600g", price: "14.95€", discount: "22% OFF" }
    ],
    mascotas: [
        { name: "Cama Ortopédica para Perros", description: "Memory foam para articulaciones. Talla L", price: "49.95€", discount: "25% OFF" },
        { name: "Cojín Anti-ansiedad Gatos", description: "Reduce estrés felino. 40x30cm", price: "24.95€", discount: "20% OFF" },
        { name: "Manta Termoreguladora", description: "Para todas las estaciones. 80x60cm", price: "19.95€", discount: "30% OFF" },
        { name: "Almohada Cervical Canina", description: "Soporte para cuello de perro. Talla M", price: "32.95€", discount: "18% OFF" },
        { name: "Cojín Calefactor Mascotas", description: "Calor suave y seguro. 35x25cm", price: "27.95€", discount: "22% OFF" },
        { name: "Edredón Impermeable", description: "A prueba de accidentes. 70x50cm", price: "21.95€", discount: "25% OFF" }
    ]
};

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
    return `
        <div class="product-card" onclick="showProductDetails(${index})">
            <div class="product-image">
                <span>Imagen del producto</span>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">${product.price}</div>
                <div class="product-discount">${product.discount}</div>
            </div>
        </div>
    `;
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
    const buttons = document.querySelectorAll('.page-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (parseInt(button.textContent) === activePage) {
            button.classList.add('active');
        }
    });
}

// Función para mostrar detalles del producto (modal simulado)
function showProductDetails(index) {
    const product = currentProducts[index];
    alert(`${product.name}\n\n${product.description}\n\nPrecio: ${product.price}\nDescuento: ${product.discount}\n\n¡Contacta con nosotros para más información!`);
}

// Función para seleccionar categoría del menú horizontal
function selectCategory(category, element) {
    // Prevenir comportamiento por defecto del enlace
    event.preventDefault();
    
    // Actualizar categoría actual
    currentCategory = category;
    
    // Si es "todo", obtener todos los productos, sino la categoría específica
    if (category === 'todo') {
        currentProducts = getAllProducts();
    } else {
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
    
    // Mostrar productos de la nueva categoría
    showPage(1);
    
    // Mostrar paginación si estaba oculta
    document.querySelector('.pagination').style.display = 'flex';
    
    // Limpiar barra de búsqueda
    document.querySelector('.search-bar input').value = '';
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
        relleno: 'Rellenos - Personaliza tu Confort',
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
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
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
document.addEventListener('DOMContentLoaded', function() {
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
});

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

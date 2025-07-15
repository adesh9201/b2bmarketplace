// Global Variables
let currentUser = null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];
let suppliers = [];

// Sample Data
const sampleProducts = [
    {
        id: 1,
        name: "Premium Cotton Fabric",
        description: "High-quality 100% cotton fabric perfect for clothing and home textiles.",
        price: 12.99,
        originalPrice: 15.99,
        category: "Cotton",
        supplier: "TextileCorp",
        stock: 150,
        unit: "yard",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        reviews: 124,
        colors: ["White", "Blue", "Red", "Green"],
        material: "100% Cotton",
        weight: "200 GSM",
        width: "60 inches"
    },
    {
        id: 2,
        name: "Silk Chiffon Fabric",
        description: "Luxurious silk chiffon with excellent drape and flow.",
        price: 45.99,
        originalPrice: 55.99,
        category: "Silk",
        supplier: "LuxuryFabrics",
        stock: 75,
        unit: "yard",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        reviews: 89,
        colors: ["Ivory", "Black", "Rose Gold"],
        material: "100% Silk",
        weight: "12 GSM",
        width: "54 inches"
    },
    {
        id: 3,
        name: "Wool Blend Suiting",
        description: "Professional wool blend fabric ideal for suits and formal wear.",
        price: 28.50,
        originalPrice: 35.00,
        category: "Wool",
        supplier: "ProfessionalTextiles",
        stock: 200,
        unit: "yard",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        reviews: 156,
        colors: ["Navy", "Charcoal", "Brown"],
        material: "70% Wool, 30% Polyester",
        weight: "280 GSM",
        width: "58 inches"
    },
    {
        id: 4,
        name: "Polyester Jersey",
        description: "Comfortable polyester jersey perfect for activewear and casual clothing.",
        price: 8.99,
        originalPrice: 12.99,
        category: "Synthetic",
        supplier: "ActiveFabrics",
        stock: 300,
        unit: "yard",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.5,
        reviews: 203,
        colors: ["Black", "White", "Gray", "Navy"],
        material: "100% Polyester",
        weight: "180 GSM",
        width: "60 inches"
    },
    {
        id: 5,
        name: "Linen Blend Fabric",
        description: "Natural linen blend with excellent breathability and texture.",
        price: 18.75,
        originalPrice: 22.50,
        category: "Linen",
        supplier: "NaturalTextiles",
        stock: 120,
        unit: "yard",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        reviews: 98,
        colors: ["Natural", "Beige", "Sage"],
        material: "55% Linen, 45% Cotton",
        weight: "220 GSM",
        width: "56 inches"
    },
    {
        id: 6,
        name: "Velvet Fabric",
        description: "Luxurious velvet fabric with rich texture and elegant appearance.",
        price: 32.99,
        originalPrice: 39.99,
        category: "Velvet",
        supplier: "LuxuryFabrics",
        stock: 85,
        unit: "yard",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        reviews: 67,
        colors: ["Burgundy", "Emerald", "Navy", "Gold"],
        material: "100% Polyester",
        weight: "350 GSM",
        width: "54 inches"
    },
    {
        id: 7,
        name: "Organic Bamboo Jersey",
        description: "Soft, eco-friendly bamboo jersey fabric ideal for sustainable fashion.",
        price: 19.99,
        originalPrice: 24.99,
        category: "Bamboo",
        supplier: "EcoFabrics",
        stock: 180,
        unit: "yard",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        reviews: 112,
        colors: ["Natural", "Olive", "Charcoal"],
        material: "95% Bamboo, 5% Spandex",
        weight: "210 GSM",
        width: "58 inches"
    },
    {
        id: 8,
        name: "Denim Indigo",
        description: "Durable, classic indigo denim for jeans, jackets, and more.",
        price: 15.99,
        originalPrice: 19.99,
        category: "Denim",
        supplier: "DenimMakers",
        stock: 220,
        unit: "yard",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        reviews: 134,
        colors: ["Indigo", "Black"],
        material: "100% Cotton",
        weight: "320 GSM",
        width: "60 inches"
    },
    {
        id: 9,
        name: "Luxury Silk Blend",
        description: "Premium silk blend fabric with a soft, shimmery finish.",
        price: 24.99,
        originalPrice: 29.99,
        category: "Silk",
        supplier: "LuxuryFabrics",
        stock: 90,
        unit: "yard",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        reviews: 78,
        colors: ["Champagne", "Silver", "Rose"],
        material: "70% Silk, 30% Viscose",
        weight: "110 GSM",
        width: "54 inches"
    },
    {
        id: 10,
        name: "Linen Natural",
        description: "Lightweight, breathable linen fabric for summer wear and home decor.",
        price: 22.00,
        originalPrice: 26.00,
        category: "Linen",
        supplier: "NaturalTextiles",
        stock: 140,
        unit: "yard",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        reviews: 101,
        colors: ["Natural", "White", "Sky Blue"],
        material: "100% Linen",
        weight: "180 GSM",
        width: "56 inches"
    },
    {
        id: 11,
        name: "Wool Tweed",
        description: "Warm, textured wool tweed for coats, blazers, and accessories.",
        price: 27.50,
        originalPrice: 32.00,
        category: "Wool",
        supplier: "HeritageWeaves",
        stock: 60,
        unit: "yard",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        reviews: 88,
        colors: ["Gray", "Brown", "Olive"],
        material: "100% Wool",
        weight: "350 GSM",
        width: "58 inches"
    }
];

const sampleSuppliers = [
    {
        id: 1,
        name: "TextileCorp",
        rating: 4.8,
        reviews: 1240,
        location: "New York, USA",
        specialties: ["Cotton", "Linen", "Wool"],
        verified: true,
        joined: "2020-03-15"
    },
    {
        id: 2,
        name: "LuxuryFabrics",
        rating: 4.9,
        reviews: 890,
        location: "Milan, Italy",
        specialties: ["Silk", "Velvet", "Cashmere"],
        verified: true,
        joined: "2019-08-22"
    },
    {
        id: 3,
        name: "ProfessionalTextiles",
        rating: 4.7,
        reviews: 1560,
        location: "London, UK",
        specialties: ["Wool", "Suiting", "Formal Wear"],
        verified: true,
        joined: "2018-11-10"
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    animateCounters();
    setupButtonRipples();
    setupScrollAnimations();
    animateStatCounters();
    // Apply Google Fonts classes if not present
    document.body.classList.add('font-inter');
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, .navbar-brand, .display-4').forEach(el => el.classList.add('font-poppins'));
    // Ensure features section cards are visible
    document.querySelectorAll('.features-section .animate-on-scroll').forEach(function(el) {
        el.classList.add('visible');
    });
});

function initializeApp() {
    loadProducts();
    loadSuppliers();
    updateCartCount();
    setupEventListeners();
    checkUserSession();
    loadFeaturedProducts();
}

// Event Listeners Setup
function setupEventListeners() {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Logout Button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Search Functionality
    const searchInput = document.querySelector('input[placeholder="Search fabrics..."]');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}

// User Authentication
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simulate login validation
    if (email && password) {
        currentUser = {
            id: 1,
            name: email.split('@')[0],
            email: email,
            type: 'buyer'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserInterface();
        showToast('Login successful!', 'success');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
    } else {
        showToast('Please fill in all fields', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const userType = document.getElementById('userType').value;

    if (name && email && password && userType) {
        currentUser = {
            id: Date.now(),
            name: name,
            email: email,
            type: userType
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserInterface();
        showToast('Registration successful!', 'success');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        modal.hide();
    } else {
        showToast('Please fill in all fields', 'error');
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserInterface();
    showToast('Logged out successfully', 'info');
}

function checkUserSession() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInterface();
    }
}

function updateUserInterface() {
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (currentUser) {
        userDropdown.innerHTML = `<i class="fas fa-user me-1"></i>${currentUser.name}`;
        logoutBtn.style.display = 'block';
    } else {
        userDropdown.innerHTML = '<i class="fas fa-user me-1"></i>Account';
        logoutBtn.style.display = 'none';
    }
}

// Product Management
function loadProducts() {
    products = sampleProducts;
}

function loadSuppliers() {
    suppliers = sampleSuppliers;
}

// Animated Counters for Homepage Stats
function animateCounters() {
    const counters = document.querySelectorAll('.animated-counter');
    const options = { threshold: 0.7 };
    const animate = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText.replace(/,/g, '');
            const increment = Math.ceil(target / 60);
            if (count < target) {
                counter.innerText = (count + increment > target ? target : count + increment).toLocaleString();
                setTimeout(updateCount, 16);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    };
    const observer = new window.IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, options);
    counters.forEach(counter => observer.observe(counter));
}

function animateStatCounters() {
  document.querySelectorAll('.stats-section .animated-counter').forEach(function(counter) {
    const target = parseInt(counter.getAttribute('data-count').replace(/,/g, ''));
    let current = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / target), 10);
    function updateCounter() {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        counter.textContent = target.toLocaleString();
      } else {
        counter.textContent = current.toLocaleString();
        setTimeout(updateCounter, stepTime);
      }
    }
    counter.textContent = '0';
    updateCounter();
  });
}

// Enhance featured product cards with 'New' badge
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;

    const featuredProducts = products.slice(0, 4);
    
    featuredContainer.innerHTML = featuredProducts.map((product, idx) => `
        <div class="col-lg-3 col-md-6">
            <div class="card product-card h-100">
                <div class="position-relative">
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                    <span class="stock-status ${product.stock > 50 ? 'stock-in' : product.stock > 10 ? 'stock-low' : 'stock-out'}">
                        ${product.stock > 50 ? 'In Stock' : product.stock > 10 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                    ${idx === 0 ? '<span class="badge-new">New</span>' : ''}
                </div>
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title">${product.name}</h6>
                    <p class="card-text text-muted small">${product.description.substring(0, 80)}...</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <span class="text-muted small text-decoration-line-through">$${product.originalPrice.toFixed(2)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="product-rating">
                            ${generateStarRating(product.rating)} (${product.reviews})
                        </div>
                        <span class="supplier-badge">${product.supplier}</span>
                    </div>
                    <div class="mt-auto">
                        <button class="btn btn-gradient btn-sm w-100" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus me-1"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Cart Management
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} added to cart!`, 'success');
    
    // Add bounce animation to cart icon
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (cartIcon) {
        cartIcon.parentElement.classList.add('cart-bounce');
        setTimeout(() => {
            cartIcon.parentElement.classList.remove('cart-bounce');
        }, 600);
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast('Item removed from cart', 'info');
}

function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }
    }
}

// Search Functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm.length < 2) return;
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.supplier.toLowerCase().includes(searchTerm)
    );
    
    // Update search results (if on catalog page)
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        displayProducts(filteredProducts);
    }
}

// Utility Functions
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast show bg-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} text-white`;
    toast.innerHTML = `
        <div class="toast-body">
            ${message}
            <button type="button" class="btn-close btn-close-white ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 3000);
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Navigation Functions
function navigateTo(page) {
    window.location.href = page;
}

// Button Ripple Effect
function setupButtonRipples() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            btn.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const animatedEls = document.querySelectorAll('.fade-in-up, .fade-in-left, .animated-section');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    animatedEls.forEach(el => observer.observe(el));
}

// Export functions for use in other pages
window.FabricHub = {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    showToast,
    formatPrice,
    formatDate,
    navigateTo,
    currentUser: () => currentUser,
    cart: () => cart,
    products: () => products
}; 
// Cart Page Specific JavaScript
let cart = [];
let shippingCost = 15.00;
let discount = 0;
let promoCodeApplied = false;

// Initialize Cart
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
});

function initializeCart() {
    loadCart();
    setupCartEventListeners();
    updateCartDisplay();
}

function setupCartEventListeners() {
    // Shipping options
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener('change', updateShippingCost);
    });

    // Promo code
    const promoInput = document.getElementById('promoCode');
    if (promoInput) {
        promoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyPromoCode();
            }
        });
    }
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function updateCartDisplay() {
    if (cart.length === 0) {
        showEmptyCart();
    } else {
        showCartItems();
        updateOrderSummary();
    }
    setTimeout(animateOnScroll, 100);
}

function showEmptyCart() {
    document.getElementById('emptyCartState').style.display = 'block';
    document.querySelector('.py-5').style.display = 'none';
}

function showCartItems() {
    document.getElementById('emptyCartState').style.display = 'none';
    document.querySelector('.py-5').style.display = 'block';
    
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
}

function createCartItemHTML(item) {
    const product = getProductById(item.id);
    if (!product) return '';

    const totalPrice = item.price * item.quantity;
    
    return `
        <div class="cart-item border-bottom p-4" data-product-id="${item.id}">
            <div class="row align-items-center">
                <div class="col-md-2 col-4">
                    <img src="${item.image}" class="img-fluid rounded" alt="${item.name}">
                </div>
                <div class="col-md-4 col-8">
                    <h6 class="mb-1">${item.name}</h6>
                    <p class="text-muted small mb-0">${product.supplier}</p>
                    <div class="product-rating small">
                        ${generateStarRating(product.rating)} (${product.reviews})
                    </div>
                </div>
                <div class="col-md-2 col-6">
                    <div class="quantity-selector">
                        <button class="quantity-btn ripple" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input ripple" value="${item.quantity}" 
                               min="1" max="${product.stock}" onchange="updateQuantity(${item.id}, this.value)">
                        <button class="quantity-btn ripple" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-2 col-3 text-center">
                    <div class="fw-bold">$${item.price.toFixed(2)}</div>
                    <small class="text-muted">per unit</small>
                </div>
                <div class="col-md-1 col-3 text-center">
                    <div class="fw-bold">$${totalPrice.toFixed(2)}</div>
                </div>
                <div class="col-md-1 col-12 text-end">
                    <button class="btn btn-outline-danger btn-sm ripple" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getProductById(productId) {
    const products = window.FabricHub.products();
    return products.find(product => product.id === productId);
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

function updateQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    const product = getProductById(productId);
    
    if (!product) return;
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    if (newQuantity > product.stock) {
        showToast(`Only ${product.stock} units available in stock`, 'warning');
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
    showToast('Item removed from cart', 'info');
}

function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax + shippingCost - discount;
    
    const orderSummaryHTML = `
        <div class="d-flex justify-content-between mb-2">
            <span>Subtotal (${cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Shipping</span>
            <span>$${shippingCost.toFixed(2)}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Tax</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
        ${discount > 0 ? `
        <div class="d-flex justify-content-between mb-2 text-success">
            <span>Discount</span>
            <span>-$${discount.toFixed(2)}</span>
        </div>
        ` : ''}
        <hr>
        <div class="d-flex justify-content-between fw-bold fs-5">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
        <button class="btn btn-primary w-100 mt-3 ripple" onclick="openCheckout()">
            <i class="fas fa-credit-card me-2"></i>Proceed to Checkout
        </button>
    `;
    
    document.getElementById('orderSummary').innerHTML = orderSummaryHTML;
}

function updateShippingCost() {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked').value;
    
    switch(selectedShipping) {
        case 'standard':
            shippingCost = 15.00;
            break;
        case 'express':
            shippingCost = 25.00;
            break;
        case 'overnight':
            shippingCost = 45.00;
            break;
    }
    
    updateOrderSummary();
}

function applyPromoCode() {
    const promoCode = document.getElementById('promoCode').value.trim().toUpperCase();
    const promoMessage = document.getElementById('promoMessage');
    
    // Sample promo codes
    const validPromoCodes = {
        'WELCOME10': 0.10,
        'SAVE20': 0.20,
        'FABRIC15': 0.15
    };
    
    if (promoCodeApplied) {
        promoMessage.innerHTML = '<div class="alert alert-warning">Promo code already applied</div>';
        return;
    }
    
    if (validPromoCodes[promoCode]) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        discount = subtotal * validPromoCodes[promoCode];
        promoCodeApplied = true;
        promoMessage.innerHTML = `<div class="alert alert-success">Promo code applied! You saved $${discount.toFixed(2)}</div>`;
        updateOrderSummary();
        showToast('Promo code applied successfully!', 'success');
    } else {
        promoMessage.innerHTML = '<div class="alert alert-danger">Invalid promo code</div>';
    }
}

function openCheckout() {
    // Check if user is logged in
    const currentUser = window.FabricHub.currentUser();
    if (!currentUser) {
        showToast('Please login to proceed with checkout', 'warning');
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
    }
    
    // Pre-fill billing information if available
    const billingName = document.getElementById('billingName');
    const billingEmail = document.getElementById('billingEmail');
    
    if (billingName && billingEmail) {
        billingName.value = currentUser.name;
        billingEmail.value = currentUser.email;
    }
    
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    checkoutModal.show();
}

function processOrder() {
    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);
    
    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Simulate order processing
    const loadingBtn = document.querySelector('#checkoutModal .btn-primary');
    const originalText = loadingBtn.innerHTML;
    loadingBtn.innerHTML = '<span class="loading"></span> Processing...';
    loadingBtn.disabled = true;
    
    setTimeout(() => {
        // Clear cart
        cart = [];
        localStorage.removeItem('cart');
        
        // Close modal
        const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
        checkoutModal.hide();
        
        // Show success message
        showOrderSuccess();
        
        // Reset button
        loadingBtn.innerHTML = originalText;
        loadingBtn.disabled = false;
        
        // Update cart display
        updateCartDisplay();
        updateCartCount();
        
    }, 2000);
}

function showOrderSuccess() {
    const successHTML = `
        <div class="text-center py-5">
            <i class="fas fa-check-circle fa-4x text-success mb-4"></i>
            <h3 class="text-success mb-3">Order Placed Successfully!</h3>
            <p class="text-muted mb-4">Your order has been confirmed. You will receive an email confirmation shortly.</p>
            <div class="d-flex justify-content-center gap-3">
                <a href="index.html" class="btn btn-primary">
                    <i class="fas fa-home me-2"></i>Back to Home
                </a>
                <a href="catalog.html" class="btn btn-outline-primary">
                    <i class="fas fa-shopping-bag me-2"></i>Continue Shopping
                </a>
            </div>
        </div>
    `;
    
    document.querySelector('.container').innerHTML = successHTML;
}

// Utility function to show toast messages
function showToast(message, type = 'info') {
    if (window.FabricHub && window.FabricHub.showToast) {
        window.FabricHub.showToast(message, type);
    } else {
        // Fallback alert
        alert(message);
    }
} 

// Ripple effect for all .ripple buttons
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const circle = document.createElement('span');
      circle.className = 'ripple-effect';
      const rect = btn.getBoundingClientRect();
      circle.style.left = `${e.clientX - rect.left}px`;
      circle.style.top = `${e.clientY - rect.top}px`;
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });
});
// Card lift handled by CSS
// Scroll-triggered fade-in/slide-up animations
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const windowHeight = window.innerHeight;
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 60) {
      el.classList.add('animated');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);
// Re-animate on cart display
function updateCartDisplay() {
  // ... existing code ...
  setTimeout(animateOnScroll, 100);
}
// Dark mode support for dynamic elements
function applyDarkModeToDynamic() {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('.modal-content').forEach(modal => {
    if (isDark) modal.classList.add('dark-mode-bg');
    else modal.classList.remove('dark-mode-bg');
  });
}
window.addEventListener('DOMContentLoaded', applyDarkModeToDynamic);
window.addEventListener('storage', applyDarkModeToDynamic); 
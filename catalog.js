// catalog.js

document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('catalogGrid');
  const applyBtn = document.getElementById('applyFilters');
  const resetBtn = document.getElementById('resetFilters');
  const sortBy = document.getElementById('sortBy');
  const catalogCount = document.getElementById('catalogCount');
  
  // Filter elements
  const filterCategory = document.getElementById('filterCategory');
  const filterPriceMin = document.getElementById('filterPriceMin');
  const filterPriceMax = document.getElementById('filterPriceMax');
  const filterColor = document.getElementById('filterColor');
  const filterMaterial = document.getElementById('filterMaterial');
  const filterSupplier = document.getElementById('filterSupplier');
  const filterRating = document.getElementById('filterRating');
  
  // Get products from FabricHub
  const products = window.FabricHub.products();
  if (!Array.isArray(products)) return;
  
  // Store all products for filtering
  let filteredProducts = [...products];
  
  // Apply filters when button is clicked
  applyBtn.addEventListener('click', applyFilters);
  
  // Reset filters
  resetBtn.addEventListener('click', resetFilters);
  
  // Sort when dropdown changes
  sortBy.addEventListener('change', applyFilters);
  
  // Initial render
  renderProducts();
  
  function applyFilters() {
    // Get filter values
    const category = filterCategory.value;
    const priceMin = parseFloat(filterPriceMin.value) || 0;
    const priceMax = parseFloat(filterPriceMax.value) || Infinity;
    const color = filterColor.value;
    const material = filterMaterial.value;
    const supplier = filterSupplier.value;
    const rating = parseFloat(filterRating.value) || 0;
    const sortOption = sortBy.value;
    
    // Apply filters
    filteredProducts = products.filter(product => {
      // Category filter
      if (category && product.category !== category) return false;
      
      // Price filter
      if (product.price < priceMin || product.price > priceMax) return false;
      
      // Color filter
      if (color && !product.colors.includes(color)) return false;
      
      // Material filter
      if (material && !product.material.toLowerCase().includes(material)) return false;
      
      // Supplier filter
      if (supplier && product.supplier !== supplier) return false;
      
      // Rating filter
      if (rating && product.rating < rating) return false;
      
      return true;
    });
    
    // Apply sorting
    switch(sortOption) {
      case 'priceLowHigh':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filteredProducts.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Default sorting (newest first)
        filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }
    
    renderProducts();
  }
  
  function resetFilters() {
    // Reset all filter inputs
    filterCategory.value = '';
    filterPriceMin.value = '';
    filterPriceMax.value = '';
    filterColor.value = '';
    filterMaterial.value = '';
    filterSupplier.value = '';
    filterRating.value = '';
    sortBy.value = 'newest';
    
    // Reset to all products
    filteredProducts = [...products];
    renderProducts();
  }
  
  function renderProducts() {
    // Update count text
    catalogCount.textContent = filteredProducts.length === products.length 
      ? 'All Fabrics' 
      : `${filteredProducts.length} Filtered Fabrics`;
    
    // Render products
    grid.innerHTML = filteredProducts.map(product => `
      <div class="col-lg-4 col-md-6 col-sm-6 col-6">
        <div class="product-card glassmorphic card-lift featured-card position-relative animate-on-scroll h-100">
          <div class="img-hover-zoom rounded-4 overflow-hidden mb-3">
            <img src="${product.image}" alt="${product.name}" class="img-fluid featured-img">
          </div>
          <h6 class="fw-bold mb-1 font-poppins">${product.name}</h6>
          <p class="text-muted small mb-2">${product.description}</p>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="fw-bold" style="color:#bfa046;">$${product.price.toFixed(2)} / ${product.unit || 'yard'}</div>
            <div class="d-flex align-items-center">
              <span class="text-warning me-1">
                ${renderStars(product.rating)}
              </span>
              <small>(${product.reviews})</small>
            </div>
          </div>
          <div class="d-flex justify-content-center gap-2 mt-auto">
            <button class="btn btn-gold btn-sm ripple">Buy Now</button>
            <button class="btn btn-outline-gold btn-sm ripple">View Details</button>
          </div>
        </div>
      </div>
    `).join('');
    
    // Setup interactions for new elements
    setupEventListeners();
    animateOnScroll();
  }
  
  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return `
      ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
      ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
      ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
    `;
  }
  
  function setupEventListeners() {
    // Ripple effect for all .ripple buttons
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

    // Show toast on Buy Now
    grid.querySelectorAll('.btn-gold').forEach(btn => {
      btn.addEventListener('click', function() {
        window.showToast('Added to cart!', 'success');
      });
    });
  }

  // Scroll-triggered fade-in animation
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
});

// Initialize toast function if not already defined
if (typeof window.showToast !== 'function') {
  window.showToast = function(message, type = 'info') {
    let toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${type} border-0 show`;
    toast.style.position = 'fixed';
    toast.style.bottom = '2rem';
    toast.style.right = '2rem';
    toast.style.zIndex = 9999;
    toast.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div><button type="button" class="btn-close btn-close-white ms-2 m-auto" data-bs-dismiss="toast"></button></div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    toast.querySelector('.btn-close').onclick = () => toast.remove();
  };
}
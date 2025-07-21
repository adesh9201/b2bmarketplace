// catalog.js

document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('catalogGrid');
  const catalogCount = document.getElementById('catalogCount');
  const applyFiltersBtn = document.getElementById('applyFilters');
  const resetFiltersBtn = document.getElementById('resetFilters');
  const sortBySelect = document.getElementById('sortBy');

  // Simulate backend data source
  window.FabricHub = {
    products: () => sampleProducts // sampleProducts must be globally available
  };

  let allProducts = window.FabricHub.products();
  let filteredProducts = [...allProducts];

  function renderProducts(products) {
    if (!grid) return;

    grid.innerHTML = products.map(product => `
      <div class="col-lg-4 col-md-6 col-sm-6 col-6">
        <div class="product-card glassmorphic card-lift featured-card position-relative animate-on-scroll h-100">
          <div class="img-hover-zoom rounded-4 overflow-hidden mb-3">
            <img src="${product.image}" alt="${product.name}" class="img-fluid featured-img">
          </div>
          <h6 class="fw-bold mb-1 font-poppins">${product.name}</h6>
          <p class="text-muted small mb-2">${product.description}</p>
          <div class="fw-bold mb-2" style="color:#bfa046;">$${product.price.toFixed(2)} / ${product.unit || 'yard'}</div>
          <div class="d-flex justify-content-center gap-2 mt-auto">
            <button class="btn btn-gold btn-sm ripple">Buy Now</button>
            <button class="btn btn-outline-gold btn-sm ripple">View Details</button>
          </div>
        </div>
      </div>
    `).join('');

    catalogCount.innerText = `${products.length} product(s) found`;

    // Add ripple effect again after rendering
    document.querySelectorAll('.ripple').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const circle = document.createElement('span');
        circle.className = 'ripple-effect';
        const rect = btn.getBoundingClientRect();
        circle.style.left = `${e.clientX - rect.left}px`;
        circle.style.top = `${e.clientY - rect.top}px`;
        btn.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
      });
    });

    grid.querySelectorAll('.btn-gold').forEach(btn => {
      btn.addEventListener('click', function () {
        window.showToast('Added to cart!', 'success');
      });
    });

    animateOnScroll();
  }

  function getFilters() {
    return {
      category: document.getElementById('filterCategory').value.trim(),
      minPrice: parseFloat(document.getElementById('filterPriceMin').value) || 0,
      maxPrice: parseFloat(document.getElementById('filterPriceMax').value) || Infinity,
      color: document.getElementById('filterColor').value.trim(),
      material: document.getElementById('filterMaterial').value.trim(),
      supplier: document.getElementById('filterSupplier').value.trim(),
      rating: parseFloat(document.getElementById('filterRating').value) || 0
    };
  }

  function applyFilters() {
    const {
      category,
      minPrice,
      maxPrice,
      color,
      material,
      supplier,
      rating
    } = getFilters();

    filteredProducts = allProducts.filter(product => {
      const matchCategory = category === "" || product.category.toLowerCase().includes(category.toLowerCase());
      const matchPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchColor = color === "" || (product.colors && product.colors.includes(color));
      const matchMaterial = material === "" || (product.material && product.material.toLowerCase().includes(material.toLowerCase()));
      const matchSupplier = supplier === "" || product.supplier === supplier;
      const matchRating = product.rating >= rating;

      return matchCategory && matchPrice && matchColor && matchMaterial && matchSupplier && matchRating;
    });

    sortAndRender();
  }

  function resetFilters() {
    document.getElementById('catalogFilters').reset();
    filteredProducts = [...allProducts];
    sortAndRender();
  }

  function sortAndRender() {
    const sortBy = sortBySelect.value;

    if (sortBy === 'priceLowHigh') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighLow') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popularity') {
      filteredProducts.sort((a, b) => b.reviews - a.reviews);
    } else if (sortBy === 'newest') {
      filteredProducts.sort((a, b) => b.id - a.id); // Assuming higher ID = newer
    }

    renderProducts(filteredProducts);
  }

  // Event Listeners
  applyFiltersBtn.addEventListener('click', applyFilters);
  resetFiltersBtn.addEventListener('click', resetFilters);
  sortBySelect.addEventListener('change', sortAndRender);

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

  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('resize', animateOnScroll);

  // Toast system
  window.showToast = function (message, type = 'info') {
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

  // Initial Render
  sortAndRender();
});

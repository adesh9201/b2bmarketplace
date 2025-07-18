// catalog.js

document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('catalogGrid');
  if (!grid || !window.FabricHub || typeof window.FabricHub.products !== 'function') return;
  const products = window.FabricHub.products();
  if (!Array.isArray(products)) return;

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

  // Scroll-triggered fade-in animation for .animate-on-scroll
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
  animateOnScroll();

  // Optionally: Toast notification system (simple)
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

  // Example: Show toast on Buy Now
  grid.querySelectorAll('.btn-gold').forEach(btn => {
    btn.addEventListener('click', function() {
      window.showToast('Added to cart!', 'success');
    });
  });
}); 
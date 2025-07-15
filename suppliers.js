// Suppliers Page JavaScript
let suppliers = [];
let filteredSuppliers = [];

// Initialize Suppliers Page
document.addEventListener('DOMContentLoaded', function() {
    initializeSuppliers();
});

function initializeSuppliers() {
    loadSuppliers();
    setupSuppliersEventListeners();
    displaySuppliers();
}

function setupSuppliersEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('supplierSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterSuppliers);
    }

    // Location filter
    const locationFilter = document.getElementById('locationFilter');
    if (locationFilter) {
        locationFilter.addEventListener('change', filterSuppliers);
    }

    // Rating filter
    const ratingFilter = document.getElementById('ratingFilter');
    if (ratingFilter) {
        ratingFilter.addEventListener('change', filterSuppliers);
    }
}

function loadSuppliers() {
    suppliers = [
        {
            id: 1,
            name: "TextileCorp",
            description: "Leading manufacturer of premium cotton and linen fabrics with over 20 years of experience in the textile industry.",
            rating: 4.8,
            reviews: 1240,
            location: "New York, USA",
            specialties: ["Cotton", "Linen", "Wool"],
            verified: true,
            joined: "2020-03-15",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            products: 45,
            responseTime: "2 hours",
            minOrder: "$500",
            certifications: ["ISO 9001", "OEKO-TEX® Standard 100"],
            website: "https://textilecorp.com"
        },
        {
            id: 2,
            name: "LuxuryFabrics",
            description: "Premium silk and velvet supplier specializing in high-end fashion fabrics for luxury brands worldwide.",
            rating: 4.9,
            reviews: 890,
            location: "Milan, Italy",
            specialties: ["Silk", "Velvet", "Cashmere"],
            verified: true,
            joined: "2019-08-22",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            products: 32,
            responseTime: "1 hour",
            minOrder: "$1000",
            certifications: ["GOTS", "Fair Trade"],
            website: "https://luxuryfabrics.it"
        },
        {
            id: 3,
            name: "ProfessionalTextiles",
            description: "Specialized in professional suiting and formal wear fabrics with excellent quality and competitive pricing.",
            rating: 4.7,
            reviews: 1560,
            location: "London, UK",
            specialties: ["Wool", "Suiting", "Formal Wear"],
            verified: true,
            joined: "2018-11-10",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            products: 28,
            responseTime: "4 hours",
            minOrder: "$750",
            certifications: ["ISO 14001", "Woolmark"],
            website: "https://professionaltextiles.co.uk"
        },
        {
            id: 4,
            name: "NaturalTextiles",
            description: "Eco-friendly fabric supplier focusing on sustainable and organic materials for conscious fashion.",
            rating: 4.6,
            reviews: 720,
            location: "Mumbai, India",
            specialties: ["Organic Cotton", "Hemp", "Bamboo"],
            verified: true,
            joined: "2021-01-15",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            products: 38,
            responseTime: "6 hours",
            minOrder: "$300",
            certifications: ["GOTS", "Fair Trade", "Organic"],
            website: "https://naturaltextiles.in"
        },
        {
            id: 5,
            name: "ActiveFabrics",
            description: "Leading supplier of performance and activewear fabrics for sports and outdoor clothing manufacturers.",
            rating: 4.5,
            reviews: 980,
            location: "Shanghai, China",
            specialties: ["Performance", "Synthetic", "Athletic"],
            verified: true,
            joined: "2019-05-08",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            products: 52,
            responseTime: "3 hours",
            minOrder: "$400",
            certifications: ["OEKO-TEX®", "ISO 9001"],
            website: "https://activefabrics.cn"
        },
        {
            id: 6,
            name: "HeritageWeaves",
            description: "Traditional handloom and artisanal fabric supplier preserving ancient weaving techniques and cultural heritage.",
            rating: 4.8,
            reviews: 650,
            location: "Jaipur, India",
            specialties: ["Handloom", "Artisanal", "Traditional"],
            verified: true,
            joined: "2020-09-12",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            products: 25,
            responseTime: "8 hours",
            minOrder: "$200",
            certifications: ["Handloom Mark", "GI Tag"],
            website: "https://heritageweaves.in"
        }
    ];
    
    filteredSuppliers = [...suppliers];
}

function displaySuppliers() {
    const grid = document.getElementById('suppliersGrid');
    if (!grid) return;

    if (filteredSuppliers.length === 0) {
        grid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No suppliers found</h4>
                <p class="text-muted">Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredSuppliers.map(supplier => createSupplierCard(supplier)).join('');
    setTimeout(animateOnScroll, 100);
}

function createSupplierCard(supplier) {
    const specialties = supplier.specialties.map(s => `<span class="badge bg-light text-dark me-1">${s}</span>`).join('');
    const certifications = supplier.certifications.slice(0, 2).map(c => `<span class="badge bg-success me-1">${c}</span>`).join('');
    return `
        <div class="col-lg-4 col-md-6">
            <div class="card supplier-card h-100">
                <div class="position-relative">
                    <img src="${supplier.image}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${supplier.name}">
                    ${supplier.verified ? `
                        <div class="position-absolute top-0 end-0 m-2">
                            <span class="badge bg-gradient">
                                <i class="fas fa-check-circle me-1"></i>Verified
                            </span>
                        </div>
                    ` : ''}
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title mb-0 font-poppins">${supplier.name}</h5>
                        <div class="text-end">
                            <div class="stars">
                                ${generateStarRating(supplier.rating)}
                            </div>
                            <small class="text-muted">(${supplier.reviews} reviews)</small>
                        </div>
                    </div>
                    <p class="card-text text-muted small mb-3">${supplier.description.substring(0, 120)}...</p>
                    <div class="mb-3">
                        <small class="text-muted">
                            <i class="fas fa-map-marker-alt me-1"></i>${supplier.location}
                        </small>
                    </div>
                    <div class="mb-3">
                        <strong>Specialties:</strong><br>
                        ${specialties}
                    </div>
                    <div class="mb-3">
                        ${certifications}
                        ${supplier.certifications.length > 2 ? `<span class="badge bg-secondary">+${supplier.certifications.length - 2} more</span>` : ''}
                    </div>
                    <div class="row text-center mb-3">
                        <div class="col-4">
                            <div class="fw-bold">${supplier.products}</div>
                            <small class="text-muted">Products</small>
                        </div>
                        <div class="col-4">
                            <div class="fw-bold">${supplier.responseTime}</div>
                            <small class="text-muted">Response</small>
                        </div>
                        <div class="col-4">
                            <div class="fw-bold">${supplier.minOrder}</div>
                            <small class="text-muted">Min Order</small>
                        </div>
                    </div>
                    <div class="mt-auto">
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary ripple" onclick="viewSupplier(${supplier.id})">
                                <i class="fas fa-eye me-1"></i>View Profile
                            </button>
                            <button class="btn btn-outline-primary ripple" onclick="contactSupplier(${supplier.id})">
                                <i class="fas fa-envelope me-1"></i>Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
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

function filterSuppliers() {
    const searchTerm = document.getElementById('supplierSearch').value.toLowerCase();
    const locationFilter = document.getElementById('locationFilter').value;
    const ratingFilter = parseFloat(document.getElementById('ratingFilter').value) || 0;

    filteredSuppliers = suppliers.filter(supplier => {
        const matchesSearch = supplier.name.toLowerCase().includes(searchTerm) ||
                             supplier.description.toLowerCase().includes(searchTerm) ||
                             supplier.specialties.some(s => s.toLowerCase().includes(searchTerm));
        
        const matchesLocation = !locationFilter || supplier.location.includes(locationFilter);
        const matchesRating = supplier.rating >= ratingFilter;

        return matchesSearch && matchesLocation && matchesRating;
    });

    displaySuppliers();
}

function viewSupplier(supplierId) {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (!supplier) return;
    const modalTitle = document.getElementById('supplierModalTitle');
    const modalBody = document.getElementById('supplierModalBody');
    modalTitle.textContent = supplier.name;
    // Sample product gallery
    const galleryImgs = [supplier.image,
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'];
    modalBody.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-4 text-center mb-3 mb-md-0">
                <img src="${supplier.image}" class="img-fluid rounded shadow mb-3" alt="${supplier.name}" style="max-height:180px;object-fit:cover;">
                <div class="gallery justify-content-center">
                    ${galleryImgs.map(img => `<img src="${img}" alt="Gallery" />`).join('')}
                </div>
            </div>
            <div class="col-md-8">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h4 class="font-poppins">${supplier.name}</h4>
                        <p class="text-muted mb-1">
                            <i class="fas fa-map-marker-alt me-1"></i>${supplier.location}
                        </p>
                        <p class="text-muted mb-0">
                            <i class="fas fa-calendar me-1"></i>Member since ${formatDate(supplier.joined)}
                        </p>
                    </div>
                    <div class="text-end">
                        <div class="stars fs-4 mb-1">
                            ${generateStarRating(supplier.rating)}
                        </div>
                        <small class="text-muted">${supplier.rating} (${supplier.reviews} reviews)</small>
                    </div>
                </div>
                <p class="mb-3">${supplier.description}</p>
                <div class="row mb-3">
                    <div class="col-6">
                        <strong>Specialties:</strong><br>
                        ${supplier.specialties.map(s => `<span class="badge bg-primary me-1">${s}</span>`).join('')}
                    </div>
                    <div class="col-6">
                        <strong>Certifications:</strong><br>
                        ${supplier.certifications.map(c => `<span class="badge bg-success me-1">${c}</span>`).join('')}
                    </div>
                </div>
                <div class="row text-center mb-3">
                    <div class="col-3">
                        <div class="fw-bold fs-4">${supplier.products}</div>
                        <small class="text-muted">Products</small>
                    </div>
                    <div class="col-3">
                        <div class="fw-bold fs-4">${supplier.responseTime}</div>
                        <small class="text-muted">Response Time</small>
                    </div>
                    <div class="col-3">
                        <div class="fw-bold fs-4">${supplier.minOrder}</div>
                        <small class="text-muted">Min Order</small>
                    </div>
                    <div class="col-3">
                        <div class="fw-bold fs-4">${supplier.verified ? 'Yes' : 'No'}</div>
                        <small class="text-muted">Verified</small>
                    </div>
                </div>
                ${supplier.website ? `
                    <div class="mb-3">
                        <strong>Website:</strong> 
                        <a href="${supplier.website}" target="_blank" class="text-decoration-none">
                            ${supplier.website}
                        </a>
                    </div>
                ` : ''}
                <button class="btn btn-gradient w-100 mt-2 ripple" onclick="contactSupplier(${supplier.id})">
                    <i class="fas fa-envelope me-1"></i>Contact Supplier
                </button>
            </div>
        </div>
    `;
    const modal = new bootstrap.Modal(document.getElementById('supplierModal'));
    modal.show();
}

function contactSupplier(supplierId) {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (!supplier) return;

    const currentUser = window.FabricHub.currentUser();
    if (!currentUser) {
        showToast('Please login to contact suppliers', 'warning');
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
    }

    // Simulate contact form
    const message = prompt(`Send a message to ${supplier.name}:\n\nSubject: Inquiry about fabrics\n\nMessage:`, 'Hello, I would like to inquire about your fabric products...');
    
    if (message) {
        showToast('Message sent successfully! The supplier will respond within ' + supplier.responseTime, 'success');
    }
}

function submitSupplierApplication() {
    const form = document.getElementById('supplierApplicationForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Get form data
    const formData = {
        companyName: document.getElementById('companyName').value,
        contactPerson: document.getElementById('contactPerson').value,
        contactEmail: document.getElementById('contactEmail').value,
        contactPhone: document.getElementById('contactPhone').value,
        companyLocation: document.getElementById('companyLocation').value,
        businessType: document.getElementById('businessType').value,
        specialties: Array.from(document.getElementById('specialties').selectedOptions).map(option => option.value),
        yearsInBusiness: document.getElementById('yearsInBusiness').value,
        companyDescription: document.getElementById('companyDescription').value,
        website: document.getElementById('website').value,
        certifications: document.getElementById('certifications').value
    };

    // Simulate application submission
    const loadingBtn = document.querySelector('#becomeSupplierModal .btn-primary');
    const originalText = loadingBtn.innerHTML;
    loadingBtn.innerHTML = '<span class="loading"></span> Submitting...';
    loadingBtn.disabled = true;

    setTimeout(() => {
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('becomeSupplierModal'));
        modal.hide();

        // Reset form
        form.reset();

        // Reset button
        loadingBtn.innerHTML = originalText;
        loadingBtn.disabled = false;

        // Show success message
        showApplicationSuccess();

    }, 2000);
}

function showApplicationSuccess() {
    const successHTML = `
        <div class="text-center py-5">
            <i class="fas fa-check-circle fa-4x text-success mb-4"></i>
            <h3 class="text-success mb-3">Application Submitted!</h3>
            <p class="text-muted mb-4">Thank you for your interest in becoming a supplier. Our team will review your application and contact you within 3-5 business days.</p>
            <div class="d-flex justify-content-center gap-3">
                <a href="suppliers.html" class="btn btn-primary">
                    <i class="fas fa-arrow-left me-2"></i>Back to Suppliers
                </a>
                <a href="index.html" class="btn btn-outline-primary">
                    <i class="fas fa-home me-2"></i>Go to Home
                </a>
            </div>
        </div>
    `;

    document.querySelector('.container').innerHTML = successHTML;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });
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
// Re-animate on supplier display
function displaySuppliers() {
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
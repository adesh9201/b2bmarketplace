// Dashboard JavaScript
let myProducts = [];
let myOrders = [];
let salesData = [];

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    loadDashboardData();
    setupDashboardEventListeners();
    updateDashboardStats();
    loadProductsTable();
    loadOrdersTable();
    initializeAnalytics();
}

function setupDashboardEventListeners() {
    // Product search and filter
    const productSearch = document.getElementById('productSearch');
    const productFilter = document.getElementById('productFilter');
    
    if (productSearch) {
        productSearch.addEventListener('input', filterProducts);
    }
    if (productFilter) {
        productFilter.addEventListener('change', filterProducts);
    }

    // Order filter
    const orderFilter = document.getElementById('orderFilter');
    if (orderFilter) {
        orderFilter.addEventListener('change', filterOrders);
    }

    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', updateProfile);
    }
}

function loadDashboardData() {
    // Load sample data for demonstration
    myProducts = [
        {
            id: 1,
            name: "Premium Cotton Fabric",
            category: "Cotton",
            price: 12.99,
            stock: 150,
            status: "Active",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 2,
            name: "Silk Chiffon Fabric",
            category: "Silk",
            price: 45.99,
            stock: 75,
            status: "Active",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 3,
            name: "Wool Blend Suiting",
            category: "Wool",
            price: 28.50,
            stock: 200,
            status: "Active",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    myOrders = [
        {
            id: "ORD-001",
            customer: "John Smith",
            products: "Premium Cotton Fabric (5 yards)",
            total: 64.95,
            status: "Delivered",
            date: "2024-01-15"
        },
        {
            id: "ORD-002",
            customer: "Sarah Johnson",
            products: "Silk Chiffon Fabric (3 yards)",
            total: 137.97,
            status: "Shipped",
            date: "2024-01-18"
        },
        {
            id: "ORD-003",
            customer: "Mike Wilson",
            products: "Wool Blend Suiting (8 yards)",
            total: 228.00,
            status: "Processing",
            date: "2024-01-20"
        }
    ];

    salesData = [
        { month: 'Jan', sales: 1200 },
        { month: 'Feb', sales: 1800 },
        { month: 'Mar', sales: 1500 },
        { month: 'Apr', sales: 2200 },
        { month: 'May', sales: 1900 },
        { month: 'Jun', sales: 2500 }
    ];
}

function updateDashboardStats() {
    document.getElementById('totalProducts').textContent = myProducts.length;
    document.getElementById('totalOrders').textContent = myOrders.length;
    
    const totalRevenue = myOrders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
    
    const avgRating = 4.7; // This would be calculated from actual reviews
    document.getElementById('avgRating').textContent = avgRating.toFixed(1);
}

function loadProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    tbody.innerHTML = myProducts.map(product => `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <img src="${product.image}" class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;">
                    <div>
                        <h6 class="mb-0">${product.name}</h6>
                        <small class="text-muted">ID: ${product.id}</small>
                    </div>
                </div>
            </td>
            <td><span class="badge bg-primary">${product.category}</span></td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <span class="${product.stock > 50 ? 'text-success' : product.stock > 10 ? 'text-warning' : 'text-danger'}">
                    ${product.stock} units
                </span>
            </td>
            <td>
                <span class="badge ${product.status === 'Active' ? 'bg-success' : 'bg-secondary'}">
                    ${product.status}
                </span>
            </td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    setTimeout(animateOnScroll, 100);
}

function loadOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    tbody.innerHTML = myOrders.map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.products}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>
                <span class="badge ${getStatusBadgeClass(order.status)}">
                    ${order.status}
                </span>
            </td>
            <td>${formatDate(order.date)}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="viewOrder('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-outline-success" onclick="updateOrderStatus('${order.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    setTimeout(animateOnScroll, 100);
}

function getStatusBadgeClass(status) {
    switch(status) {
        case 'Pending': return 'bg-warning';
        case 'Processing': return 'bg-info';
        case 'Shipped': return 'bg-primary';
        case 'Delivered': return 'bg-success';
        default: return 'bg-secondary';
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('productFilter').value;
    
    const filteredProducts = myProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    
    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(products) {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4">
                    <i class="fas fa-search fa-2x text-muted mb-3"></i>
                    <p class="text-muted">No products found</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = products.map(product => `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <img src="${product.image}" class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;">
                    <div>
                        <h6 class="mb-0">${product.name}</h6>
                        <small class="text-muted">ID: ${product.id}</small>
                    </div>
                </div>
            </td>
            <td><span class="badge bg-primary">${product.category}</span></td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <span class="${product.stock > 50 ? 'text-success' : product.stock > 10 ? 'text-warning' : 'text-danger'}">
                    ${product.stock} units
                </span>
            </td>
            <td>
                <span class="badge ${product.status === 'Active' ? 'bg-success' : 'bg-secondary'}">
                    ${product.status}
                </span>
            </td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function filterOrders() {
    const statusFilter = document.getElementById('orderFilter').value;
    
    const filteredOrders = myOrders.filter(order => {
        return !statusFilter || order.status.toLowerCase() === statusFilter.toLowerCase();
    });
    
    displayFilteredOrders(filteredOrders);
}

function displayFilteredOrders(orders) {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    if (orders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-4">
                    <i class="fas fa-shopping-cart fa-2x text-muted mb-3"></i>
                    <p class="text-muted">No orders found</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = orders.map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.products}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>
                <span class="badge ${getStatusBadgeClass(order.status)}">
                    ${order.status}
                </span>
            </td>
            <td>${formatDate(order.date)}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="viewOrder('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-outline-success" onclick="updateOrderStatus('${order.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function initializeAnalytics() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: salesData.map(d => d.month),
                datasets: [{
                    label: 'Monthly Sales ($)',
                    data: salesData.map(d => d.sales),
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Top Products
    loadTopProducts();
    setTimeout(animateOnScroll, 100);
}

function loadTopProducts() {
    const topProductsContainer = document.getElementById('topProducts');
    if (!topProductsContainer) return;

    const topProducts = [
        { name: "Premium Cotton Fabric", sales: 45, revenue: 584.55 },
        { name: "Silk Chiffon Fabric", sales: 32, revenue: 1471.68 },
        { name: "Wool Blend Suiting", sales: 28, revenue: 798.00 }
    ];

    topProductsContainer.innerHTML = topProducts.map((product, index) => `
        <div class="d-flex align-items-center mb-3">
            <div class="flex-shrink-0">
                <div class="bg-primary bg-opacity-10 p-2 rounded">
                    <span class="fw-bold text-primary">${index + 1}</span>
                </div>
            </div>
            <div class="flex-grow-1 ms-3">
                <h6 class="mb-1">${product.name}</h6>
                <small class="text-muted">${product.sales} units sold • $${product.revenue.toFixed(2)}</small>
            </div>
        </div>
    `).join('');
}

function addProduct() {
    const form = document.getElementById('addProductForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const newProduct = {
        id: myProducts.length + 1,
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        status: "Active",
        image: document.getElementById('productImage').value,
        material: document.getElementById('productMaterial').value,
        weight: document.getElementById('productWeight').value,
        width: document.getElementById('productWidth').value,
        description: document.getElementById('productDescription').value,
        colors: document.getElementById('productColors').value.split(',').map(c => c.trim())
    };

    myProducts.push(newProduct);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
    modal.hide();
    
    // Reset form
    form.reset();
    
    // Update display
    loadProductsTable();
    updateDashboardStats();
    
    showToast('Product added successfully!', 'success');
}

function editProduct(productId) {
    const product = myProducts.find(p => p.id === productId);
    if (!product) return;

    // Populate form with product data
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productMaterial').value = product.material || '';
    document.getElementById('productWeight').value = product.weight || '';
    document.getElementById('productWidth').value = product.width || '';
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productColors').value = product.colors ? product.colors.join(', ') : '';

    // Change modal title and button
    document.querySelector('#addProductModal .modal-title').textContent = 'Edit Product';
    document.querySelector('#addProductModal .btn-primary').textContent = 'Update Product';
    document.querySelector('#addProductModal .btn-primary').onclick = () => updateProduct(productId);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addProductModal'));
    modal.show();
}

function updateProduct(productId) {
    const productIndex = myProducts.findIndex(p => p.id === productId);
    if (productIndex === -1) return;

    const form = document.getElementById('addProductForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    myProducts[productIndex] = {
        ...myProducts[productIndex],
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        image: document.getElementById('productImage').value,
        material: document.getElementById('productMaterial').value,
        weight: document.getElementById('productWeight').value,
        width: document.getElementById('productWidth').value,
        description: document.getElementById('productDescription').value,
        colors: document.getElementById('productColors').value.split(',').map(c => c.trim())
    };

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
    modal.hide();
    
    // Reset form and button
    form.reset();
    document.querySelector('#addProductModal .modal-title').textContent = 'Add New Product';
    document.querySelector('#addProductModal .btn-primary').textContent = 'Add Product';
    document.querySelector('#addProductModal .btn-primary').onclick = addProduct;
    
    // Update display
    loadProductsTable();
    showToast('Product updated successfully!', 'success');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        myProducts = myProducts.filter(p => p.id !== productId);
        loadProductsTable();
        updateDashboardStats();
        showToast('Product deleted successfully!', 'info');
    }
}

function viewOrder(orderId) {
    const order = myOrders.find(o => o.id === orderId);
    if (!order) return;

    alert(`Order Details:\nOrder ID: ${order.id}\nCustomer: ${order.customer}\nProducts: ${order.products}\nTotal: $${order.total.toFixed(2)}\nStatus: ${order.status}\nDate: ${formatDate(order.date)}`);
}

function updateOrderStatus(orderId) {
    const order = myOrders.find(o => o.id === orderId);
    if (!order) return;

    const newStatus = prompt('Enter new status (Pending/Processing/Shipped/Delivered):', order.status);
    if (newStatus && ['Pending', 'Processing', 'Shipped', 'Delivered'].includes(newStatus)) {
        order.status = newStatus;
        loadOrdersTable();
        showToast('Order status updated successfully!', 'success');
    }
}

function updateProfile(e) {
    e.preventDefault();
    showToast('Profile updated successfully!', 'success');
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

// Animate dashboard stat counters
function animateDashboardCounters() {
    const counters = [
        { id: 'dashboardTotalProducts', value: myProducts.length },
        { id: 'dashboardTotalOrders', value: myOrders.length },
        { id: 'dashboardTotalRevenue', value: myOrders.reduce((sum, order) => sum + order.total, 0) },
        { id: 'dashboardAvgRating', value: 4.7, isFloat: true }
    ];
    counters.forEach(counter => {
        const el = document.getElementById(counter.id);
        if (!el) return;
        let start = 0;
        const end = counter.value;
        const duration = 1200;
        const step = (timestamp, startTime) => {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            let val = counter.isFloat ? (start + (end - start) * progress).toFixed(1) : Math.floor(start + (end - start) * progress);
            el.textContent = val;
            if (progress < 1) {
                requestAnimationFrame(ts => step(ts, startTime));
            } else {
                el.textContent = counter.isFloat ? end.toFixed(1) : end;
            }
        };
        requestAnimationFrame(ts => step(ts, ts));
    });
}

// Chart.js with purple gradient
function renderSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, '#7b2ff2');
    gradient.addColorStop(1, '#f357a8');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: salesData.map(d => d.month),
            datasets: [{
                label: 'Monthly Sales ($)',
                data: salesData.map(d => d.sales),
                borderColor: gradient,
                backgroundColor: 'rgba(123,47,242,0.08)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#f357a8',
                pointBorderColor: '#fff',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#7b2ff2',
                        callback: function(value) { return '$' + value.toLocaleString(); }
                    },
                    grid: { color: 'rgba(123,47,242,0.08)' }
                },
                x: {
                    ticks: { color: '#7b2ff2' },
                    grid: { color: 'rgba(123,47,242,0.08)' }
                }
            }
        }
    });
}

// Show order details in modal
function viewOrder(orderId) {
    const order = myOrders.find(o => o.id === orderId);
    if (!order) return;
    const modalBody = document.getElementById('orderDetailBody');
    modalBody.innerHTML = `
        <div class="mb-3">
            <strong>Order ID:</strong> ${order.id}<br>
            <strong>Customer:</strong> ${order.customer}<br>
            <strong>Status:</strong> <span class="badge bg-gradient">${order.status}</span><br>
            <strong>Date:</strong> ${formatDate(order.date)}<br>
            <strong>Total:</strong> $${order.total.toFixed(2)}
        </div>
        <div class="mb-3">
            <strong>Products:</strong><br>
            ${order.products}
        </div>
    `;
    const modal = new bootstrap.Modal(document.getElementById('orderDetailModal'));
    modal.show();
}

// Add hover effect to table rows
function addTableRowHover() {
    document.querySelectorAll('table tr').forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(123,47,242,0.07)';
        });
        row.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
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
// Re-animate on dashboard updates
function loadProductsTable() {
  // ... existing code ...
  setTimeout(animateOnScroll, 100);
}
function loadOrdersTable() {
  // ... existing code ...
  setTimeout(animateOnScroll, 100);
}
function initializeAnalytics() {
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
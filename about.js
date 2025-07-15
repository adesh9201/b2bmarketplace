// About Page JavaScript

// Initialize About Page
document.addEventListener('DOMContentLoaded', function() {
    initializeAbout();
});

function initializeAbout() {
    setupAboutEventListeners();
    updateCartCount();
}

function setupAboutEventListeners() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('footer .input-group');
    if (newsletterForm) {
        const subscribeBtn = newsletterForm.querySelector('button');
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        if (subscribeBtn && emailInput) {
            subscribeBtn.addEventListener('click', handleNewsletterSubscription);
        }
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };

    // Validate form
    if (!e.target.checkValidity()) {
        e.target.reportValidity();
        return;
    }

    // Simulate form submission
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        showContactSuccess();
        
    }, 2000);
}

function showContactSuccess() {
    const successHTML = `
        <div class="text-center py-5">
            <i class="fas fa-check-circle fa-4x text-success mb-4"></i>
            <h3 class="text-success mb-3">Message Sent Successfully!</h3>
            <p class="text-muted mb-4">Thank you for contacting us. We'll get back to you within 24 hours.</p>
            <a href="about.html" class="btn btn-primary">
                <i class="fas fa-arrow-left me-2"></i>Back to About
            </a>
        </div>
    `;

    document.querySelector('.container').innerHTML = successHTML;
}

function handleNewsletterSubscription() {
    const emailInput = document.querySelector('footer .input-group input[type="email"]');
    const email = emailInput.value.trim();

    if (!email) {
        showToast('Please enter your email address', 'warning');
        return;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'warning');
        return;
    }

    // Simulate subscription
    const subscribeBtn = document.querySelector('footer .input-group button');
    const originalText = subscribeBtn.innerHTML;
    subscribeBtn.innerHTML = '<span class="loading"></span>';
    subscribeBtn.disabled = true;

    setTimeout(() => {
        emailInput.value = '';
        subscribeBtn.innerHTML = originalText;
        subscribeBtn.disabled = false;
        showToast('Successfully subscribed to newsletter!', 'success');
    }, 1500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animate stats on scroll
function animateStats() {
    const stats = document.querySelectorAll('.py-5 .col-lg-3 h2');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent.replace(/\D/g, ''));
                animateNumber(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const originalText = element.textContent;
    const suffix = originalText.replace(/\d/g, '');

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start stats animation after a short delay
    setTimeout(animateStats, 500);
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-section');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Team member hover effects
document.addEventListener('DOMContentLoaded', function() {
    const teamCards = document.querySelectorAll('.card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Contact form validation
function validateContactForm() {
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');
    
    let isValid = true;
    
    // Name validation
    if (name.value.trim().length < 2) {
        showFieldError(name, 'Name must be at least 2 characters long');
        isValid = false;
    } else {
        clearFieldError(name);
    }
    
    // Email validation
    if (!isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearFieldError(email);
    }
    
    // Subject validation
    if (subject.value.trim().length < 5) {
        showFieldError(subject, 'Subject must be at least 5 characters long');
        isValid = false;
    } else {
        clearFieldError(subject);
    }
    
    // Message validation
    if (message.value.trim().length < 10) {
        showFieldError(message, 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        clearFieldError(message);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
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

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add click-to-copy functionality for contact info
    const contactInfo = document.querySelectorAll('.card-body p.text-muted');
    
    contactInfo.forEach(info => {
        if (info.textContent.includes('@') || info.textContent.includes('+')) {
            info.style.cursor = 'pointer';
            info.title = 'Click to copy';
            
            info.addEventListener('click', function() {
                const text = this.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    showToast('Copied to clipboard!', 'success');
                }).catch(() => {
                    showToast('Failed to copy to clipboard', 'error');
                });
            });
        }
    });
    
    // Add smooth reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.card, .py-5 > .row > div');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}); 

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
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.classList.add('animated');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);
// Re-animate on about page updates if needed
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
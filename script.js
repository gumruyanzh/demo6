/**
 * InkSync Pro - Premium Interactions
 * Apple-inspired smooth animations and user experience
 */

// ===================================
// Smooth Scroll Navigation
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 56; // Navigation height
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');

            // Reset hamburger icon
            resetMobileToggle();
        }
    });
});

// ===================================
// Mobile Navigation Toggle
// ===================================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

function resetMobileToggle() {
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
}

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');

    // Animate toggle button
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';

        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
    } else {
        resetMobileToggle();
        document.body.style.overflow = '';
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        resetMobileToggle();
        document.body.style.overflow = '';
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        resetMobileToggle();
        document.body.style.overflow = '';
    }
});

// ===================================
// Scroll-Based Navigation Effects
// ===================================

let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for enhanced styling
    if (currentScroll > 10) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// Active Navigation State on Scroll
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + 100; // Offset for better triggering

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Handle hero section (no ID on hero typically)
    if (scrollPosition < 200) {
        navLinks.forEach(link => link.classList.remove('active'));
    }
}

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// Initial check on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ===================================
// Intersection Observer for Animations
// ===================================

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

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe price cards
document.querySelectorAll('.price-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Observe stat cards
document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe testimonial cards
document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Observe showcase cards
document.querySelectorAll('.showcase-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `opacity 0.7s ease ${index * 0.2}s, transform 0.7s ease ${index * 0.2}s`;
    observer.observe(card);
});

// ===================================
// Parallax Effect for Hero Visual
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-device');

    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// Contact Form Handling
// ===================================

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = contactForm.querySelector('input[type="email"]').value;
    const button = contactForm.querySelector('button');
    const originalText = button.textContent;

    // Simulate form submission
    button.textContent = 'Starting...';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = '✓ Success!';
        button.style.background = '#28a745';

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
            contactForm.reset();
        }, 2000);
    }, 1500);

    // In production, you would send this to your backend
    // Email submission would be handled by your backend API
});

// ===================================
// Smooth Reveal for Technology Section
// ===================================

const techSection = document.querySelector('.technology');
const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nodes = entry.target.querySelectorAll('.tech-node');
            nodes.forEach((node, index) => {
                setTimeout(() => {
                    node.style.opacity = '1';
                    node.style.transform = 'scale(1)';
                    node.classList.add('animate');
                }, index * 200);
            });
        } else {
            // Pause animations when not visible to improve performance
            const nodes = entry.target.querySelectorAll('.tech-node');
            nodes.forEach(node => {
                node.classList.remove('animate');
            });
        }
    });
}, { threshold: 0.3 });

if (techSection) {
    // Set initial state
    document.querySelectorAll('.tech-node').forEach(node => {
        node.style.opacity = '0';
        node.style.transform = 'scale(0)';
        node.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    techObserver.observe(techSection);
}

// ===================================
// Dynamic Year in Footer
// ===================================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.textContent = `© ${currentYear} InkSync Pro. All rights reserved.`;
}

// ===================================
// Button Ripple Effect
// ===================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Preload Critical Resources
// ===================================

window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');

    // Trigger animations
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('animate');
    }
});

// ===================================
// Performance Optimization
// ===================================

// Lazy load images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Accessibility Enhancements
// ===================================

// Keyboard navigation for menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

// Focus management
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        // Trap focus in menu
        const firstFocusable = navMenu.querySelectorAll(focusableElements)[0];
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
});

// ===================================
// Animated Statistics Counters
// ===================================

const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            // Format number based on type
            if (element.textContent.includes('K+')) {
                element.textContent = Math.floor(current) + 'K+';
            } else if (element.textContent.includes('M+')) {
                element.textContent = (current / 1000).toFixed(1) + 'M+';
            } else if (element.textContent.includes('%')) {
                element.textContent = current.toFixed(1) + '%';
            } else if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current);
            }
            requestAnimationFrame(updateCounter);
        } else {
            // Set final value
            if (element.textContent.includes('K+')) {
                element.textContent = target + 'K+';
            } else if (element.textContent.includes('M+')) {
                element.textContent = (target / 1000).toFixed(1) + 'M+';
            } else if (element.textContent.includes('%')) {
                element.textContent = target + '%';
            } else if (element.textContent.includes('+')) {
                element.textContent = target + '+';
            } else {
                element.textContent = target;
            }
        }
    };

    updateCounter();
};

// Observe stat cards and animate counters
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;

            // Parse the number from the text
            let targetValue;
            if (text.includes('K+')) {
                targetValue = parseFloat(text.replace('K+', ''));
            } else if (text.includes('M+')) {
                targetValue = parseFloat(text.replace('M+', '')) * 1000;
            } else if (text.includes('%')) {
                targetValue = parseFloat(text.replace('%', ''));
            } else if (text.includes('+')) {
                targetValue = parseFloat(text.replace('+', ''));
            } else {
                targetValue = parseFloat(text);
            }

            animateCounter(statNumber, targetValue, 2000);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ===================================
// Enhanced Hero Text Reveal
// ===================================

window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');

    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }

    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 400);
    }

    if (heroCta) {
        heroCta.style.opacity = '0';
        heroCta.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroCta.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }, 600);
    }
});

// ===================================
// Smooth Scroll Progress Indicator
// ===================================

window.addEventListener('scroll', () => {
    const scrollProgress = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    // You can add a progress bar element if desired
    // For now, we'll use this for future enhancements
});

// ===================================
// Enhanced Button Interactions
// ===================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ===================================
// Console Branding
// ===================================

// ===================================
// Image Optimization & Lazy Loading
// ===================================

/**
 * Enhanced lazy loading for images
 * Uses Intersection Observer for better performance
 */
function initImageLazyLoading() {
    // Check if browser supports Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }

                    // Add loaded class for fade-in animation
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });

                    // Stop observing this image
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Start loading 50px before image enters viewport
            threshold: 0.01
        });

        // Observe all lazy-loading images
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.classList.add('loaded');
        });
    }
}

/**
 * Preload critical images for better performance
 */
function preloadCriticalImages() {
    const criticalImages = document.querySelectorAll('img[loading="eager"]');

    criticalImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
}

/**
 * Image error handling
 * Provides fallback for failed image loads
 */
function handleImageErrors() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('error', function() {
            // Add error class for custom styling if needed
            this.classList.add('img-error');
        });
    });
}

/**
 * Initialize all image optimization features
 */
function initImageOptimization() {
    preloadCriticalImages();
    initImageLazyLoading();
    handleImageErrors();
}

// Initialize image optimization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageOptimization);
} else {
    initImageOptimization();
}

// ===================================
// Console Branding
// ===================================

console.log(
    '%cInkSync Pro',
    'font-size: 24px; font-weight: bold; color: #0071e3; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);'
);
console.log(
    '%cBuilt with precision and care',
    'font-size: 12px; color: #6e6e73;'
);
console.log(
    '%cInterested in joining our team? We\'re hiring!',
    'font-size: 12px; color: #0071e3; font-weight: bold;'
);

// ===================================
// Premium Micro-Interactions
// ===================================

// Magnetic Button Effect
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const moveX = x * 0.15;
        const moveY = y * 0.15;

        this.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// 3D Card Tilt Effect
function addCardTiltEffect(selector) {
    document.querySelectorAll(selector).forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Apply tilt effect to cards
addCardTiltEffect('.feature-card');
addCardTiltEffect('.price-card');
addCardTiltEffect('.stat-card');
addCardTiltEffect('.testimonial-card');

// Toast Notification System
class ToastNotification {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        // Create toast container if it doesn't exist
        if (!document.querySelector('.toast-container')) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        } else {
            this.container = document.querySelector('.toast-container');
        }
    }

    show(options = {}) {
        const {
            type = 'info',
            title = '',
            message = '',
            duration = 3000
        } = options;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: '✓',
            error: '✕',
            warning: '!',
            info: 'i'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || 'i'}</div>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                ${message ? `<div class="toast-message">${message}</div>` : ''}
            </div>
            <button class="toast-close" aria-label="Close">×</button>
            <div class="toast-progress"></div>
        `;

        this.container.appendChild(toast);

        // Close button functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.hide(toast);
        });

        // Auto hide after duration
        if (duration > 0) {
            setTimeout(() => {
                this.hide(toast);
            }, duration);
        }

        return toast;
    }

    hide(toast) {
        toast.classList.add('toast-hiding');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }

    success(message, title = 'Success') {
        return this.show({ type: 'success', title, message });
    }

    error(message, title = 'Error') {
        return this.show({ type: 'error', title, message });
    }

    warning(message, title = 'Warning') {
        return this.show({ type: 'warning', title, message });
    }

    info(message, title = 'Info') {
        return this.show({ type: 'info', title, message });
    }
}

// Initialize toast system
window.toast = new ToastNotification();

// Enhanced Form Validation with Animations
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const inputs = this.querySelectorAll('.form-input, .form-textarea, .form-select');
        let isValid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                e.preventDefault();
                isValid = false;

                // Add error state with shake animation
                input.classList.add('error', 'shake');

                // Remove shake class after animation
                setTimeout(() => {
                    input.classList.remove('shake');
                }, 500);

                // Show error toast
                if (inputs[0] === input) { // Only show toast for first error
                    window.toast.error('Please fill in all required fields', 'Validation Error');
                }
            } else if (input.value.trim()) {
                // Add success state with bounce animation
                input.classList.remove('error');
                input.classList.add('success', 'bounce');

                setTimeout(() => {
                    input.classList.remove('bounce');
                }, 400);
            }
        });
    });
});

// Form Input Real-time Validation
document.querySelectorAll('.form-input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(this.value)) {
                this.classList.remove('error');
                this.classList.add('success', 'bounce');
                setTimeout(() => this.classList.remove('bounce'), 400);
            } else {
                this.classList.remove('success');
                this.classList.add('error', 'shake');
                setTimeout(() => this.classList.remove('shake'), 500);
            }
        }
    });
});

// Enhanced Checkbox/Radio Interactions
document.querySelectorAll('.form-checkbox input, .form-radio input').forEach(input => {
    input.addEventListener('change', function() {
        if (this.checked) {
            // Add a subtle haptic-style feedback
            const customEl = this.parentElement.querySelector('.form-checkbox-custom, .form-radio-custom');
            if (customEl) {
                customEl.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    customEl.style.transform = '';
                }, 200);
            }
        }
    });
});

// Toggle Switch Enhanced Interaction
document.querySelectorAll('.form-toggle input').forEach(toggle => {
    toggle.addEventListener('change', function() {
        const switchEl = this.parentElement.querySelector('.form-toggle-switch');
        if (switchEl) {
            // Add bounce effect
            switchEl.style.transform = 'scale(1.05)';
            setTimeout(() => {
                switchEl.style.transform = '';
            }, 200);
        }
    });
});

// Demo Button Interactions for UI Demo Section
document.querySelectorAll('.ui-demo .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        const buttonText = this.textContent.trim();

        if (buttonText.includes('Primary')) {
            window.toast.success('Primary action completed!', 'Success');
        } else if (buttonText.includes('Secondary')) {
            window.toast.info('Secondary action triggered', 'Information');
        } else if (buttonText.includes('Outline')) {
            window.toast.warning('This is a warning message', 'Warning');
        } else if (buttonText.includes('Small')) {
            window.toast.info('Small button clicked', 'Size: Small');
        } else if (buttonText.includes('Large')) {
            window.toast.info('Large button clicked', 'Size: Large');
        } else if (buttonText.includes('Normal')) {
            window.toast.success('Button in normal state', 'Normal');
        } else if (buttonText.includes('Submit')) {
            window.toast.success('Form would be submitted!', 'Demo Form');
        } else {
            window.toast.info('Button clicked!', 'Action');
        }
    });
});

// Enhanced Link Hover Effects
document.querySelectorAll('.showcase-link, .footer-section a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// Icon Button Rotation Effect
document.querySelectorAll('.btn-icon').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.toast.info('Icon button activated', 'Action');
    });
});

// Enhanced CTA Button Interaction
document.querySelectorAll('.hero-cta .btn, .pricing .btn, .contact .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Don't prevent default for anchor tags
        if (!this.hasAttribute('type')) {
            e.preventDefault();
        }

        // Add success animation
        const originalBg = this.style.background;
        this.classList.add('btn-success-state');

        setTimeout(() => {
            this.classList.remove('btn-success-state');
            this.style.background = originalBg;
        }, 500);

        // Show contextual toast
        const btnText = this.textContent.trim();
        if (btnText.includes('Trial') || btnText.includes('Started')) {
            window.toast.success('Great choice! Your trial is starting...', 'Welcome aboard!');
        } else if (btnText.includes('Learn More')) {
            window.toast.info('Exploring more features...', 'Let\'s dive in');
        } else if (btnText.includes('Contact')) {
            window.toast.info('Opening contact form...', 'Get in touch');
        }
    });
});

// Smooth Button Group Transitions
document.querySelectorAll('.btn-group-attached .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        // Remove active class from siblings
        this.parentElement.querySelectorAll('.btn').forEach(sibling => {
            sibling.style.background = '';
            sibling.style.color = '';
        });

        // Add active style
        this.style.background = 'var(--color-primary)';
        this.style.color = 'white';

        window.toast.info(`Selected: ${this.textContent}`, 'Button Group');
    });
});

// Feature Card Icon Enhanced Animation
document.querySelectorAll('.feature-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// Pricing Card Interactive Feedback
document.querySelectorAll('.price-card').forEach(card => {
    card.addEventListener('click', function() {
        // Highlight selected card
        document.querySelectorAll('.price-card').forEach(c => {
            c.style.borderColor = '';
        });

        this.style.borderColor = 'var(--color-primary)';
        this.style.borderWidth = '3px';

        const planName = this.querySelector('h3').textContent;
        window.toast.success(`${planName} plan selected!`, 'Great choice!');
    });
});

// Statistics Counter Enhanced with Interaction
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('click', function() {
        const statLabel = this.querySelector('.stat-label').textContent;
        window.toast.info(`Viewing details for ${statLabel}`, 'Statistics');
    });
});

// Testimonial Card Interaction
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('click', function() {
        const authorName = this.querySelector('.author-name').textContent;
        window.toast.info(`Read full story from ${authorName}`, 'Testimonial');
    });
});

// Navigation Link Active State Enhancement
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        // Remove active class from all links
        document.querySelectorAll('.nav-menu a').forEach(l => {
            l.style.fontWeight = '';
            l.style.color = '';
        });

        // Add active style
        this.style.fontWeight = 'var(--font-weight-semibold)';
        this.style.color = 'var(--color-primary)';
    });
});

// Enhanced Form Demo
const demoForm = document.querySelector('.demo-form');
if (demoForm) {
    demoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simulate form processing
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.classList.remove('btn-loading');
            submitBtn.classList.add('btn-success-state');
            submitBtn.textContent = '✓ Submitted!';

            window.toast.success('Your form has been submitted successfully!', 'Success!');

            setTimeout(() => {
                submitBtn.classList.remove('btn-success-state');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 2000);
        }, 1500);
    });

    demoForm.addEventListener('reset', function(e) {
        window.toast.info('Form has been reset', 'Reset');
    });
}

// Show welcome toast on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        window.toast.success('Welcome to InkSync Pro! Explore our premium micro-interactions.', 'Premium Experience', 5000);
    }, 1000);
});

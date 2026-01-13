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
        button.style.background = '#3b82f6';

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

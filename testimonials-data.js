/**
 * Testimonials Data
 * Customer testimonials for InkSync Pro
 * This file contains seeded testimonial data for initial display
 */

const testimonialsData = [
    {
        id: 1,
        text: "InkSync Pro has transformed how our design team collaborates. The real-time sync is flawless, and we've never lost a single stroke of work.",
        author: {
            name: "Sarah Mitchell",
            role: "Creative Director, DesignLab",
            initials: "SM"
        },
        featured: false
    },
    {
        id: 2,
        text: "The version control feature saved my project when I needed to revisit an earlier concept. InkSync Pro is an essential tool for any serious digital artist.",
        author: {
            name: "James Chen",
            role: "Digital Illustrator",
            initials: "JC"
        },
        featured: true
    },
    {
        id: 3,
        text: "I can start sketching on my iPad during my commute and seamlessly continue on my desktop at the studio. It's magic.",
        author: {
            name: "Emily Parker",
            role: "UX Designer, TechFlow",
            initials: "EP"
        },
        featured: false
    },
    {
        id: 4,
        text: "As an architecture firm, precision is everything. InkSync Pro's pressure sensitivity and layer management make technical drawings a breeze. We've increased our productivity by 40%.",
        author: {
            name: "Marcus Rodriguez",
            role: "Lead Architect, Studio Verde",
            initials: "MR"
        },
        featured: false
    },
    {
        id: 5,
        text: "Teaching digital art has never been easier. I can demonstrate techniques in real-time while my students follow along on their devices. The cloud sync means no more USB drives!",
        author: {
            name: "Dr. Lisa Thompson",
            role: "Professor of Digital Arts, State University",
            initials: "LT"
        },
        featured: false
    },
    {
        id: 6,
        text: "I switched from three different apps to just InkSync Pro. The unified workflow saved me countless hours and the cross-platform support is unmatched. Best investment I've made for my freelance business.",
        author: {
            name: "Raj Patel",
            role: "Freelance Graphic Designer",
            initials: "RP"
        },
        featured: false
    },
    {
        id: 7,
        text: "Our animation studio relies on InkSync Pro for storyboarding and concept art. The collaborative features let our teams in New York and Tokyo work together seamlessly. It's a game-changer.",
        author: {
            name: "Yuki Tanaka",
            role: "Animation Director, Pixel Studios",
            initials: "YT"
        },
        featured: false
    },
    {
        id: 8,
        text: "The intuitive interface means my clients can review and annotate designs directly. InkSync Pro has cut our revision cycles in half and improved client satisfaction dramatically.",
        author: {
            name: "Alexandra Foster",
            role: "Brand Consultant, Foster & Co",
            initials: "AF"
        },
        featured: false
    }
];

/**
 * Get all testimonials
 * @returns {Array} Array of testimonial objects
 */
function getAllTestimonials() {
    return testimonialsData;
}

/**
 * Get featured testimonial
 * @returns {Object} Featured testimonial object
 */
function getFeaturedTestimonial() {
    return testimonialsData.find(t => t.featured) || testimonialsData[0];
}

/**
 * Get testimonials by count
 * @param {number} count - Number of testimonials to return
 * @returns {Array} Array of testimonial objects
 */
function getTestimonials(count = 3) {
    return testimonialsData.slice(0, count);
}

/**
 * Render testimonials to the DOM
 * @param {string} containerId - ID of the container element
 * @param {number} count - Number of testimonials to display (default: all)
 */
function renderTestimonials(containerId = 'testimonials-grid', count = null) {
    const container = document.getElementById(containerId) || document.querySelector('.testimonials-grid');

    if (!container) {
        console.warn('Testimonials container not found');
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Get testimonials to display
    const testimonials = count ? getTestimonials(count) : getAllTestimonials();

    // Create testimonial cards
    testimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = `testimonial-card${testimonial.featured ? ' featured-testimonial' : ''}`;

        card.innerHTML = `
            <div class="testimonial-quote">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                </svg>
            </div>
            <p class="testimonial-text">
                ${testimonial.text}
            </p>
            <div class="testimonial-author">
                <div class="author-avatar">${testimonial.author.initials}</div>
                <div class="author-info">
                    <div class="author-name">${testimonial.author.name}</div>
                    <div class="author-role">${testimonial.author.role}</div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    // Trigger intersection observer for animations if available
    if (typeof observer !== 'undefined') {
        container.querySelectorAll('.testimonial-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
            observer.observe(card);
        });
    }
}

// Auto-render on DOM load if container exists
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderTestimonials();
    });
} else {
    renderTestimonials();
}

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testimonialsData,
        getAllTestimonials,
        getFeaturedTestimonial,
        getTestimonials,
        renderTestimonials
    };
}

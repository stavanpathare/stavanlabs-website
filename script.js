// ========================================
// SMOOTH SCROLL & NAVIGATION
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// SCROLL ANIMATIONS & REVEAL ON SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Add reveal class to sections
document.querySelectorAll('.about, .technologies, .projects, .contact').forEach(section => {
    section.classList.add('reveal');
    revealObserver.observe(section);
});

// ========================================
// MOUSE FOLLOW GLOW EFFECT
// ========================================
const glowCursor = document.querySelector('.glow-cursor');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    glowCursor.style.left = mouseX - 100 + 'px';
    glowCursor.style.top = mouseY - 100 + 'px';
    glowCursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
    glowCursor.style.display = 'none';
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 0 30px rgba(14, 165, 233, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.7)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ========================================
// BUTTON INTERACTIONS
// ========================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// CONTACT FORM HANDLING
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            const submitBtn = contactForm.querySelector('.btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            submitBtn.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.4)';
            
            // Reset form
            contactForm.reset();
            
            // Restore button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.style.boxShadow = '';
            }, 3000);
        }
    });
}

// ========================================
// MODAL POPUP FUNCTIONALITY
// ========================================
const readMoreBtn = document.getElementById('readMoreBtn');
const aboutModal = document.getElementById('aboutModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

const toggleModal = (open) => {
    if (open) {
        aboutModal.classList.add('is-open');
        aboutModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    } else {
        aboutModal.classList.remove('is-open');
        aboutModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }
};

if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => toggleModal(true));
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => toggleModal(false));
}

aboutModal.addEventListener('click', (event) => {
    if (event.target === aboutModal) {
        toggleModal(false);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && aboutModal.classList.contains('is-open')) {
        toggleModal(false);
    }
});

// ========================================
// CARD TILT EFFECT
// ========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// ========================================
// SCROLL INDICATOR
// ========================================
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
        scrollIndicator.style.transition = 'opacity 0.3s ease';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});

// ========================================
// TECH CARD GLOW ON HOVER
// ========================================
const techCards = document.querySelectorAll('.tech-card');

techCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.tech-icon');
        icon.style.filter = 'drop-shadow(0 0 30px rgba(14, 165, 233, 0.6))';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.tech-icon');
        icon.style.filter = 'drop-shadow(0 0 20px rgba(14, 165, 233, 0.4))';
    });
});

// ========================================
// STAT CARDS COUNTER ANIMATION
// ========================================
const statCards = document.querySelectorAll('.stat-card');
let countersRun = false;

const runCounters = () => {
    statCards.forEach(card => {
        const numberElement = card.querySelector('.stat-number');
        const text = numberElement.textContent;
        
        // Skip animation for non-numeric values
        if (text === '∞' || !text.match(/^\d+/)) {
            return;
        }
        
        const target = parseInt(text);
        const increment = Math.ceil(target / 20);
        let current = 0;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                numberElement.textContent = text;
                clearInterval(counter);
            } else {
                numberElement.textContent = current + '+';
            }
        }, 30);
    });
};

// Run counters when stat cards are visible
window.addEventListener('scroll', () => {
    if (!countersRun) {
        const rect = statCards[0]?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight) {
            runCounters();
            countersRun = true;
        }
    }
});

// ========================================
// FLOATING PARTICLES BACKGROUND (Optional Enhancement)
// ========================================
function createFloatingParticles() {
    const particleCount = 20;
    const container = document.querySelector('body');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(14, 165, 233, ${Math.random() * 0.3})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        
        container.appendChild(particle);
    }
}

// Optional: Uncomment to enable floating particles
// createFloatingParticles();

// ========================================
// LIGHT MODE / DARK MODE TOGGLE (Optional)
// ========================================
function initThemeToggle() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDark.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.add('light-mode');
    }
    
    prefersDark.addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        }
    });
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
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

// Lazy load images (future enhancement)
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Add skip to main content functionality
    if (e.key === '/' && e.ctrlKey) {
        document.querySelector('.hero').focus();
    }
});

// ========================================
// INITIALIZATION
// ========================================

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Stavan Labs website loaded successfully!');
    
    // Add transition classes to animated elements
    document.querySelectorAll('.hero-title, .hero-description, .hero-buttons').forEach((el, index) => {
        el.style.animation = `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s both`;
    });
});

// ========================================
// EXPORT FOR EXTERNAL USE
// ========================================
window.stavanlabs = {
    scrollToSection: (sectionId) => {
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },
    toggleMobileMenu: () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
};

// Log to console for debugging
console.log('%cStavan Labs', 'color: #0ea5e9; font-size: 20px; font-weight: bold;');
console.log('%cBuilding modern web applications.', 'color: #cbd5e1; font-size: 14px;');

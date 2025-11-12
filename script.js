// Language Toggle Functionality
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSavedLanguage();
    }

    bindEvents() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && savedLang !== this.currentLang) {
            this.switchLanguage(savedLang);
        }
    }

    switchLanguage(lang) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        this.updateLanguageButtons();
        this.updatePageContent();
        this.saveLanguagePreference();
        this.updateDocumentLang();
    }

    updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    }

    updatePageContent() {
        // Update all elements with data attributes
        const elements = document.querySelectorAll('[data-en][data-de]');
        elements.forEach(element => {
            const text = element.dataset[this.currentLang];
            if (text) {
                // Add fade effect
                element.style.opacity = '0';
                setTimeout(() => {
                    element.textContent = text;
                    element.style.opacity = '1';
                }, 150);
            }
        });

        // Update form placeholders
        this.updateFormPlaceholders();
        
        // Update page title
        this.updatePageTitle();
    }

    updateFormPlaceholders() {
        const formInputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
        formInputs.forEach(input => {
            const currentPlaceholder = input.placeholder;
            if (this.currentLang === 'de') {
                // German placeholders
                if (currentPlaceholder.includes('Name')) input.placeholder = 'Name';
                if (currentPlaceholder.includes('Email')) input.placeholder = 'E-Mail';
                if (currentPlaceholder.includes('Phone')) input.placeholder = 'Telefon';
                if (currentPlaceholder.includes('Message')) input.placeholder = 'Nachricht';
            } else {
                // English placeholders
                if (currentPlaceholder === 'Name') input.placeholder = 'Name';
                if (currentPlaceholder === 'E-Mail') input.placeholder = 'Email';
                if (currentPlaceholder === 'Telefon') input.placeholder = 'Phone';
                if (currentPlaceholder === 'Nachricht') input.placeholder = 'Message';
            }
        });
    }

    updatePageTitle() {
        const titles = {
            en: 'UMANG - Adding Life to Years | Senior Day Care Center Pune',
            de: 'UMANG - Leben den Jahren hinzufügen | Seniorentagesstätte Pune'
        };
        document.title = titles[this.currentLang];
    }

    updateDocumentLang() {
        document.documentElement.lang = this.currentLang;
    }

    saveLanguagePreference() {
        localStorage.setItem('preferredLanguage', this.currentLang);
    }
}

// Mobile Navigation
class MobileNav {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                this.toggleMenu(hamburger, navMenu);
            });

            // Close menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMenu(hamburger, navMenu);
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    this.closeMenu(hamburger, navMenu);
                }
            });
        }
    }

    toggleMenu(hamburger, navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    closeMenu(hamburger, navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Form Handling
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const visitForm = document.getElementById('visitForm');
        if (visitForm) {
            visitForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(visitForm);
            });
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = this.getLoadingText();
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showSuccessMessage();
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    getLoadingText() {
        const lang = document.documentElement.lang || 'en';
        return lang === 'de' ? 'Wird gesendet...' : 'Sending...';
    }

    showSuccessMessage() {
        const lang = document.documentElement.lang || 'en';
        const message = lang === 'de' 
            ? 'Vielen Dank! Wir werden uns bald bei Ihnen melden.'
            : 'Thank you! We will contact you soon.';

        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color, #7A9D7A);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            z-index: 1001;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createObserver();
        this.observeElements();
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    observeElements() {
        const elementsToAnimate = document.querySelectorAll(
            '.service-card, .activity-item, .contact-item, .about-text, .about-image'
        );
        
        elementsToAnimate.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.style.background = 'rgba(253, 248, 243, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(139, 69, 19, 0.1)';
        } else {
            navbar.style.background = 'rgba(253, 248, 243, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
}

// Add CSS animations
const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        .success-notification {
            font-family: var(--font-primary, 'Inter', sans-serif);
            font-weight: 500;
        }

        /* Initial state for scroll animations */
        .service-card,
        .activity-item,
        .contact-item,
        .about-text,
        .about-image {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }

        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
};

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add animation styles first
    addAnimationStyles();
    
    // Initialize all components
    new LanguageManager();
    new MobileNav();
    new SmoothScroll();
    new FormHandler();
    new ScrollAnimations();
    new NavbarScroll();
    new FAQAccordion();
    
    // Add some interactive enhancements
    addInteractiveEnhancements();
});

// Additional interactive enhancements
function addInteractiveEnhancements() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Utility function for debouncing
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

// Add resize handler for responsive behavior
window.addEventListener('resize', debounce(() => {
    // Handle any resize-specific logic here
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        // Reset mobile menu state on desktop
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    }
}, 250));

// FAQ Accordion Functionality
class FAQAccordion {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                this.toggleFAQ(question);
            });
        });
    }

    toggleFAQ(clickedQuestion) {
        const faqItem = clickedQuestion.parentElement;
        const faqAnswer = faqItem.querySelector('.faq-answer');
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        const allFAQItems = document.querySelectorAll('.faq-item');
        allFAQItems.forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });

        // Toggle the clicked item
        if (isActive) {
            faqItem.classList.remove('active');
        } else {
            faqItem.classList.add('active');
        }
    }
}
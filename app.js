// Max&Max Srls Landing Page JavaScript - Fixed Navigation

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        
        // Initialize all functionality
        initNavigation();
        initMobileMenu();
        initContactForm();
        initScrollEffects();
        initAnimations();
        
        console.log('Max&Max Srls Landing Page initialized successfully');
    });

    // Navigation functionality
    function initNavigation() {
        // Get all links that start with #
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Handle hash navigation on page load
        if (window.location.hash) {
            setTimeout(function() {
                const targetElement = document.querySelector(window.location.hash);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }

    // Mobile menu functionality
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav');
        
        if (mobileMenuToggle && nav) {
            mobileMenuToggle.addEventListener('click', function() {
                nav.classList.toggle('nav--open');
                mobileMenuToggle.classList.toggle('mobile-menu-toggle--open');
            });
        }
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const nav = document.querySelector('.nav');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (nav && nav.classList.contains('nav--open')) {
                if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    closeMobileMenu();
                }
            }
        });
    }

    function closeMobileMenu() {
        const nav = document.querySelector('.nav');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (nav) nav.classList.remove('nav--open');
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('mobile-menu-toggle--open');
    }

    // Contact form functionality
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const nome = formData.get('nome').trim();
            const email = formData.get('email').trim();
            const telefono = formData.get('telefono').trim();
            const messaggio = formData.get('messaggio').trim();
            
            // Validation
            if (!nome || !email || !messaggio) {
                showStatusMessage('Per favore compila tutti i campi obbligatori.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showStatusMessage('Per favore inserisci un indirizzo email valido.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.classList.add('btn--loading');
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(function() {
                // Reset button state
                submitButton.classList.remove('btn--loading');
                submitButton.disabled = false;
                
                // Show success message
                showStatusMessage(
                    'Grazie per il tuo messaggio! Ti contatteremo al più presto per fornirti tutte le informazioni richieste.',
                    'success'
                );
                
                // Reset form
                contactForm.reset();
                
                // Open email client
                const subject = encodeURIComponent('Richiesta informazioni - Scatole per Pizza');
                const body = encodeURIComponent(`Nome: ${nome}\nTelefono: ${telefono}\n\nMessaggio:\n${messaggio}`);
                const mailtoLink = `mailto:info@scatoleperpizza.it?subject=${subject}&body=${body}`;
                window.open(mailtoLink);
                
            }, 1500);
        });
        
        // Phone number formatting
        const phoneField = document.getElementById('telefono');
        if (phoneField) {
            phoneField.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    if (value.startsWith('39')) {
                        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
                    } else if (value.length === 10) {
                        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
                    } else if (value.length > 6) {
                        value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3');
                    } else if (value.length > 3) {
                        value = value.replace(/(\d{3})(\d+)/, '$1 $2');
                    }
                }
                
                e.target.value = value;
            });
        }
        
        // Real-time validation
        const formFields = contactForm.querySelectorAll('.form-control');
        formFields.forEach(function(field) {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('form-control--error')) {
                    this.classList.remove('form-control--error');
                }
            });
        });
    }

    // Scroll effects
    function initScrollEffects() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (header) {
                if (scrollTop > 50) {
                    header.classList.add('header--scrolled');
                } else {
                    header.classList.remove('header--scrolled');
                }
            }
        });
    }

    // Animation on scroll
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        const animateElements = document.querySelectorAll('.product-card, .advantage-item, .sustainability-feature');
        animateElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        if (field.required && !value) {
            isValid = false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
        }
        
        if (!isValid) {
            field.classList.add('form-control--error');
        } else {
            field.classList.remove('form-control--error');
        }
        
        return isValid;
    }

    function showStatusMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.status-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const statusMessage = document.createElement('div');
        statusMessage.className = `status-message status-message--${type}`;
        statusMessage.textContent = message;
        
        // Insert after form
        const form = document.getElementById('contactForm');
        if (form && form.parentNode) {
            form.parentNode.insertBefore(statusMessage, form.nextSibling);
            
            // Scroll to message
            statusMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Auto remove
        const timeout = type === 'success' ? 8000 : 10000;
        setTimeout(function() {
            if (statusMessage.parentNode) {
                statusMessage.remove();
            }
        }, timeout);
    }

    // Add additional styles
    const additionalStyles = `
        html {
            scroll-behavior: smooth;
        }

        .header--scrolled {
            background-color: rgba(255, 255, 253, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--color-border);
        }

        .nav--open {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--color-surface);
            border: 1px solid var(--color-border);
            border-top: none;
            padding: var(--space-16);
            box-shadow: var(--shadow-lg);
            z-index: 999;
        }

        .mobile-menu-toggle--open span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-toggle--open span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-toggle--open span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }

        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .form-control--error {
            border-color: var(--color-error) !important;
            box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1) !important;
        }

        .btn {
            transition: all var(--duration-normal) var(--ease-standard);
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }

        .btn:active {
            transform: translateY(0);
        }

        .product-card,
        .advantage-item {
            transition: all var(--duration-normal) var(--ease-standard);
        }

        @media (max-width: 768px) {
            .nav--open {
                gap: var(--space-16);
            }
            
            .nav--open .nav-link {
                padding: var(--space-12);
                border-bottom: 1px solid var(--color-border);
                text-align: center;
            }
            
            .nav--open .nav-link:last-child {
                border-bottom: none;
            }

            .hero {
                margin-top: 60px;
            }
        }
    `;

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);

})();
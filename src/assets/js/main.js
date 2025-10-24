/**
 * Portfolio Website - Main JavaScript (Apple-Inspired)
 * Author: Vepada Venkatesh
 * Description: Sophisticated vanilla JavaScript for premium interactive features
 */

(function() {
    'use strict';

    // ===================================
    // Utility Functions
    // ===================================
    const lerp = (start, end, factor) => start + (end - start) * factor;
    
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    const initMobileNav = () => {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav__link');

        if (!navToggle || !navMenu) return;

        // Toggle mobile menu with smooth animation
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    };

    // ===================================
    // Smooth Scroll Effects with Parallax
    // ===================================
    const initScrollEffects = () => {
        const header = document.getElementById('header');
        const scrollTopBtn = document.getElementById('scroll-top');
        let lastScroll = 0;

        if (!header || !scrollTopBtn) return;

        const handleScroll = () => {
            const currentScroll = window.scrollY;
            
            // Header background and shadow on scroll
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Show/hide scroll to top button with fade
            if (currentScroll > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
            
            lastScroll = currentScroll;
        };

        // Use requestAnimationFrame for smooth performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Smooth scroll to top with easing
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // ===================================
    // Active Navigation Link
    // ===================================
    const initActiveNavLink = () => {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav__link');

        if (sections.length === 0 || navLinks.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-20% 0px -80% 0px' }); // Activates when section is in the middle 20% of the viewport

        sections.forEach(section => {
            observer.observe(section);
        });
    };

    // ===================================
    // Smooth Scroll for Navigation Links
    // ===================================
    const initSmoothScroll = () => {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    e.preventDefault();
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20; // Added 20px offset

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // ===================================
    // Enhanced Scroll Reveal with Intersection Observer
    // ===================================
    const initScrollReveal = () => {
        const animatedElements = document.querySelectorAll('[data-animation]');
        
        if (animatedElements.length === 0) return;

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger animation when element comes into view
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach((el) => {
            // Set initial state for all animated elements
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Observe each element
            observer.observe(el);
        });
    };

    // ===================================
    // Card 3D Tilt Effect
    // ===================================
    const init3DTiltCards = () => {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transition = 'transform 0.1s linear'; // Smooth follow
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)'; // Reset transition
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            });
        });
    };

    // ===================================
    // Dynamic Copyright Year
    // ===================================
    const updateCopyrightYear = () => {
        const yearElement = document.querySelector('.footer__text');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.textContent = `© ${currentYear} Vepada Venkatesh. All RightsReserved.`;
        }
    };
    
    // ===================================
    // Contact Form AJAX Submission
    // ===================================
    const initContactForm = () => {
        const form = document.querySelector('.contact__form');
        if (!form) return;

        const successMessage = form.querySelector('.form__success');
        const errorMessage = form.querySelector('.form__error');
        const submitButton = form.querySelector('.form__button');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            const formData = new FormData(form);
            const action = form.getAttribute('action');
            
            fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Show success
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    form.reset();
                } else {
                    // Show error
                    successMessage.style.display = 'none';
                    errorMessage.style.display = 'block';
                }
            }).catch(error => {
                // Show network error
                successMessage.style.display = 'none';
                errorMessage.style.display = 'block';
                console.error('Form submission error:', error);
            }).finally(() => {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
                
                // Hide messages after a few seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    errorMessage.style.display = 'none';
                }, 5000);
            });
        });
    };

    // ===================================
    // Prevent Animation on Page Load
    // ===================================
    const preventLoadAnimations = () => {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    };

    // ===================================
    // Initialize All Functions
    // ===================================
    const init = () => {
        initMobileNav();
        initScrollEffects();
        initActiveNavLink();
        initSmoothScroll();
        initScrollReveal();
        init3DTiltCards();
        updateCopyrightYear();
        preventLoadAnimations();
        initContactForm(); 
        
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    };

    // ===================================
    // Run on DOM Content Loaded
    // ===================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
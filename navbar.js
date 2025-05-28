(function() {
    'use strict';
    
    // Enhanced navbar scroll effects
    document.addEventListener('DOMContentLoaded', function() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('#nav-elements a');
        
        // Add scroll effect to navbar
        function handleScroll() {
            if (window.scrollY > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
        }
        
        // Throttle scroll events for better performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function() {
                    handleScroll();
                    scrollTimeout = null;
                }, 10);
            }
        });
        
        // Add active state to current page link
        function setActiveNavLink() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                const linkHref = link.getAttribute('href');
                if (!linkHref) return;
                
                const linkPage = linkHref.split('#')[0] || 'index.html';
                
                // Check for exact page matches
                if (linkPage === currentPage || 
                    (currentPage === '' && linkPage === 'index.html') ||
                    (currentPage === 'index.html' && linkPage === 'index.html')) {
                    link.classList.add('active');
                }
                
                // Handle projects link for project pages
                if (linkHref.includes('#projects') && 
                    (currentPage.includes('KOMMA') || 
                     currentPage.includes('ATT') || 
                     currentPage.includes('SellMax') || 
                     currentPage.includes('Prommuni'))) {
                    link.classList.add('active');
                }
                
                // Handle about page
                if (linkPage === 'about.html' && currentPage === 'about.html') {
                    link.classList.add('active');
                }
                
                // Handle contact page
                if (linkPage === 'contact.html' && currentPage === 'contact.html') {
                    link.classList.add('active');
                }
            });
        }
        
        // Set active link on page load
        setActiveNavLink();
        
        // Smooth scroll for anchor links
        function initSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    
                    // Skip if it's just a hash
                    if (href === '#') return;
                    
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        const navbarHeight = navbar?.offsetHeight || 80;
                        const offsetTop = target.offsetTop - navbarHeight - 20;
                        
                        window.scrollTo({
                            top: Math.max(0, offsetTop),
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
        
        // Initialize smooth scroll
        initSmoothScroll();
        
        // Handle initial scroll position
        handleScroll();
        
        // Optional: Add intersection observer for section-based active states
        function initSectionObserver() {
            const sections = document.querySelectorAll('section[id], div[id]');
            
            if (sections.length === 0) return;
            
            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -80% 0px',
                threshold: 0
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        const correspondingLink = document.querySelector(`a[href="#${id}"]`);
                        
                        if (correspondingLink) {
                            // Remove active from all nav links
                            navLinks.forEach(link => {
                                if (link.getAttribute('href')?.startsWith('#')) {
                                    link.classList.remove('active');
                                }
                            });
                            
                            // Add active to current section link
                            correspondingLink.classList.add('active');
                        }
                    }
                });
            }, observerOptions);
            
            sections.forEach(section => {
                observer.observe(section);
            });
        }
        
        // Initialize section observer for single-page navigation
        initSectionObserver();
    });
    
    // Handle page visibility changes for performance
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden, pause any animations if needed
        } else {
            // Page is visible, resume animations
        }
    });
    
})();
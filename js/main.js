// Shagun Mart - Ultra Modern Interactive JavaScript

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Detect if device is mobile/touch
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.matchMedia("(max-width: 768px)").matches);
    
    // Add glass morphism effects to selected cards - only for non-touch devices
    const glassCards = document.querySelectorAll('.glass-card');
    
    if (!isMobile) {
        // Desktop effects
        glassCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate rotation based on mouse position
                const middleX = rect.width / 2;
                const middleY = rect.height / 2;
                const offsetX = ((x - middleX) / middleX) * 5;
                const offsetY = ((y - middleY) / middleY) * 5;
                
                // Apply 3D rotation effect
                card.style.transform = `perspective(1000px) rotateX(${-offsetY}deg) rotateY(${offsetX}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Add subtle color highlight based on position
                const gradientX = (x / rect.width) * 100;
                const gradientY = (y / rect.height) * 100;
                card.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.background = 'rgba(255, 255, 255, 0.7)';
            });
        });
    } else {
        // Mobile touch effects
        glassCards.forEach(card => {
            card.addEventListener('touchstart', function(e) {
                this.classList.add('touch-active');
            }, {passive: true});
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 200);
            }, {passive: true});
        });
    }
    
    // Set animation delays for nav items
    const navItems = document.querySelectorAll('.nav__item');
    navItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    // Set animation delays for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });
    
    // Mobile Navigation Menu with smooth transitions
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            // Toggle navigation
            nav.classList.toggle('is-active');
            navToggle.classList.toggle('is-active');
            
            // Prevent body scrolling when menu is open
            document.body.classList.toggle('nav-open');
        });
        
        // Close nav when tapping outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('nav--visible') && 
                !nav.contains(e.target) && 
                !navToggle.contains(e.target)) {
                nav.classList.remove('nav--visible');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('nav--visible');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
    
    // Add dynamic text gradient animations
    const textGradients = document.querySelectorAll('.text-gradient-primary, .text-gradient-accent, .text-gradient-tertiary');
    textGradients.forEach(text => {
        const randomDelay = Math.random() * 5;
        text.style.animationDelay = `${randomDelay}s`;
    });
    
    // Shrink header on scroll with parallax effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide header based on scroll direction (hide on scroll down, show on scroll up)
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // FAQ Accordion functionality with smooth animations
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                        }
                    }
                });
                
                // Toggle current FAQ
                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    // Add a subtle animation to the open FAQ
                    item.style.transform = 'translateY(-5px)';
                    item.style.boxShadow = 'var(--shadow-lg)';
                } else {
                    answer.style.maxHeight = '0';
                    item.style.transform = 'translateY(0)';
                    item.style.boxShadow = 'var(--shadow)';
                }
            });
        }
    });
    
    // Product filtering in catalog page with advanced transitions
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Create ripple effect on button click
                const ripple = document.createElement('span');
                ripple.classList.add('filter-btn-ripple');
                this.appendChild(ripple);
                
                // Remove ripple after animation completes
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Remove active class from all buttons and add to the clicked one
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide products based on filter with staggered animation
                productCards.forEach((card, index) => {
                    card.classList.add('filtering');
                    
                    setTimeout(() => {
                        if (filterValue === 'all') {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0) scale(1)';
                            }, index * 50);
                        } else {
                            if (card.getAttribute('data-category') === filterValue) {
                                card.style.display = 'block';
                                setTimeout(() => {
                                    card.style.opacity = '1';
                                    card.style.transform = 'translateY(0) scale(1)';
                                }, index * 50);
                            } else {
                                card.style.opacity = '0';
                                card.style.transform = 'translateY(20px) scale(0.95)';
                                setTimeout(() => {
                                    card.style.display = 'none';
                                }, 300);
                            }
                        }
                        
                        setTimeout(() => {
                            card.classList.remove('filtering');
                        }, 350);
                    }, 100);
                });
            });
        });
    }
    
    // Animate elements when they enter the viewport with staggered effect
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element position
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
    
    // Enhanced parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero__content');
    const heroImage = document.querySelector('.hero__image');
    const heroShapes = document.querySelectorAll('.hero-shape');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrollTop < heroSection.offsetHeight) {
                // Move content and image at different speeds
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrollTop * 0.2}px)`;
                    heroContent.style.opacity = 1 - (scrollTop * 0.002);
                }
                
                if (heroImage) {
                    heroImage.style.transform = `perspective(1000px) rotateY(${-8 + scrollTop * 0.01}deg) rotateX(${5 - scrollTop * 0.01}deg) translateY(${scrollTop * 0.1}px)`;
                }
                
                // Move decorative shapes for additional effect
                heroShapes.forEach((shape, index) => {
                    const speed = 0.05 + (index * 0.03);
                    const direction = index % 2 === 0 ? 1 : -1;
                    shape.style.transform = `translate(${scrollTop * speed * direction}px, ${scrollTop * speed}px)`;
                });
            }
        });
    }
    
    // Add hover/touch effects to category cards for mobile
    categoryCards.forEach(card => {
        // Add 3D tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;
            
            card.style.transform = `perspective(1000px) rotateY(${percentX * 5}deg) rotateX(${-percentY * 5}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
        
        // For touch devices
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-hover');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-hover');
            }, 500);
        });
    });
    
    // Add interactive button effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create a subtle highlight effect that follows the cursor
            btn.style.setProperty('--btn-highlight-x', `${x}px`);
            btn.style.setProperty('--btn-highlight-y', `${y}px`);
        });
        
        // Add click effect
        btn.addEventListener('click', function(e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            btn.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add subtle pulsing animations to WhatsApp buttons
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn');
    whatsappBtns.forEach(btn => {
        setInterval(() => {
            btn.classList.add('pulse');
            setTimeout(() => {
                btn.classList.remove('pulse');
            }, 1000);
        }, 7000);
    });

    // Add gradient wave to footer with more dynamic effect
    const footer = document.querySelector('footer');
    if (footer) {
        // Create footer wave element
        const footerWave = document.createElement('div');
        footerWave.className = 'footer-wave';
        footerWave.innerHTML = `
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
            </svg>
        `;
        footer.prepend(footerWave);
        
        // Make wave respond to mouse movement
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const wave = footerWave.querySelector('svg');
            if (wave) {
                wave.style.transform = `rotateY(${180 + mouseX * 5}deg) scale(${1 + mouseX * 0.05})`;
            }
        });
    }

    // Enhanced back-to-top button with animation
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    `;
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back-to-top button based on scroll position with animation
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top with easing
    backToTopBtn.addEventListener('click', function() {
        // Create smooth scrolling animation
        const scrollToTop = () => {
            const currentPosition = window.pageYOffset;
            if (currentPosition > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, currentPosition - currentPosition / 8);
            }
        };
        scrollToTop();
    });
    
    // Add animated button ripple effect styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .btn-ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .filter-btn-ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            transform: translate(-50%, -50%) scale(0);
            border-radius: inherit;
            background: rgba(255, 51, 102, 0.15);
            animation: filterRipple 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes filterRipple {
            to {
                transform: translate(-50%, -50%) scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Add cursor effects (optional, uncomment to enable)
    // const cursor = document.createElement('div');
    // cursor.className = 'custom-cursor';
    // document.body.appendChild(cursor);
    // 
    // document.addEventListener('mousemove', (e) => {
    //     cursor.style.left = `${e.clientX}px`;
    //     cursor.style.top = `${e.clientY}px`;
    // });
    // 
    // const cursorStyle = document.createElement('style');
    // cursorStyle.textContent = `
    //     .custom-cursor {
    //         position: fixed;
    //         width: 20px;
    //         height: 20px;
    //         border-radius: 50%;
    //         background: rgba(255, 51, 102, 0.4);
    //         mix-blend-mode: difference;
    //         pointer-events: none;
    //         transform: translate(-50%, -50%);
    //         z-index: 9999;
    //         transition: transform 0.1s ease;
    //     }
    //     
    //     a:hover ~ .custom-cursor,
    //     button:hover ~ .custom-cursor {
    //         transform: translate(-50%, -50%) scale(1.5);
    //     }
    // `;
    // document.head.appendChild(cursorStyle);
});
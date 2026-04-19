document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------
       1. STICKY NAVBAR & MOBILE MENU
       ----------------------------------------- */
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const closeBtn = document.querySelector('.close-menu');
    const navOverlay = document.querySelector('.nav-overlay');

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const openMenu = () => {
        navLinks.classList.add('active');
        navOverlay.classList.add('active');
        hamburger.style.display = 'none';
        document.body.style.overflow = 'hidden'; // prevent scrolling
    };

    const closeMenu = () => {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburger.style.display = 'block';
        document.body.style.overflow = '';
    };

    // Mobile Menu Toggle
    hamburger.addEventListener('click', openMenu);
    if(closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    if(navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Close Mobile Menu on Link Click
    navItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    /* -----------------------------------------
       2. SCROLL REVEAL ANIMATIONS
       ----------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* -----------------------------------------
       3. PORTFOLIO FILTERING
       ----------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    /* -----------------------------------------
       4. TESTIMONIAL SLIDER
       ----------------------------------------- */
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length > 0) {
        const dotsContainer = document.querySelector('.slider-dots');
        const prevBtn = document.querySelector('.slider-btn.prev');
        const nextBtn = document.querySelector('.slider-btn.next');
        
        let currentSlide = 0;
        const maxSlide = slides.length - 1;

        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.slide = i;
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        const goToSlide = (slide) => {
            slides.forEach((s) => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            slides[slide].classList.add('active');
            dots[slide].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide = currentSlide === maxSlide ? 0 : currentSlide + 1;
            goToSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = currentSlide === 0 ? maxSlide : currentSlide - 1;
            goToSlide(currentSlide);
        };

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        dotsContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('dot')) {
                const slide = e.target.dataset.slide;
                currentSlide = parseInt(slide);
                goToSlide(currentSlide);
            }
        });

        setInterval(nextSlide, 8000);
    }
});

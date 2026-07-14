(function() {
    'use strict';

    // ============================================================
    // NAVEGAÇÃO MOBILE
    // ============================================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Fechar ao clicar em um link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    // ============================================================
    // SCROLL REVEAL (animações ao entrar na viewport)
    // ============================================================
    const animatedElements = document.querySelectorAll('[data-animate]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // fallback: revelar todos
        animatedElements.forEach(el => el.classList.add('revealed'));
    }

    // Adicionar estilos para a animação (via JS para não poluir o CSS)
    const style = document.createElement('style');
    style.textContent = `
        [data-animate] {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        [data-animate].revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // ============================================================
    // CONTADORES (estatísticas)
    // ============================================================
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;
        let current = 0;
        const increment = Math.ceil(target / 60);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current.toLocaleString();
        }, 25);
    }

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    animateCounter(el);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    } else {
        statNumbers.forEach(el => animateCounter(el));
    }

    // ============================================================
    // CARROSSEL DE TESTEMUNHOS
    // ============================================================
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-controls .prev');
    const nextBtn = document.querySelector('.testimonial-controls .next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    if (testimonialSlides.length) {
        showTestimonial(0);

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
                showTestimonial(currentTestimonial);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
                showTestimonial(currentTestimonial);
            });
        }

        // Auto-play (pausa ao passar o mouse)
        let autoInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
            showTestimonial(currentTestimonial);
        }, 7000);

        const carousel = document.querySelector('.testimonial-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(autoInterval));
            carousel.addEventListener('mouseleave', () => {
                autoInterval = setInterval(() => {
                    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
                    showTestimonial(currentTestimonial);
                }, 7000);
            });
        }
    }

    // ============================================================
    // CARROSSEL DE MÍDIA
    // ============================================================
    const mediaTrack = document.querySelector('.media-track');
    const mediaSlides = document.querySelectorAll('.media-slide');
    const mediaPrev = document.querySelector('.media-prev');
    const mediaNext = document.querySelector('.media-next');
    const progressBar = document.querySelector('.media-progress span');

    if (mediaTrack && mediaSlides.length) {
        let slideWidth = 100 / (window.innerWidth <= 768 ? 1 : window.innerWidth <= 992 ? 2 : 3);
        let currentIndex = 0;
        const totalSlides = mediaSlides.length;

        function updateCarousel() {
            const offset = -currentIndex * (100 / (window.innerWidth <= 768 ? 1 : window.innerWidth <= 992 ? 2 : 3));
            mediaTrack.style.transform = `translateX(${offset}%)`;
            if (progressBar) {
                const progress = ((currentIndex + 1) / totalSlides) * 100;
                progressBar.style.width = Math.min(progress, 100) + '%';
            }
        }

        function getVisibleCount() {
            return window.innerWidth <= 768 ? 1 : window.innerWidth <= 992 ? 2 : 3;
        }

        function nextSlide() {
            const visible = getVisibleCount();
            if (currentIndex + visible < totalSlides) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }

        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                const visible = getVisibleCount();
                currentIndex = Math.max(0, totalSlides - visible);
            }
            updateCarousel();
        }

        if (mediaNext) mediaNext.addEventListener('click', nextSlide);
        if (mediaPrev) mediaPrev.addEventListener('click', prevSlide);

        // Atualizar ao redimensionar
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                slideWidth = 100 / getVisibleCount();
                // Ajustar currentIndex para não ultrapassar
                const maxIndex = Math.max(0, totalSlides - getVisibleCount());
                if (currentIndex > maxIndex) currentIndex = maxIndex;
                updateCarousel();
            }, 200);
        });

        updateCarousel();
    }

    // ============================================================
    // SIMULAÇÕES DE INTERAÇÃO (alertas já nos botões via onclick)
    // ============================================================
    // Adicionar comportamento de "View Sermon" e "Join with us" já estão com onclick.

    // ============================================================
    // NAVEGAÇÃO SUAVE (scroll suave já está no CSS com scroll-behavior)
    // ============================================================

    // ============================================================
    // DETECTAR SCROLL PARA MUDAR BACKGROUND DA NAV
    // ============================================================
    const nav = document.querySelector('.demo-nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 60) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ============================================================
    // INICIAR (garantir que a primeira animação já esteja visível)
    // ============================================================
    // Forçar a verificação inicial para elementos visíveis
    setTimeout(() => {
        document.querySelectorAll('[data-animate]').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('revealed');
            }
        });
    }, 200);

})();
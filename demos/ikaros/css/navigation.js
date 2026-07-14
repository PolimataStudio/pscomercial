// navigation.js - IKAROS Landing Page
// Navegação e Menu

// ============================================
// 1. MOBILE MENU
// ============================================

class MobileMenu {
  constructor(options = {}) {
    this.toggle = document.querySelector(options.toggleSelector || '.menu-toggle');
    this.menu = document.querySelector(options.menuSelector || '.nav-links');
    this.overlay = document.querySelector(options.overlaySelector || '.menu-overlay');
    this.isOpen = false;
    
    if (!this.toggle || !this.menu) return;
    
    this.bindEvents();
  }
  
  bindEvents() {
    this.toggle.addEventListener('click', () => this.toggleMenu());
    
    // Fecha ao clicar em um link
    this.menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Fecha ao clicar no overlay
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeMenu());
    }
    
    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    this.isOpen = true;
    this.toggle.classList.add('active');
    this.menu.classList.add('open');
    document.body.classList.add('menu-open');
    
    if (this.overlay) {
      this.overlay.classList.add('active');
    }
  }
  
  closeMenu() {
    this.isOpen = false;
    this.toggle.classList.remove('active');
    this.menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    
    if (this.overlay) {
      this.overlay.classList.remove('active');
    }
  }
}

// ============================================
// 2. SMOOTH SCROLL (nav links)
// ============================================

function initSmoothNav() {
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (!target) return;
      
      e.preventDefault();
      
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// ============================================
// 3. ACTIVE LINK (scroll spy)
// ============================================

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  
  if (!sections.length || !links.length) return;
  
  let activeId = '';
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        activeId = section.getAttribute('id');
      }
    });
    
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================
// 4. BACK TO TOP
// ============================================

function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// 5. PREVENT DEFAULT (links externos)
// ============================================

function initExternalLinks() {
  const links = document.querySelectorAll('a[target="_blank"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // Adiciona segurança para links externos
      if (link.href.startsWith('http') && !link.href.includes(window.location.hostname)) {
        // Adiciona rel="noopener" se não tiver
        if (!link.hasAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
          link.setAttribute('rel', `${link.getAttribute('rel') || ''} noopener noreferrer`.trim());
        }
      }
    });
  });
}

// ============================================
// 6. RESPONSIVE NAVBAR
// ============================================

function initResponsiveNav() {
  const nav = document.querySelector('.nav-links');
  const header = document.querySelector('.header');
  
  if (!nav || !header) return;
  
  // Fecha o menu mobile ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1023) {
      const menuToggle = document.querySelector('.menu-toggle');
      if (menuToggle) {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    }
  });
}

// ============================================
// Inicialização
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa mobile menu
  const mobileMenu = new MobileMenu();
  
  // Inicializa navegação suave
  initSmoothNav();
  
  // Inicializa scroll spy
  initScrollSpy();
  
  // Inicializa back to top
  initBackToTop();
  
  // Inicializa external links
  initExternalLinks();
  
  // Inicializa navbar responsiva
  initResponsiveNav();
});
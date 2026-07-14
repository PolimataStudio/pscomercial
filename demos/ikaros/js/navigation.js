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
    
    this.menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeMenu());
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    this.isOpen ? this.closeMenu() : this.openMenu();
  }
  
  openMenu() {
    this.isOpen = true;
    this.toggle.classList.add('active');
    this.menu.classList.add('open');
    document.body.classList.add('menu-open');
    if (this.overlay) this.overlay.classList.add('active');
  }
  
  closeMenu() {
    this.isOpen = false;
    this.toggle.classList.remove('active');
    this.menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    if (this.overlay) this.overlay.classList.remove('active');
  }
}

// ============================================
// 2. SMOOTH SCROLL
// ============================================

function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });
}

// ============================================
// 3. SCROLL SPY
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
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
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
    btn.classList.toggle('visible', (window.pageYOffset || document.documentElement.scrollTop) > 600);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============================================
// 5. INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu();
  initSmoothNav();
  initScrollSpy();
  initBackToTop();
});
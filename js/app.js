import { loadComponents } from './components.js';
import { initRouter } from './router.js';
import { initSearch } from './search.js';
import { initForms } from './forms.js';
import { initAnalytics } from './analytics.js';
import { initPWA } from './pwa.js';

document.addEventListener('DOMContentLoaded', () => {
  // Carrega componentes reutilizáveis (navbar, footer, etc.)
  loadComponents();

  // Inicializa roteamento (para navegação interna)
  initRouter();

  // Inicializa busca (se aplicável)
  initSearch();

  // Inicializa formulários (validação, envio)
  initForms();

  // Inicializa analytics (eventos)
  initAnalytics();

  // Inicializa PWA (service worker, manifest)
  initPWA();

  // Menu mobile toggle
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  console.log('Polímata Platform — Sprint 1 carregada.');
});
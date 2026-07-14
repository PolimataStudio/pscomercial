// js/app.js
import { loadComponents } from './components.js';
import { initRouter } from './router.js';
import { initSearch } from './search.js';
import { initForms } from './forms.js';
import { initAnalytics } from './analytics.js';
import { initPWA } from './pwa.js';
import { initTheme } from './theme/theme-loader.js';
import { applyScheduledTheme } from './theme/theme-scheduler.js';

// Importa PFX (inicializa automaticamente)
import './forms/index.js';

// ===== PSEF 4.0 =====
import { PSEF } from './psef/index.js';

// ===== FUNÇÃO PARA CONFIGURAR OS BOTÕES EXPANDIR =====
function setupExpandButtons() {
  // Verifica se a PSEF está disponível
  if (!window.PSEF) {
    console.warn('[App] PSEF ainda não disponível. Aguardando...');
    return;
  }

  const expandBtns = document.querySelectorAll('.spm-expand-btn');
  if (!expandBtns.length) {
    console.warn('[App] Nenhum botão .spm-expand-btn encontrado.');
    return;
  }

  expandBtns.forEach(btn => {
    // Evita adicionar múltiplos listeners
    if (btn.dataset.psefListener) return;
    btn.dataset.psefListener = 'true';

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('[App] Expandir clicado, abrindo PSEF...');
      window.PSEF.open(this);
    });
  });

  console.log(`[App] ${expandBtns.length} botão(es) .spm-expand-btn configurado(s).`);
}

// ===== INICIALIZAÇÃO PRINCIPAL =====
document.addEventListener('DOMContentLoaded', async () => {
  if (!window.PathResolver) {
    console.error('[App] PathResolver não encontrado.');
    return;
  }

  // Carrega componentes estruturais (navbar, footer)
  loadComponents();

  // Inicializa módulos
  initRouter();
  initSearch();
  initForms();
  initAnalytics();
  initPWA();

  // Carrega o tema padrão do registry
  await initTheme();

  // Aplica o tema programado
  await applyScheduledTheme();

  // ===== EXPÕE A PSEF GLOBALMENTE =====
  window.PSEF = PSEF;
  console.log('[App] PSEF 4.0 carregada e disponível globalmente.');

  // Configura os botões expandir (após a PSEF estar disponível)
  setupExpandButtons();

  // Menu mobile toggle (mantido)
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  document.dispatchEvent(new CustomEvent('polimata-app-ready'));

  // ===== MENU MOBILE (HAMBÚRGUER) =====
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (!toggle || !navLinks) return;

    // Remove listeners antigos para evitar duplicação
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);
    const newNavLinks = navLinks.cloneNode(true);
    navLinks.parentNode.replaceChild(newNavLinks, navLinks);

    const finalToggle = document.querySelector('.menu-toggle');
    const finalNavLinks = document.querySelector('.nav-links');

    finalToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = finalNavLinks.classList.toggle('open');
      finalToggle.classList.toggle('open');
      finalToggle.setAttribute('aria-expanded', isOpen);
      body.classList.toggle('nav-open', isOpen);
    });

    finalNavLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        finalNavLinks.classList.remove('open');
        finalToggle.classList.remove('open');
        finalToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('nav-open');
      });
    });

    document.addEventListener('click', function(e) {
      const isClickInside = finalNavLinks.contains(e.target) || finalToggle.contains(e.target);
      if (!isClickInside && finalNavLinks.classList.contains('open')) {
        finalNavLinks.classList.remove('open');
        finalToggle.classList.remove('open');
        finalToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('nav-open');
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && finalNavLinks.classList.contains('open')) {
        finalNavLinks.classList.remove('open');
        finalToggle.classList.remove('open');
        finalToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('nav-open');
      }
    });
  }

  function ensureMobileMenu() {
    let fallbackInterval = null; // Mover para escopo da função
    if (document.querySelector('.menu-toggle')) {
      initMobileMenu();
      return;
    }
    const observer = new MutationObserver(() => {
      if (document.querySelector('.menu-toggle')) {
        initMobileMenu();
        observer.disconnect();
        if (fallbackInterval) clearInterval(fallbackInterval);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    let attempts = 0;
    const maxAttempts = 20;
    fallbackInterval = setInterval(() => {
      attempts++;
      if (document.querySelector('.menu-toggle')) {
        initMobileMenu();
        clearInterval(fallbackInterval);
        observer.disconnect();
      } else if (attempts >= maxAttempts) {
        clearInterval(fallbackInterval);
        observer.disconnect();
      }
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureMobileMenu);
  } else {
    ensureMobileMenu();
  }

  document.addEventListener('polimata-app-ready', function() {
    ensureMobileMenu();
    // Reconfigurar botões expandir caso tenham sido carregados depois
    setupExpandButtons();
  });

  console.log('[App] Polímata Platform — PTF + PRF + PFX + PSEF 4.0 carregada.');
});
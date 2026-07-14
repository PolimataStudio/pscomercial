// js/psef/PSEFCore.js
import { PSEFConfig } from './PSEFConfig.js';
import { loadDemos } from '../core/data-loader.js';

/**
 * PSEFCore – Estado global e orquestração da PSEF 4.0
 * Mantém lista de demos, índice atual, estado ativo/inativo.
 * Emite eventos para outros módulos.
 */
export class PSEFCore {
  constructor() {
    this.demos = [];
    this.currentIndex = 0;
    this.isActive = false;
    this.isInitialized = false;
    this.scrollPosition = 0;
    this.expandBtn = null;
    this.listeners = {}; // eventos internos (pub/sub)
  }

  /**
   * Inicializa o core: carrega demos e prepara o sistema.
   * Deve ser chamado uma vez no carregamento da página.
   */
  async init() {
    if (this.isInitialized) return;
    try {
      let data = await loadDemos();
      if (data && data.length) {
        // Filtra por categoria se presente na URL
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('cat');
        if (categoryId) {
          data = data.filter(d => d.categoryId === categoryId);
        }
        if (data.length === 0) {
          throw new Error('Nenhuma demo encontrada para esta categoria.');
        }
        this.demos = data;
      } else {
        // Fallback: usa a demo atual (se houver)
        const iframe = document.querySelector(PSEFConfig.selectors.iframe);
        let currentUrl = iframe ? iframe.src : window.location.href;
        let demoId = document.body.dataset.demoId || 'fallback';
        let demoTitle = document.querySelector('.demo-header h1')?.textContent || 'Demonstração Padrão';
        this.demos = [{ id: demoId, title: demoTitle, url: currentUrl }];
      }

      // Posiciona no índice correto se houver demoId no body
      const demoId = document.body.dataset.demoId;
      if (demoId && this.demos.length) {
        const idx = this.demos.findIndex(d => d.id === demoId);
        if (idx !== -1) this.currentIndex = idx;
      }

      this.isInitialized = true;
      console.log('[PSEFCore] Inicializado com', this.demos.length, 'demos.');
      this.emit('core:ready', { demos: this.demos, currentIndex: this.currentIndex });
    } catch (e) {
      console.error('[PSEFCore] Erro ao inicializar:', e);
      this.demos = [{ id: 'fallback', title: 'Demonstração', url: 'demos/fallback/index.html' }];
      this.isInitialized = true;
    }
  }

  // ---- Métodos de navegação ----
  getCurrentDemo() {
    return this.demos[this.currentIndex] || null;
  }

  getNextIndex() {
    return (this.currentIndex + 1) % this.demos.length;
  }

  getPrevIndex() {
    return (this.currentIndex - 1 + this.demos.length) % this.demos.length;
  }

  goTo(index) {
    if (index < 0 || index >= this.demos.length || index === this.currentIndex) return;
    this.currentIndex = index;
    this.emit('core:navigate', { demo: this.getCurrentDemo(), index: this.currentIndex });
  }

  next() {
    this.goTo(this.getNextIndex());
  }

  prev() {
    this.goTo(this.getPrevIndex());
  }

  // ---- Controle de estado ----
  open(expandBtn) {
    if (this.isActive) return;
    this.isActive = true;
    this.scrollPosition = window.scrollY;
    this.expandBtn = expandBtn;
    this.emit('core:open', { demo: this.getCurrentDemo(), index: this.currentIndex });
  }

  close() {
    if (!this.isActive) return;
    this.isActive = false;
    this.emit('core:close', {});
    if (this.expandBtn) {
      this.expandBtn.focus();
      this.expandBtn = null;
    }
    window.scrollTo({ top: this.scrollPosition, behavior: 'instant' });
  }

  // ---- Sistema de eventos interno (pub/sub) ----
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(fn => fn !== callback);
  }

  emit(event, data) {
    if (!this.listeners[event]) return;
    for (const cb of this.listeners[event]) {
      try { cb(data); } catch (e) { console.error('[PSEFCore] Erro no listener:', e); }
    }
  }
}

// Singleton
export const core = new PSEFCore();
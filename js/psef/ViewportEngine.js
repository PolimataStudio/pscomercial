// js/psef/ViewportEngine.js
import { core } from './PSEFCore.js';

/**
 * ViewportEngine – Observa mudanças na viewport e ajusta o Showcase.
 * Utiliza visualViewport se disponível.
 */
class ViewportEngine {
  constructor() {
    this.isActive = false;
    this.resizeHandler = this.resizeHandler.bind(this);

    core.on('core:open', () => this.activate());
    core.on('core:close', () => this.deactivate());
  }

  activate() {
    if (this.isActive) return;
    this.isActive = true;
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', this.resizeHandler);
      window.visualViewport.addEventListener('scroll', this.resizeHandler);
    } else {
      window.addEventListener('resize', this.resizeHandler);
    }
    this.resizeHandler();
  }

  deactivate() {
    if (!this.isActive) return;
    this.isActive = false;
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', this.resizeHandler);
      window.visualViewport.removeEventListener('scroll', this.resizeHandler);
    } else {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  resizeHandler() {
    // A PSEF Root Layer já usa inset:0 e padding com safe areas.
    // Nenhuma ação extra necessária, pois o iframe ocupa 100% do container.
    // Manter para futuras melhorias.
  }
}

export const viewportEngine = new ViewportEngine();
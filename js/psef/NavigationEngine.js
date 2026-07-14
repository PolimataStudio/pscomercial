// js/psef/NavigationEngine.js
import { core } from './PSEFCore.js';

/**
 * NavigationEngine – Gerencia a navegação entre demos.
 * Atualmente, apenas delega ao core, mas pode ser expandido para histórico.
 */
class NavigationEngine {
  constructor() {
    // Escuta eventos do core se necessário
    // Nenhuma lógica adicional por enquanto
  }

  // Métodos públicos (delegam ao core)
  next() {
    core.next();
  }

  prev() {
    core.prev();
  }

  goTo(index) {
    core.goTo(index);
  }
}

export const navigationEngine = new NavigationEngine();
// js/psef/index.js
import { core } from './PSEFCore.js';
import './OverlayEngine.js';
import './HUDEngine.js';
import './NavigationEngine.js';
import './InputEngine.js';
import './ViewportEngine.js';
import './AnimationEngine.js';

// Inicializa o core (carrega demos)
(async () => {
  try {
    await core.init();
    console.log('[PSEF 4.0] Core inicializado com sucesso.');
  } catch (e) {
    console.error('[PSEF 4.0] Falha na inicialização:', e);
  }
})();

// API pública
export const PSEF = {
  open: (btn) => core.open(btn),
  close: () => core.close(),
  next: () => core.next(),
  prev: () => core.prev(),
  goTo: (index) => core.goTo(index),
  getCurrentIndex: () => core.currentIndex,
  getDemos: () => core.demos,
  isActive: () => core.isActive,
};

// Para depuração (opcional)
// window.__PSEF_CORE = core;
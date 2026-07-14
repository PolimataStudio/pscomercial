// js/psef/InputEngine.js
import { PSEFConfig } from './PSEFConfig.js';
import { core } from './PSEFCore.js';

/**
 * InputEngine – Captura eventos de teclado e touch para navegação.
 * Usa capture: true para ESC funcionar mesmo com foco no iframe.
 */
class InputEngine {
  constructor() {
    this.isActive = false;
    this.keyHandler = this.keyHandler.bind(this);
    this.swipeStartX = 0;
    this.swipeStartY = 0;
    this.isSwiping = false;

    core.on('core:open', () => this.activate());
    core.on('core:close', () => this.deactivate());
  }

  activate() {
    if (this.isActive) return;
    this.isActive = true;
    window.addEventListener('keydown', this.keyHandler, true);
    // Swipe: adiciona listeners na root quando aberta
    const root = document.getElementById('psef-root');
    if (root) {
      root.addEventListener('touchstart', this.touchStart.bind(this), { passive: true });
      root.addEventListener('touchmove', this.touchMove.bind(this), { passive: false });
      root.addEventListener('touchend', this.touchEnd.bind(this), { passive: true });
    }
  }

  deactivate() {
    if (!this.isActive) return;
    this.isActive = false;
    window.removeEventListener('keydown', this.keyHandler, true);
    const root = document.getElementById('psef-root');
    if (root) {
      root.removeEventListener('touchstart', this.touchStart);
      root.removeEventListener('touchmove', this.touchMove);
      root.removeEventListener('touchend', this.touchEnd);
    }
  }

  keyHandler(e) {
    if (!core.isActive) return;
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        e.stopPropagation();
        core.close();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        e.stopPropagation();
        core.prev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        e.stopPropagation();
        core.next();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        e.stopPropagation();
        core.close();
        break;
      default:
        break;
    }
  }

  touchStart(e) {
    const touch = e.touches[0];
    this.swipeStartX = touch.clientX;
    this.swipeStartY = touch.clientY;
    this.isSwiping = false;
  }

  touchMove(e) {
    if (!this.swipeStartX || !this.swipeStartY) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - this.swipeStartX;
    const deltaY = touch.clientY - this.swipeStartY;
    if (Math.abs(deltaX) > 20 && Math.abs(deltaX) > Math.abs(deltaY)) {
      this.isSwiping = true;
      e.preventDefault();
    }
  }

  touchEnd(e) {
    if (!this.isSwiping) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - this.swipeStartX;
    if (Math.abs(deltaX) > PSEFConfig.swipe.threshold) {
      if (deltaX < 0) {
        core.next();
      } else {
        core.prev();
      }
    }
    this.isSwiping = false;
    this.swipeStartX = 0;
    this.swipeStartY = 0;
  }
}

export const inputEngine = new InputEngine();
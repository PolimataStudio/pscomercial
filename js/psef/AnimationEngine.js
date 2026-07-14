// js/psef/AnimationEngine.js
import { PSEFConfig } from './PSEFConfig.js';

/**
 * AnimationEngine – Utilitário para animações.
 * Fornece métodos para fade in/out, scale, etc.
 */
class AnimationEngine {
  /**
   * Aplica fade in a um elemento.
   */
  fadeIn(element, duration = PSEFConfig.animation.fadeDuration) {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '0';
    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
  }

  /**
   * Aplica fade out a um elemento e remove após a transição.
   */
  fadeOut(element, duration = PSEFConfig.animation.fadeDuration, callback = null) {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '0';
    setTimeout(() => {
      if (element.parentNode) element.parentNode.removeChild(element);
      if (callback) callback();
    }, duration);
  }
}

export const animationEngine = new AnimationEngine();
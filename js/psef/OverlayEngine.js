// js/psef/OverlayEngine.js
import { PSEFConfig } from './PSEFConfig.js';
import { core } from './PSEFCore.js';
import { hudEngine } from './HUDEngine.js';

/**
 * OverlayEngine – Gerencia a PSEF Root Layer.
 * Cria backdrop, container do iframe e chama a HUD.
 */
class OverlayEngine {
  constructor() {
    this.root = null;
    this.backdrop = null;
    this.showcaseContainer = null;
    this.iframe = null;
    this.isOpen = false;

    // Escuta eventos do core
    core.on('core:open', () => this.open());
    core.on('core:close', () => this.close());
    core.on('core:navigate', (data) => this.updateIframe(data.demo));
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;

    // Cria root
    this.root = document.createElement('div');
    this.root.id = 'psef-root';
    this.root.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: ${PSEFConfig.overlay.zIndex};
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${PSEFConfig.overlay.backdropColor};
      backdrop-filter: blur(${PSEFConfig.overlay.backdropBlur});
      -webkit-backdrop-filter: blur(${PSEFConfig.overlay.backdropBlur});
      padding: 16px;
      padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
      opacity: 0;
      transition: opacity ${PSEFConfig.animation.fadeDuration}ms ease;
    `;
    document.body.appendChild(this.root);
    // Força reflow
    this.root.offsetHeight;
    this.root.style.opacity = '1';

    // Backdrop (fecha ao clicar)
    this.backdrop = document.createElement('div');
    this.backdrop.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: auto;
      cursor: pointer;
    `;
    this.backdrop.addEventListener('click', () => core.close());
    this.root.appendChild(this.backdrop);

    // Container do showcase
    this.showcaseContainer = document.createElement('div');
    this.showcaseContainer.style.cssText = `
      position: relative;
      width: 100%;
      height: 100%;
      max-width: ${PSEFConfig.viewport.maxWidth}px;
      max-height: ${PSEFConfig.viewport.maxHeight * 100}vh;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 0 60px rgba(182, 255, 59, 0.1);
      border: 2px solid var(--accent-lime, #B6FF3B);
    `;
    this.root.appendChild(this.showcaseContainer);

    // Iframe
    this.iframe = document.createElement('iframe');
    this.iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      pointer-events: auto;
      background: var(--bg, #070A0F);
      transition: opacity ${PSEFConfig.animation.fadeDuration}ms ease;
      opacity: 0;
      border-radius: 10px;
    `;
    this.iframe.setAttribute('loading', 'eager');
    this.iframe.setAttribute('title', 'Demonstração interativa');
    this.iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
    this.showcaseContainer.appendChild(this.iframe);

    // Constrói a HUD
    hudEngine.build(this.root);

    // Carrega a demo atual
    const demo = core.getCurrentDemo();
    if (demo) this.loadIframe(demo);

    // Bloqueia scroll
    document.body.style.overflow = 'hidden';

    // Foco no iframe após carregar
    this.iframe.addEventListener('load', () => {
      this.iframe.style.opacity = '1';
    });
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.root.style.opacity = '0';
    document.body.style.overflow = '';
    setTimeout(() => {
      if (this.root && this.root.parentNode) {
        this.root.parentNode.removeChild(this.root);
        this.root = null;
        this.backdrop = null;
        this.showcaseContainer = null;
        this.iframe = null;
      }
      hudEngine.destroy();
    }, PSEFConfig.animation.fadeDuration);
  }

  updateIframe(demo) {
    if (!demo || !this.iframe) return;
    this.iframe.style.opacity = '0';
    setTimeout(() => this.loadIframe(demo), PSEFConfig.animation.fadeDuration);
  }

  loadIframe(demo) {
    if (!this.iframe) return;
    const url = window.PathResolver.resolveDemoUrl(demo);
    this.iframe.src = url;
    this.iframe.onload = () => {
      this.iframe.style.opacity = '1';
      this.iframe.onload = null;
    };
    setTimeout(() => {
      if (this.iframe && this.iframe.style.opacity === '0') {
        this.iframe.style.opacity = '1';
      }
    }, 1000);
  }
}

export const overlayEngine = new OverlayEngine();
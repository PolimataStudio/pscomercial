// js/psef/HUDEngine.js
import { PSEFConfig } from './PSEFConfig.js';
import { core } from './PSEFCore.js';

/**
 * HUDEngine – Constrói e gerencia a HUD (botões e tooltip).
 * Totalmente independente do iframe.
 * CORREÇÃO PARP 3.0: Botões agora usam position: fixed para garantir visibilidade em mobile.
 */
class HUDEngine {
  constructor() {
    this.container = null;
    this.buttons = {};
    this.tooltip = null;
    this.tooltipTimer = null;
    this.isTooltipShown = false;

    core.on('core:open', () => this.showTooltip());
    core.on('core:close', () => this.hideTooltip());
    core.on('core:navigate', () => this.hideTooltip());
  }

  /**
   * Constrói a HUD dentro da PSEF Root Layer.
   * @param {HTMLElement} root - Elemento raiz da PSEF.
   */
  build(root) {
    if (this.container) return;

    // Container fixo para a HUD, sobreposto ao root
    this.container = document.createElement('div');
    this.container.style.cssText = `
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: ${PSEFConfig.hud.zIndex};
    `;
    document.body.appendChild(this.container); // Adiciona ao body, não ao root

    // Botão ←
    this.buttons.prev = this.createButton('←', 'Demo anterior', 'prev');
    this.buttons.prev.style.cssText = `
      position: absolute;
      left: ${PSEFConfig.hud.buttonGap}px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: auto;
      background: rgba(255,255,255,0.08);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.15);
      color: #3B7BFF;
      width: ${PSEFConfig.hud.buttonSize}px;
      height: ${PSEFConfig.hud.buttonSize}px;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: ${PSEFConfig.hud.buttonSize}px;
      min-height: ${PSEFConfig.hud.buttonSize}px;
      opacity: 0.7;
      box-shadow: 0 2px 12px rgba(0,0,0,0.3);
    `;
    this.buttons.prev.addEventListener('click', () => core.prev());
    this.container.appendChild(this.buttons.prev);

    // Botão →
    this.buttons.next = this.createButton('→', 'Próxima demo', 'next');
    this.buttons.next.style.cssText = `
      position: absolute;
      right: ${PSEFConfig.hud.buttonGap}px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: auto;
      background: rgba(255,255,255,0.08);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.15);
      color: #3B7BFF;
      width: ${PSEFConfig.hud.buttonSize}px;
      height: ${PSEFConfig.hud.buttonSize}px;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: ${PSEFConfig.hud.buttonSize}px;
      min-height: ${PSEFConfig.hud.buttonSize}px;
      opacity: 0.7;
      box-shadow: 0 2px 12px rgba(0,0,0,0.3);
    `;
    this.buttons.next.addEventListener('click', () => core.next());
    this.container.appendChild(this.buttons.next);

    // Botão ✕ (cor ajustada para contraste WCAG AA)
    this.buttons.close = this.createButton('✕', 'Fechar demonstração', 'close');
    this.buttons.close.style.cssText = `
      position: absolute;
      top: ${PSEFConfig.hud.buttonGap}px;
      right: ${PSEFConfig.hud.buttonGap}px;
      pointer-events: auto;
      background: rgba(255,255,255,0.08);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.15);
      color: #FF6B6B; /* Cor mais clara para melhor contraste com fundo escuro */
      ...
    `;
    this.buttons.close.addEventListener('click', () => core.close());
    this.container.appendChild(this.buttons.close);

    // Eventos de hover e touch com melhor feedback
    Object.values(this.buttons).forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.background = 'rgba(255,255,255,0.15)';
        btn.style.transform = btn.style.transform.includes('scale') ? 'scale(1.1)' : 'scale(1.05)';
        btn.style.opacity = '1';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background = 'rgba(255,255,255,0.08)';
        btn.style.transform = btn.style.transform.includes('scale') ? 'scale(1)' : 'scale(1)';
        btn.style.opacity = '0.7';
      });
      btn.addEventListener('touchstart', () => {
        btn.style.background = 'rgba(255,255,255,0.25)';
        btn.style.opacity = '1';
      }, { passive: true });
      btn.addEventListener('touchend', () => {
        btn.style.background = 'rgba(255,255,255,0.08)';
        btn.style.opacity = '0.7';
      }, { passive: true });
    });

    // Mostra tooltip imediatamente
    this.showTooltip();
  }

  createButton(label, ariaLabel, id) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.setAttribute('aria-label', ariaLabel);
    btn.setAttribute('type', 'button');
    btn.dataset.psefBtn = id;
    return btn;
  }

  showTooltip() {
    if (this.isTooltipShown) return;
    if (sessionStorage.getItem(PSEFConfig.tooltip.sessionKey)) return;

    this.tooltip = document.createElement('div');
    this.tooltip.style.cssText = `
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      background: rgba(14, 18, 25, 0.9);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid var(--border, #2A313C);
      color: var(--text, #E6E8EE);
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 500;
      box-shadow: var(--shadow-md);
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: 10002;
      max-width: 80%;
      text-align: center;
    `;
    this.tooltip.textContent = PSEFConfig.tooltip.message;
    this.container.appendChild(this.tooltip);

    this.tooltip.offsetHeight;
    this.tooltip.style.opacity = '1';
    this.isTooltipShown = true;
    sessionStorage.setItem(PSEFConfig.tooltip.sessionKey, 'true');

    this.tooltipTimer = setTimeout(() => {
      if (this.tooltip) {
        this.tooltip.style.opacity = '0';
        setTimeout(() => {
          if (this.tooltip && this.tooltip.parentNode) {
            this.tooltip.parentNode.removeChild(this.tooltip);
            this.tooltip = null;
          }
        }, 400);
      }
    }, PSEFConfig.tooltip.duration);
  }

  hideTooltip() {
    if (this.tooltip) {
      clearTimeout(this.tooltipTimer);
      this.tooltip.style.opacity = '0';
      setTimeout(() => {
        if (this.tooltip && this.tooltip.parentNode) {
          this.tooltip.parentNode.removeChild(this.tooltip);
          this.tooltip = null;
        }
      }, 400);
    }
  }

  destroy() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.container = null;
    this.buttons = {};
    this.hideTooltip();
    this.isTooltipShown = false;
  }
}

export const hudEngine = new HUDEngine();
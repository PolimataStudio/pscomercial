// js/forms/toast.js
import { FORM_CONFIG } from './config.js';

class ToastManager {
  constructor() {
    this.container = null;
    this.timeout = null;
    this.init();
  }
  
  init() {
    // Cria o container de toasts se não existir
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'pfx-toast-container';
      this.container.setAttribute('role', 'status');
      this.container.setAttribute('aria-live', 'polite');
      document.body.appendChild(this.container);
    }
  }
  
  show(message, type = 'success', duration = 5000) {
    // Remove toast anterior se existir
    this.clear();
    
    const toast = document.createElement('div');
    toast.className = `pfx-toast pfx-toast-${type}`;
    toast.setAttribute('role', 'alert');
    
    // Ícone conforme tipo
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };
    
    toast.innerHTML = `
      <span class="pfx-toast-icon">${icons[type] || 'ℹ'}</span>
      <span class="pfx-toast-message">${message}</span>
      <button class="pfx-toast-close" aria-label="Fechar notificação">×</button>
    `;
    
    this.container.appendChild(toast);
    
    // Fechar ao clicar no botão
    toast.querySelector('.pfx-toast-close').addEventListener('click', () => {
      this.clear();
    });
    
    // Fechar automaticamente
    if (duration > 0) {
      this.timeout = setTimeout(() => {
        this.clear();
      }, duration);
    }
    
    // Fechar ao clicar fora (opcional)
    toast.addEventListener('click', (e) => {
      if (e.target === toast) this.clear();
    });
  }
  
  clear() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

// Singleton
export const toast = new ToastManager();
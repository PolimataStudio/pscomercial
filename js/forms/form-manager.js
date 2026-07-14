// js/forms/form-manager.js
import { FORM_CONFIG } from './config.js';
import { Validators } from './validators.js';
import { toast } from './toast.js';
import { submitStaticForms } from './adapters/staticforms.js';
import { submitLocal } from './adapters/local.js';

class FormManager {
  constructor() {
    this.forms = [];
    this.submissions = [];
    this.init();
  }
  
  init() {
    // Encontra todos os formulários com data-pfx-form
    const formElements = document.querySelectorAll(FORM_CONFIG.selectors.form);
    formElements.forEach((form) => {
      this.register(form);
    });
    
    // Observa mudanças no DOM para formulários dinâmicos
    this.observeDOM();
  }
  
  register(form) {
    // Evita registrar o mesmo formulário duas vezes
    if (form.dataset.pfxRegistered) return;
    
    const config = this.getFormConfig(form);
    this.forms.push({ element: form, config });
    form.dataset.pfxRegistered = 'true';
    
    // Adiciona listener de submit
    form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Validação em tempo real
    const fields = form.querySelectorAll(FORM_CONFIG.selectors.field);
    fields.forEach((field) => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearFieldError(field));
    });
  }
  
  getFormConfig(form) {
    // Lê configurações do data-* ou usa padrão
    const adapter = form.dataset.pfxAdapter || FORM_CONFIG.defaultAdapter;
    const endpoint = form.dataset.pfxEndpoint || form.action || '';
    const autoReset = form.dataset.pfxAutoReset !== 'false';
    return { adapter, endpoint, autoReset };
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const config = this.getFormConfig(form);
    const submitBtn = form.querySelector(FORM_CONFIG.selectors.submit);
    
    // Valida todos os campos
    const isValid = this.validateForm(form);
    if (!isValid) {
      toast.show(FORM_CONFIG.messages.validation, 'warning', 4000);
      return;
    }
    
    // Previne múltiplos envios
    if (submitBtn && submitBtn.disabled) return;
    
    // Estado de loading
    this.setLoading(form, true);
    
    try {
      const formData = new FormData(form);
      const result = await this.submit(formData, config);
      
      // Sucesso
      toast.show(result.message || FORM_CONFIG.messages.success, 'success', 5000);
      
      // Reset automático
      if (config.autoReset !== false) {
        form.reset();
        this.clearErrors(form);
      }
      
      // Dispara evento personalizado
      form.dispatchEvent(new CustomEvent('pfx:success', { detail: result }));
      
    } catch (error) {
      // Erro
      console.error('[PFX] Erro no envio:', error);
      toast.show(error.message || FORM_CONFIG.messages.error, 'error', 6000);
      
      // Dispara evento personalizado
      form.dispatchEvent(new CustomEvent('pfx:error', { detail: error }));
      
    } finally {
      this.setLoading(form, false);
    }
  }
  
  async submit(formData, config) {
    switch (config.adapter) {
      case 'staticforms':
        return await submitStaticForms(formData, config.endpoint);
      case 'local':
        return await submitLocal(formData);
      default:
        throw new Error(`Adapter "${config.adapter}" não suportado.`);
    }
  }
  
  validateForm(form) {
    const fields = form.querySelectorAll(FORM_CONFIG.selectors.field);
    let isValid = true;
    
    fields.forEach((field) => {
      const fieldValid = this.validateField(field);
      if (!fieldValid) isValid = false;
    });
    
    return isValid;
  }
  
  validateField(field) {
    const rules = field.dataset.pfxRules?.split(',') || [];
    const value = field.value;
    let isValid = true;
    let errorMessage = '';
    
    for (const rule of rules) {
      const validator = Validators[rule.trim()];
      if (validator) {
        const result = validator(value);
        if (!result.valid) {
          isValid = false;
          errorMessage = result.message;
          break;
        }
      }
    }
    
    // Validação personalizada via data-pfx-custom (função global)
    if (field.dataset.pfxCustom && typeof window[field.dataset.pfxCustom] === 'function') {
      const result = window[field.dataset.pfxCustom](value);
      if (!result.valid) {
        isValid = false;
        errorMessage = result.message;
      }
    }
    
    if (!isValid) {
      this.setFieldError(field, errorMessage);
    } else {
      this.clearFieldError(field);
    }
    
    return isValid;
  }
  
  setFieldError(field, message) {
    field.classList.add('pfx-error');
    field.setAttribute('aria-invalid', 'true');
    
    // Remove mensagem de erro antiga
    const oldError = field.parentElement?.querySelector('.pfx-error-message');
    if (oldError) oldError.remove();
    
    // Cria nova mensagem
    const errorEl = document.createElement('span');
    errorEl.className = 'pfx-error-message';
    errorEl.setAttribute('role', 'alert');
    errorEl.textContent = message;
    field.parentElement?.appendChild(errorEl);
    
    // Atualiza aria-describedby
    const describedBy = field.getAttribute('aria-describedby') || '';
    field.setAttribute('aria-describedby', `${describedBy} pfx-error-${field.id}`.trim());
  }
  
  clearFieldError(field) {
    field.classList.remove('pfx-error');
    field.removeAttribute('aria-invalid');
    const errorEl = field.parentElement?.querySelector('.pfx-error-message');
    if (errorEl) errorEl.remove();
  }
  
  clearErrors(form) {
    const fields = form.querySelectorAll(FORM_CONFIG.selectors.field);
    fields.forEach((field) => this.clearFieldError(field));
  }
  
  setLoading(form, isLoading) {
    const submitBtn = form.querySelector(FORM_CONFIG.selectors.submit);
    if (!submitBtn) return;
    
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent;
      submitBtn.textContent = FORM_CONFIG.messages.sending;
      submitBtn.classList.add('pfx-loading');
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = submitBtn.dataset.originalText || submitBtn.textContent;
      submitBtn.classList.remove('pfx-loading');
    }
  }
  
  observeDOM() {
    if (this._observer) {
      this._observer.disconnect();
    }
    this._observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.matches && node.matches(FORM_CONFIG.selectors.form)) {
            this.register(node);
          }
          if (node.querySelectorAll) {
            node.querySelectorAll(FORM_CONFIG.selectors.form).forEach((form) => {
              this.register(form);
            });
          }
        });
      });
    });
    
    this._observer.observe(document.body, { childList: true, subtree: true });
  }
}
// Singleton
export const formManager = new FormManager();
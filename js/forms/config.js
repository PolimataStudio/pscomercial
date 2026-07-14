// js/forms/config.js
export const FORM_CONFIG = {
  // Configuração padrão
  defaultAdapter: 'staticforms',
  
  // Timeout para requisições (ms)
  timeout: 10000,
  
  // Mensagens padrão
  messages: {
    success: 'Mensagem enviada com sucesso!',
    error: 'Não foi possível enviar. Tente novamente.',
    validation: 'Por favor, corrija os campos destacados.',
    sending: 'Enviando...',
  },
  
  // Seletores de formulários
  selectors: {
    form: '[data-pfx-form]',
    submit: '[data-pfx-submit]',
    field: '[data-pfx-field]',
    error: '[data-pfx-error]',
  },
  
  // Proteção contra spam
  honeypot: {
    enabled: true,
    fieldName: '_honeypot',
    className: 'pfx-honeypot',
  },
  
  // Rate limiting (por sessão)
  rateLimit: {
    enabled: true,
    maxSubmissions: 3,
    windowMs: 60000, // 1 minuto
  },
};
// js/forms/validators.js
export const Validators = {
  // Validação de nome
  name(value) {
    const trimmed = value?.trim() || '';
    if (trimmed.length < 2) {
      return { valid: false, message: 'Nome deve ter pelo menos 2 caracteres.' };
    }
    if (trimmed.length > 100) {
      return { valid: false, message: 'Nome deve ter no máximo 100 caracteres.' };
    }
    if (!/^[a-zA-ZÀ-ÿ\s']+$/.test(trimmed)) {
      return { valid: false, message: 'Nome deve conter apenas letras.' };
    }
    return { valid: true };
  },
  
  // Validação de e-mail (RFC 5322 simplificado)
  email(value) {
    const trimmed = value?.trim() || '';
    if (!trimmed) {
      return { valid: false, message: 'E-mail é obrigatório.' };
    }
    // Regex leve e robusto para e-mail
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      return { valid: false, message: 'Digite um e-mail válido (ex: nome@dominio.com).' };
    }
    if (trimmed.length > 254) {
      return { valid: false, message: 'E-mail muito longo.' };
    }
    return { valid: true };
  },
  
  // Validação de mensagem
  message(value) {
    const trimmed = value?.trim() || '';
    if (trimmed.length < 10) {
      return { valid: false, message: 'Mensagem deve ter pelo menos 10 caracteres.' };
    }
    if (trimmed.length > 5000) {
      return { valid: false, message: 'Mensagem deve ter no máximo 5000 caracteres.' };
    }
    return { valid: true };
  },
  
  // Validação de telefone (com máscara)
  phone(value) {
    const trimmed = value?.trim() || '';
    if (!trimmed) return { valid: true }; // opcional
    // Remove caracteres não numéricos
    const numbers = trimmed.replace(/\D/g, '');
    if (numbers.length < 10 || numbers.length > 11) {
      return { valid: false, message: 'Telefone deve ter 10 ou 11 dígitos (DDD + número).' };
    }
    // Verifica DDD (11 a 99)
    const ddd = parseInt(numbers.substring(0, 2));
    if (ddd < 11 || ddd > 99) {
      return { valid: false, message: 'DDD inválido.' };
    }
    return { valid: true };
  },
  
  // Campo obrigatório genérico
  required(value) {
    const trimmed = value?.trim() || '';
    if (!trimmed) {
      return { valid: false, message: 'Este campo é obrigatório.' };
    }
    return { valid: true };
  },
};
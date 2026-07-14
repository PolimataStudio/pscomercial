// js/forms/adapters/staticforms.js
import { FORM_CONFIG } from '../config.js';

export async function submitStaticForms(formData, endpoint) {
  // Converte FormData para objeto
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  // Adiciona proteção honeypot
  if (FORM_CONFIG.honeypot.enabled) {
    // O campo honeypot é oculto e deve ser ignorado se preenchido
    if (data[FORM_CONFIG.honeypot.fieldName]) {
      throw new Error('Spam detectado.');
    }
    delete data[FORM_CONFIG.honeypot.fieldName];
  }
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    // Timeout controlado externamente
    signal: AbortSignal.timeout(FORM_CONFIG.timeout),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro no servidor: ${response.status} - ${errorText}`);
  }
  
  // Static Forms retorna JSON com sucesso
  const result = await response.json();
  if (result.success === false) {
    throw new Error(result.message || 'Erro ao enviar mensagem.');
  }
  
  return result;
}
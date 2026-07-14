// js/forms/adapters/local.js
export async function submitLocal(formData) {
  // Simula atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Simula sucesso aleatório (95% de chance)
  if (Math.random() < 0.95) {
    return { success: true, message: 'Simulação enviada com sucesso!' };
  } else {
    throw new Error('Erro simulado na rede.');
  }
}
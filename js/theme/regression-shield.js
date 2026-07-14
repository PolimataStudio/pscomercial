// js/theme/regression-shield.js
export function runRegressionShield() {
  const checks = {
    navbar: !!document.querySelector('.navbar'),
    footer: !!document.querySelector('.footer'),
    hero: !!document.querySelector('.hero'),
    cards: !!document.querySelector('.card'),
    buttons: !!document.querySelector('.btn'),
    forms: !!document.querySelector('.form-group'),
  };

  let allPass = true;
  for (const [key, exists] of Object.entries(checks)) {
    if (!exists) {
      console.warn(`[RegressionShield] Componente "${key}" não encontrado!`);
      allPass = false;
    }
  }

  if (allPass) {
    console.log('[RegressionShield] Todos os componentes críticos estão presentes.');
  } else {
    console.error('[RegressionShield] Regressão estrutural detectada!');
  }

  return { allPass, checks };
}
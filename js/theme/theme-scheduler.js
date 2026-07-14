// js/theme/theme-scheduler.js
import { loadTheme } from './theme-loader.js';

/**
 * Mapeamento de meses para temas.
 * Mês: 0 = Janeiro, 1 = Fevereiro, 2 = Março, ..., 11 = Dezembro, 12 = blackfriday.
 * Ajuste os nomes dos temas conforme seus arquivos.
 */
const THEME_SCHEDULE = {
  0: 'reveillon-infinity',    // Janeiro
  1: 'carnaval-royale',  // Fevereiro
  2: 'equinocio',      // Março
  3: 'aurora-pascal',      // Abril
  4: 'guardioes-da-infancia',       // Maio
  5: 'arraia-imperial',      // Junho
  6: 'noites-do-sertao',      // Julho
  7: 'horizonte',     // Agosto
  8: 'independencia',   // Setembro
  9: 'aurora-rosa',    // Outubro
  10: 'horizonte-azul',  // Novembro
  11: 'natal',      // Dezembro
  12: 'blackfriday'  // blackfriday (opcional, se quiser um tema especial para Black Friday)
};

/**
 * Obtém o tema programado para o mês atual.
 * @returns {string|null} Nome do tema ou null se não houver programação.
 */
function getScheduledTheme() {
  // Força o mês de Dezembro (11) para testar o tema Natal
  const now = new Date(); //new Date(2026, 11, 1); // Ano, Mês (0-11), Dia
  const month = now.getMonth();
  return THEME_SCHEDULE[month] || null;
}

/**
 * Aplica o tema programado, se houver.
 * Sobrescreve o tema ativo em memória e recarrega.
 */
export async function applyScheduledTheme() {
  const themeId = getScheduledTheme();
  if (themeId) {
    console.log(`[ThemeScheduler] Tema programado para este mês: "${themeId}"`);
    await loadTheme(themeId);
  } else {
    console.log('[ThemeScheduler] Nenhum tema programado para este mês. Mantendo o tema atual.');
  }
}
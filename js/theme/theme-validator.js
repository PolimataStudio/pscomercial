// js/theme/theme-validator.js
import { getThemeConfig } from './theme-registry.js';

const resolver = window.PathResolver;

export async function validateTheme(themeId) {
  const config = await getThemeConfig(themeId);
  if (!config) {
    return { valid: false, errors: [`Tema "${themeId}" não encontrado no registry.`] };
  }

  const path = config.path || `themes/${themeId}/`;
  const errors = [];
  const warnings = [];

  // Verifica manifest.json
  const manifestUrl = resolver.resolve(path + 'manifest.json');
  try {
    const res = await fetch(manifestUrl);
    if (!res.ok) errors.push(`manifest.json não encontrado em ${manifestUrl}`);
  } catch (e) {
    errors.push(`Erro ao acessar manifest.json: ${e.message}`);
  }

  // Verifica theme.css
  const cssUrl = resolver.resolve(path + 'theme.css');
  try {
    const res = await fetch(cssUrl);
    if (!res.ok) errors.push(`theme.css não encontrado em ${cssUrl}`);
  } catch (e) {
    errors.push(`Erro ao acessar theme.css: ${e.message}`);
  }

  // (Opcional) Validação de contraste poderia ser adicionada aqui, mas seria pesada.
  // Para simplificar, apenas verificamos a existência dos arquivos.

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    path,
    config
  };
}
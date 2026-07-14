// js/theme/theme-loader.js
import { getActiveTheme, getThemeConfig, loadRegistry } from './theme-registry.js';
import { validateTheme } from './theme-validator.js';
import { captureSnapshot } from './theme-snapshot.js';
import { runRegressionShield } from './regression-shield.js';

const resolver = window.PathResolver;

let currentThemeId = null;
let isLoaded = false;

export async function loadTheme(themeId) {
  if (!themeId) {
    const reg = await loadRegistry();
    themeId = reg.active || 'default';
  }

  // Se já estiver carregado e for o mesmo tema, não recarrega
  if (isLoaded && currentThemeId === themeId) {
    console.log(`[ThemeLoader] Tema "${themeId}" já está carregado.`);
    return true;
  }

  // Valida o tema
  const validation = await validateTheme(themeId);
  if (!validation.valid) {
    console.error('[ThemeLoader] Validação falhou:', validation.errors);
    // Fallback para o tema default ou noites-do-sertao
    if (themeId !== 'default') {
      console.warn('[ThemeLoader] Tentando carregar tema default como fallback.');
      return loadTheme('default');
    } else {
      // Se o default também falhar, tenta o tema noites-do-sertao como último recurso
      console.warn('[ThemeLoader] Tema default falhou. Tentando noites-do-sertao.');
      return loadTheme('noites-do-sertao');
    }
    return false;
  }

  // Remove o CSS do tema anterior, se houver
  const oldLink = document.getElementById('polimata-theme-css');
  if (oldLink) oldLink.remove();

  // Cria o link para o novo CSS
  const cssUrl = resolver.resolve(validation.path + 'theme.css');
  const link = document.createElement('link');
  link.id = 'polimata-theme-css';
  link.rel = 'stylesheet';
  link.href = cssUrl;
  document.head.appendChild(link);

  // Aplica a classe ao body
  document.body.classList.remove('theme-' + currentThemeId);
  document.body.classList.add('theme-' + themeId);

  // Atualiza o estado
  currentThemeId = themeId;
  isLoaded = true;

  // Captura snapshot após carregamento
  captureSnapshot(themeId);

  // Executa regression shield
  runRegressionShield();

  console.log(`[ThemeLoader] Tema "${themeId}" carregado com sucesso.`);
  return true;
}

// Função para ser chamada na inicialização
export async function initTheme() {
  const active = await getActiveTheme();
  await loadTheme(active);
}
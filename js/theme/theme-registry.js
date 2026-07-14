// js/theme/theme-registry.js
const resolver = window.PathResolver;

let registry = null;

export async function loadRegistry() {
  if (registry) return registry;

  try {
    // Usa o PathResolver para obter o caminho absoluto do registry.json
    const registryUrl = resolver.resolve('themes/registry.json');
    const response = await fetch(registryUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} — ${registryUrl}`);
    }
    registry = await response.json();
    console.log('[ThemeRegistry] Registry carregado:', registry);
  } catch (error) {
    console.error('[ThemeRegistry] Falha ao carregar registry.json:', error);
    // Fallback: registry padrão
    registry = {
      active: 'default',
      themes: {
        default: {
          version: '1.0.0',
          enabled: true,
          path: 'themes/default/'
        },
        aurora: {
          version: '1.0.0',
          enabled: true,
          path: 'themes/aurora/'
        }
      }
    };
  }
  return registry;
}

export async function getActiveTheme() {
  const reg = await loadRegistry();
  return reg.active || 'default';
}

export async function getThemeConfig(themeId) {
  const reg = await loadRegistry();
  return reg.themes[themeId] || null;
}

export async function setActiveTheme(themeId) {
  const reg = await loadRegistry();
  if (reg.themes[themeId] && reg.themes[themeId].enabled !== false) {
    reg.active = themeId;
    // Como é um site estático, a alteração não persiste em disco.
    // Apenas armazenamos em memória para a sessão atual.
    console.log(`[ThemeRegistry] Tema ativo definido (em memória): ${themeId}`);
    return true;
  }
  console.warn(`[ThemeRegistry] Tema ${themeId} não encontrado ou desabilitado.`);
  return false;
}
// js/core/path-manager.js
// (Alias para PathResolver — mantido para compatibilidade)

(function(global) {
  'use strict';

  if (!global.PathResolver) {
    console.warn('[PathManager] PathResolver não encontrado. Carregando fallback...');
    // Fallback simples
    const base = global.PROJECT_BASE || '/';
    global.PathResolver = {
      resolve: (p) => base + p,
      resolveData: (p) => base + 'data/' + p,
      resolveComponent: (p) => base + 'components/' + p,
      resolveLink: (p) => base + p,
      resolveAsset: (p) => base + p,
      resolveDemoUrl: (d) => base + 'demos/' + (typeof d === 'string' ? d : d.url || ''),
      prefetchDemo: () => {},
      getBasePath: () => base,
      isDebug: () => false
    };
  }

  // PathManager é exatamente o PathResolver
  global.PathManager = global.PathResolver;

  console.log('[PathManager] Usando PathResolver com base:', global.PathResolver.getBasePath());
})(window);
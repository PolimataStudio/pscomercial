(function(global) {
  'use strict';
  if (!global.PathResolver) {
    console.warn('[Init] PathResolver não encontrado. Carregando fallback...');
    const script = document.createElement('script');
    script.src = (global.PROJECT_BASE || '/') + 'js/core/paths.js';
    script.async = false;
    document.head.appendChild(script);
  }
  if (global.PathResolver) global.PROJECT_BASE = global.PathResolver.getBasePath();
  document.addEventListener('DOMContentLoaded', function() {
    document.dispatchEvent(new CustomEvent('polimata-init-ready'));
  });
  console.log('[Init] Polímata Asset Resolution Layer inicializada.');
})(window);
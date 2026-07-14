// js/pwa.js
// Registro do Service Worker usando caminhos resolvidos

export function initPWA() {
  if ('serviceWorker' in navigator) {
    const resolver = window.PathResolver;
    if (!resolver) {
      console.warn('[PWA] PathResolver não disponível, usando caminho relativo.');
      return;
    }

    // Resolve o caminho do service-worker.js a partir da base
    const swUrl = resolver.resolve('service-worker.js');
    navigator.serviceWorker.register(swUrl)
      .then(reg => console.log('[PWA] Service Worker registrado com sucesso.', reg))
      .catch(err => console.warn('[PWA] Falha ao registrar Service Worker.', err));
  }

  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('[PWA] App rodando em modo standalone (PWA).');
  }
}
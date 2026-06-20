export function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pscomercial/service-worker.js')
      .then(reg => console.log('Service Worker registrado com sucesso.', reg))
      .catch(err => console.warn('Falha ao registrar Service Worker.', err));
  }

  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('App rodando em modo standalone (PWA).');
  }
}

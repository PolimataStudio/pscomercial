const CACHE_NAME = 'polimata-v1';
const urlsToCache = [
  './',
  './index.html',
  './pages/solucoes.html',
  './pages/producoes.html',
  './pages/sobre.html',
  './pages/contato.html',
  './demos/',
  './demos/church/',
  './demos/school/',
  './demos/author/',
  './demos/portfolio/',
  './components/navbar.html',
  './components/footer.html',
  './css/tokens.css',
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './css/pages.css',
  './js/app.js',
  './js/components.js',
  './js/router.js',
  './js/forms.js',
  './js/pwa.js',
  './js/analytics.js',
  './manifest/manifest.json',
  './assets/icons/favicon.ico',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
  // Adicione outros recursos estáticos conforme necessário (JSONs, imagens, etc.)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});
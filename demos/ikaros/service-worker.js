// service-worker.js - IKAROS Landing Page
const CACHE_NAME = 'ikaros-v1';
const ASSETS_TO_CACHE = [
  './',
  '/index.html',
  '/assets/icons/favicon.ico',
  '/assets/icons/favicon-32x32.png',
  '/assets/icons/favicon-16x16.png',
  '/assets/icons/apple-touch-icon.png',
  '/manifest.json',
  '/assets/images/book-cover.png',
  '/assets/images/profile.jpg',
  '/css/reset.css',
  '/css/variables.css',
  '/css/style.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/animations.css',
  '/css/responsive.css',
  '/css/utilities.css',
  '/js/script.js',
  '/js/animations.js',
  '/js/interactions.js',
  '/js/navigation.js',
  '/js/effects.js',
  '/manifest.json'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Cache aberto');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação - limpeza de caches antigos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retorna do cache
        if (response) {
          return response;
        }
        // Clone da requisição para fazer fetch
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(response => {
          // Verifica se é uma resposta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          // Clone da resposta para salvar no cache
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
      .catch(() => {
        // Fallback para offline
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});
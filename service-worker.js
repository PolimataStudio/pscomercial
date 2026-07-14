// service-worker.js
// Polímata PWA – Cache com stale-while-revalidate para imagens e fontes
// Versão: v5 (PPF – Performance Foundation)

const CACHE_NAME = 'polimata-v5';
const BASE = self.location.pathname.replace(/\/[^/]*$/, '/') || '/';

// Recursos estáticos a serem cacheados na instalação
const urlsToCache = [
  // Páginas principais
  './',
  './index.html',
  './pages/solucoes.html',
  './pages/producoes.html',
  './pages/sobre.html',
  './pages/contato.html',

  // Dados
  './data/solutions.json',
  './data/productions.json',
  './data/projects.json',
  './data/site.json',
  './data/contact.json',
  './data/demos.json',
  './data/categories.json',
  './data/testimonials.json',

  // Componentes
  './components/navbar.html',
  './components/footer.html',

  // CSS
  './css/tokens.css',
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './css/pages.css',

  // JavaScript principal
  './js/app.js',
  './js/components.js',
  './js/router.js',
  './js/forms.js',
  './js/pwa.js',
  './js/analytics.js',
  './js/catalog.js',
  './js/search.js',

  // Core
  './js/core/init.js',
  './js/core/data-loader.js',
  './js/core/loader.js',

  // PFX
  './js/forms/index.js',
  './js/forms/config.js',
  './js/forms/form-manager.js',
  './js/forms/toast.js',
  './js/forms/validators.js',
  './js/forms/adapters/staticforms.js',
  './js/forms/adapters/local.js',

  // PSEF 4.0
  './js/psef/index.js',
  './js/psef/PSEFConfig.js',
  './js/psef/PSEFCore.js',
  './js/psef/OverlayEngine.js',
  './js/psef/HUDEngine.js',
  './js/psef/NavigationEngine.js',
  './js/psef/InputEngine.js',
  './js/psef/ViewportEngine.js',
  './js/psef/AnimationEngine.js',

  // Theme Engine
  './js/theme/theme-loader.js',
  './js/theme/theme-registry.js',
  './js/theme/theme-scheduler.js',
  './js/theme/theme-validator.js',
  './js/theme/theme-snapshot.js',
  './js/theme/regression-shield.js',
  './js/theme/theme-coverage.js',

  // Temas (registry + todos os temas)
  './themes/registry.json',
  './themes/default/theme.css',
  './themes/aurora/theme.css',
  './themes/aurora-pascal/theme.css',
  './themes/aurora-rosa/theme.css',
  './themes/blackfriday/theme.css',
  './themes/carnaval-royale/theme.css',
  './themes/equinocio/theme.css',
  './themes/guardioes-da-infancia/theme.css',
  './themes/horizonte/theme.css',
  './themes/horizonte-azul/theme.css',
  './themes/independencia/theme.css',
  './themes/natal/theme.css',
  './themes/noites-do-sertao/theme.css',
  './themes/reveillon-infinity/theme.css',
  './themes/arraia-imperial/theme.css',

  // Manifest
  './manifest.json'
];

// Instalação: cacheia recursos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error('[ServiceWorker] Erro ao adicionar ao cache:', err))
  );
  self.skipWaiting();
});

// Ativação: limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptação de requisições com estratégia stale-while-revalidate para imagens e fontes
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Estratégia stale-while-revalidate para imagens e fontes
  if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        // Se tiver em cache, retorna imediatamente (stale)
        const fetchPromise = fetch(request).then(networkResponse => {
          // Atualiza o cache com a resposta da rede (revalidate)
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, clone);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Se falhar, retorna o cache mesmo que esteja vazio (fallback)
          return cachedResponse;
        });

        // Se tiver cache, devolve o cache e atualiza em segundo plano
        if (cachedResponse) {
          // Inicia a atualização em segundo plano sem bloquear
          fetchPromise.catch(() => {}); // ignora erros
          return cachedResponse;
        } else {
          // Se não tem cache, espera a rede
          return fetchPromise;
        }
      })
    );
    return;
  }

  // Para os demais recursos (HTML, CSS, JS, etc.) usa cache-first (fallback para rede)
  event.respondWith(
    caches.match(request)
      .then(response => response || fetch(request))
  );
});

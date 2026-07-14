// service-worker.js
// Polímata PWA – Cache de recursos estáticos
// Versão: v4 (PARP 3.0 – escopo dinâmico)

const CACHE_NAME = 'polimata-v4';

// A base será definida dinamicamente no momento do registro
// Usamos um caminho relativo para o cache, mas o escopo será definido no registro

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

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error('[ServiceWorker] Erro ao adicionar ao cache:', err))
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
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
});
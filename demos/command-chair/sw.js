const CACHE_NAME = 'command-chair-v1';
const ASSETS = [
    'index.html',
    'manifest.json',
    'icon-192.png',
    'icon-512.png',
    // Font Awesome e Google Fonts já são carregados via CDN
    // mas você pode adicionar outros assets estáticos
];

// Instalação – cache dos assets principais
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Ativação – limpa caches antigos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

// Interceptação de requisições – estratégia cache-first
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna do cache ou busca na rede
                return response || fetch(event.request)
                    .then(fetchRes => {
                        // Opcional: cacheia novas requisições
                        return caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, fetchRes.clone());
                                return fetchRes;
                            });
                    });
            })
            .catch(() => {
                // Fallback offline – pode retornar uma página padrão
                return new Response('Offline', { status: 503 });
            })
    );
});
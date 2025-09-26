
const CACHE_NAME = 'aiic-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './styles.css',
  './assets/logo-ui.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

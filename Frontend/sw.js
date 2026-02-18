const CACHE_NAME = 'ipl-auction-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/login.html',
  '/css/IpL.css',
  '/js/Ipl.js',
  '/js/roomManager.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).catch(err => {
          console.warn('Cache addAll failed:', err);
        });
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return fetch(event.request);
      })
  );
});
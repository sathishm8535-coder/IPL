const CACHE_NAME = 'ipl-auction-v1';
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
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});
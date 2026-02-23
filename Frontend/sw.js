const CACHE_NAME = 'ipl-auction-v5';
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
  // Skip Socket.IO and external requests
  if (event.request.url.includes('socket.io') ||
    event.request.url.includes('cdn.') ||
    !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Update cache dynamically
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return response;
      })
      .catch(() => {
        // Network failed, fallback to cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          return caches.match('/index.html');
        });
      })
  );
});
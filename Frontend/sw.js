const CACHE_NAME = 'ipl-auction-v4';
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
    caches.match(event.request)
      .then((response) => {
        if (response) return response;
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).catch(() => {
          // Return offline page or cached version
          return caches.match('/index.html');
        });
      })
  );
});
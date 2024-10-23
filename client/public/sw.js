// public/sw.js

self.addEventListener('install', (event) => {
    // Cache necessary files
    event.waitUntil(caches.open('email-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
      ]);
    }));
  });
  
  self.addEventListener('fetch', (event) => {
    // Respond with cached resources or fetch from network
    event.respondWith(caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }));
  });
  

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mysite-static-v3').then(function(cache) {
      return cache.addAll([
        'reset.css',
        'style.css',
        './battery.js',
        '/assets/batteries-n-stuff-optimized.svg',
        '/assets/joesomewhere.png',
        '/assets/heart.svg'
        // etc
      ]);
    })
  );
});
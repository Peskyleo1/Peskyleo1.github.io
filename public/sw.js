const staticCacheName = 'site-static-v1';
const assets = [
    '/',
    '/index.html',
    '/settings.html',
    '/skin.html',
    '/assets/css/argon-design-system.min.css',
    '/assets/css/customsliders.css',
    '/assets/css/darkmode.css',
    '/assets/css/material.css',
    '/assets/css/material.min.css',
    '/assets/css/style.css',
    '/assets/data/languages.json',
    '/assets/js/fitzpatrick.js',
    '/assets/js/index.js',
    '/assets/js/material.js',
    '/assets/js/material.min.js',
    '/assets/js/progressbar.min.js',
    '/assets/js/settings.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
    'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js'
];
// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});
// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
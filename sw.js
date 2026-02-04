const CACHE_NAME = 'bulmaca-super-v3';

self.addEventListener('install', (e) => {
    // console.log('[Service Worker] Install');
    self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
    // console.log('[Service Worker] Fetched resource '+e.request.url);
});

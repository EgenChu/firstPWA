const CACHE_NAME = "ouilocean-cache-v2";
const PRECACHE = [
  "/index.html",
  "/page1.html",
  "/page2.html",
  "/offline.html",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(() => caches.match(event.request)
        .then(cached => cached || caches.match("/offline.html"))
      )
  );
});

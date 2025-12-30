const CACHE_NAME = "ouilocean-cache-v1";
const PRECACHE = [
  "/index.html",
  "/offline.html",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png"
];

// Installer le service worker et précharger les fichiers essentiels
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// Activer le service worker immédiatement
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Intercepter toutes les requêtes réseau
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si la requête réussit, on peut éventuellement mettre en cache la réponse
        return response;
      })
      .catch(() => {
        // Si la requête échoue (pas d'Internet)
        return caches.match(event.request)
          .then(cachedResponse => cachedResponse || caches.match("/offline.html"));
      })
  );
});

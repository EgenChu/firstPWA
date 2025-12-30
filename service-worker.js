const CACHE_NAME = "oui-ocean-cache-v1";
const PRECACHE = [
  "index.html",
  "offline.html",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
});

// Interception de toutes les requêtes
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // Si hors-ligne et requête vers ouilocean.paris, renvoyer offline.html
        if (event.request.url.startsWith("https://ouilocean.paris")) {
          return caches.match("offline.html");
        }
        // Sinon, essayer de renvoyer depuis le cache
        return caches.match(event.request);
      })
  );
});

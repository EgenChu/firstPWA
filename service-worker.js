const CACHE_NAME = "oui-ocean-cache-v1";
const PRECACHE = [
  "index.html",
  "offline.html",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// Préchargement des fichiers essentiels
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
});

// Gestion des requêtes vers la PWA
self.addEventListener("fetch", event => {
  // On intercepte uniquement les requêtes vers notre PWA
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("offline.html"))
    );
  }
});

// Nom du cache
const CACHE_NAME = "oui-ocean-cache-v1";

// Fichiers locaux à mettre en cache à l'installation
const PRECACHE = [
  "index.html",
  "offline.html",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// Installation du service worker : mise en cache des fichiers essentiels
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
  );
});

// Activation du service worker (optionnel ici)
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Interception de toutes les requêtes de navigation vers la PWA
self.addEventListener("fetch", event => {
  // On cible uniquement les requêtes "navigate", c'est-à-dire quand l'utilisateur ouvre l'app
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request) // essaie de charger la page depuis le réseau
        .catch(() => caches.match("offline.html")) // si hors-ligne, renvoie offline.html
    );
  }
});

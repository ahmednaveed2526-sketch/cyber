const CACHE_NAME = "cyber-app-cache-v1";
const urlsToCache = [
  "index.html",
  "about.html",
  "learn.html",
  "quiz.html",
  "css/style.css",
  "js/script.js",
  "assets/icon-192.png",
  "assets/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

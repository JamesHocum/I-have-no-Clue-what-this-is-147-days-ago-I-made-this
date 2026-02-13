const CACHE_NAME = "lady-violet-terminal-v1"
const urlsToCache = [
  "/",
  "/manifest.json",
  "/images/lady-violet-avatar.jpg",
  // Add other static assets
]

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("🔥 Lady Violet: Service Worker installed and caching resources")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("🔥 Lady Violet: Cleaning up old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

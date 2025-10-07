//Estructura basica de un Service Worker

// 1. Nombre del cache y archivos a cachear
const CACHE_NAME = "mi-cache-v1";
const urlsToCache = [
    "index.html",
    "offline.html",
    "/icons/favicon-96x96.png",
    "/icons/favicon-192x192.png",
    "/icons/favicon-512x512.png",
];

// 2. Install - se ejecuta al instalar el SW
self.addEventListener("install", event =>{
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache=> cache.assAll(urlsToCache))
    );
});

// 3. Activate - se ejecuta al activar el SSW (limpia caches viejas)
self.addEventListener("activate", event=>{
    event.waitUntil(
        caches.keys().then(keys=>
            Promise.all(
                keys.filter(key=> key !== CACHE_NAME)
                .map(key=> caches.delete(key))
            )
        )
    )
});
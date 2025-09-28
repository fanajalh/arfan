self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("offline-cache").then(cache => {
      return cache.addAll([
        "/no.html",        // halaman offline
        "/style1.css",     // css utama
        "/style2.css"      // css tambahan
        // kalau ada gambar/logo bisa tambah juga: "/assets/logo.png"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // kalau request cocok dengan cache, pakai cache
      return caches.match(event.request).then(response => {
        // kalau tidak ada, fallback ke no.html
        return response || caches.match("/no.html");
      });
    })
  );
});
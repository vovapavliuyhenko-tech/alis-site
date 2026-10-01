// Service worker ÁLIS BEAUTY — ускорение повторных загрузок и работа без интернета.
// Стратегии: страницы — network-first с откатом в кэш; статика/картинки/шрифты —
// cache-first + фоновое обновление (stale-while-revalidate).
// Смена версии удаляет весь старый кэш у посетителей (см. activate)
const VERSION = "alis-v2";
const STATIC_CACHE = `static-${VERSION}`;
const PAGE_CACHE = `pages-${VERSION}`;

const PRECACHE_PAGES = ["/", "/salon", "/team", "/concierge", "/contacts", "/cooperation"];
const PRECACHE_ASSETS = [
  "/assets/logo-emblem-wine.png",
  "/assets/logo-word-wine.png",
  "/assets/logo-emblem-cream.png",
  "/assets/logo-word-cream.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const pages = await caches.open(PAGE_CACHE);
    const statics = await caches.open(STATIC_CACHE);
    // Кэшируем поштучно, чтобы одна ошибка не сорвала весь install
    await Promise.allSettled(PRECACHE_PAGES.map((u) => pages.add(u)));
    await Promise.allSettled(PRECACHE_ASSETS.map((u) => statics.add(u)));
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => !k.endsWith(VERSION)).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

const isStatic = (url) =>
  url.pathname.startsWith("/_next/static") ||
  url.pathname.startsWith("/assets") ||
  /\.(png|jpe?g|webp|avif|svg|ico|woff2?|css|js)$/.test(url.pathname);

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // только свой домен
  // Данные страниц Next.js (переходы по ссылкам внутри сайта) — всегда из сети,
  // иначе после обновления сайта показывалась бы старая версия
  if (url.searchParams.has("_rsc") || req.headers.get("RSC")) return;

  // Страницы (навигация): сеть → кэш → главная как офлайн-фолбэк
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const net = await fetch(req);
        const cache = await caches.open(PAGE_CACHE);
        cache.put(req, net.clone());
        return net;
      } catch {
        const cache = await caches.open(PAGE_CACHE);
        return (await cache.match(req)) || (await cache.match("/")) || Response.error();
      }
    })());
    return;
  }

  // Статика/картинки/шрифты: из кэша сразу + тихое обновление в фоне
  if (isStatic(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(req);
      const network = fetch(req)
        .then((net) => { if (net && net.ok) cache.put(req, net.clone()); return net; })
        .catch(() => cached);
      return cached || network;
    })());
  }
});

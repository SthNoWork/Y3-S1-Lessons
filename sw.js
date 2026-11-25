/* Study Hub offline service worker.
   Network-first, cache-fallback. Only active while the offline cache exists
   (created by the "Save Offline" toggle in index.html). */
const CACHE_NAME = 'study-hub-offline-v1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((k) => k.startsWith('study-hub-offline-') && k !== CACHE_NAME)
      .map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function putSafe(cache, url) {
  try {
    let res;
    try {
      res = await fetch(url, { cache: 'reload' });
    } catch (e) {
      res = await fetch(url, { mode: 'no-cors' });
    }
    if (res && (res.ok || res.type === 'opaque')) {
      await cache.put(url, res.clone());
      return res;
    }
  } catch (e) { /* ignore */ }
  return null;
}

async function cacheAll(urls) {
  const cache = await caches.open(CACHE_NAME);
  let ok = 0;
  let failed = 0;
  for (const url of urls) {
    const res = await putSafe(cache, url);
    if (res) {
      ok++;
      if (url.includes('fonts.googleapis.com') && res.type !== 'opaque') {
        try {
          const css = await res.clone().text();
          const fontUrls = Array.from(css.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)).map((m) => m[1]);
          for (const f of fontUrls) await putSafe(cache, f);
        } catch (e) { /* ignore */ }
      }
    } else {
      failed++;
    }
  }
  return { ok, failed };
}

self.addEventListener('message', (event) => {
  const data = event.data || {};
  const reply = (msg) => {
    if (event.ports && event.ports[0]) event.ports[0].postMessage(msg);
    else if (event.source) event.source.postMessage(msg);
  };
  if (data.type === 'CACHE_ALL') {
    event.waitUntil(cacheAll(data.urls || []).then((r) => reply({ type: 'CACHE_DONE', ok: r.ok, failed: r.failed })));
  } else if (data.type === 'CLEAR_CACHE') {
    event.waitUntil(caches.delete(CACHE_NAME).then(() => reply({ type: 'CACHE_CLEARED' })));
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || !/^https?:/.test(req.url)) return;
  event.respondWith((async () => {
    if (!(await caches.has(CACHE_NAME))) return fetch(req);
    const cache = await caches.open(CACHE_NAME);
    try {
      const res = await fetch(req);
      if (res && (res.ok || res.type === 'opaque')) {
        const url = new URL(req.url);
        if (url.origin === self.location.origin) {
          url.search = '';
          cache.put(url.href, res.clone());
        } else {
          cache.put(req, res.clone());
        }
      }
      return res;
    } catch (err) {
      if (req.mode === 'navigate') {
        return (await cache.match(new URL('./index.html', self.registration.scope).href)) ||
          (await cache.match(new URL('./', self.registration.scope).href)) ||
          (await cache.match(req, { ignoreSearch: true })) ||
          Response.error();
      }
      return (await cache.match(req, { ignoreSearch: true })) || Response.error();
    }
  })());
});

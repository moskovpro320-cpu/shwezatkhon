/* ရွှေဇာတ်ခုံ v36 – Network-first Service Worker (Auto-update)
   ─ CACHE_VERSION ကို ဗားရှင်းအသစ်ထွက်တိုင်း မြှင့်ပါ → activate မှာ cache အဟောင်းအားလုံး အလိုအလျောက်ဖျက်
   ─ HTML / JS / CSS / JSON (same-origin GET) = အရင် Network ကနေယူ၊ အောင်မြင်ရင် cache ကို update လုပ်၊
     အင်တာနက်ပြတ်မှ cache ထဲက ပြန်ပြ (Offline fallback)
   ─ မကြားဖြတ်တာ: Supabase API / Google OAuth / Cloudinary / CDN (cross-origin)၊ POST စတဲ့ GET မဟုတ်တာ၊
     ဗီဒီယို Range request၊ sw.js ကိုယ်တိုင်၊ OAuth callback (?code= / #access_token) ကို cache ထဲမထည့် */
var CACHE_VERSION = "shwezatkhon-v36";
var INDEX_KEY = "./index.html";

self.addEventListener("install", function () { self.skipWaiting(); });

self.addEventListener("activate", function (e) {
  e.waitUntil((async function () {
    try {
      var keys = await caches.keys();
      await Promise.all(keys.filter(function (k) { return k !== CACHE_VERSION; })
                            .map(function (k) { return caches.delete(k); }));
    } catch (_) {}
    try { if (self.registration.navigationPreload) await self.registration.navigationPreload.enable(); } catch (_) {}
    try { await self.clients.claim(); } catch (_) {}
  })());
});

self.addEventListener("message", function (e) {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});

function cacheable(res) {
  return res && res.ok && res.status === 200 && (res.type === "basic" || res.type === "default");
}
async function put(key, res) {
  try { var c = await caches.open(CACHE_VERSION); await c.put(key, res); } catch (_) {}
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  if (req.headers.has("range")) return;                 /* ဗီဒီယို seek / partial content */
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;      /* Supabase, Google, Cloudinary, CDN → browser က တိုက်ရိုက် */
  if (url.pathname.endsWith("/sw.js")) return;
  if (/\.(apk|sql|mp4|webm|mov)$/i.test(url.pathname)) return;

  /* စာမျက်နှာဖွင့်ခြင်း (navigation) */
  if (req.mode === "navigate") {
    e.respondWith((async function () {
      try {
        var res = (e.preloadResponse && await e.preloadResponse) || await fetch(req);
        if (cacheable(res) && !url.search.match(/[?&](code|access_token|refresh_token|error|type)=/)) {
          put(INDEX_KEY, res.clone());
        }
        return res;
      } catch (err) {
        var c = await caches.match(INDEX_KEY);
        if (c) return c;
        throw err;
      }
    })());
    return;
  }

  /* JS / CSS / JSON / ပုံ / font (same-origin) */
  e.respondWith((async function () {
    try {
      var res = await fetch(req, { cache: "no-cache" });  /* HTTP cache ကို ကျော်ပြီး server ကို revalidate */
      if (cacheable(res)) put(req, res.clone());
      return res;
    } catch (err) {
      var c = await caches.match(req, { ignoreSearch: true });
      if (c) return c;
      throw err;
    }
  })());
});

/* ရွှေဇာတ်ခုံ v10 – Cache မသိမ်းတဲ့ Service Worker
   - install/activate တိုင်း cache အားလုံးဖျက်
   - fetch ကို မကြားဖြတ် (browser က network ကို တိုက်ရိုက်သွား) → cache အဟောင်း ဘယ်တော့မှ မကပ်နိုင်
   - Supabase / Google OAuth redirect ကိုလည်း မထိခိုက်ပါ */
var CACHE_VERSION="shwezatkhon-v24"; /* Cache Version */
self.addEventListener("install",function(){self.skipWaiting()});
self.addEventListener("activate",function(e){
 e.waitUntil((async function(){
  try{var k=await caches.keys();await Promise.all(k.map(function(x){return caches.delete(x)}))}catch(_){}
  try{await self.clients.claim()}catch(_){}
 })())});
self.addEventListener("fetch",function(){/* မကြားဖြတ်ပါ */});

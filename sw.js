
const CACHE='forgfit-cache-v2';
const ASSETS=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./assets/icons/icon-192.png','./assets/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE&&caches.delete(k))))); self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const copy=resp.clone(); caches.open(CACHE).then(c=>{ if(e.request.method==='GET'&&resp.ok) c.put(e.request,copy);}); return resp;}).catch(()=>caches.match('./index.html'))));});
const CACHE='refugios-ipcet-v130';
const APP_SHELL=["./", "./index.html", "./manifest.webmanifest", "./validar.html", "./icon-180.png", "./icon-192.png", "./icon-512.png"];
self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL)).catch(()=>{}));
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('message',event=>{
  if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting();
});
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(req.mode==='navigate'||req.destination==='document'||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/validar.html')){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(req,{cache:'no-store'});
        const c=await caches.open(CACHE);c.put(req,fresh.clone());return fresh;
      }catch(e){return (await caches.match(req))||(await caches.match('./index.html'));}
    })());return;
  }
  event.respondWith((async()=>{
    const cached=await caches.match(req);
    const network=fetch(req).then(async res=>{
      if(res&&res.ok){const c=await caches.open(CACHE);c.put(req,res.clone());}
      return res;
    }).catch(()=>null);
    if(cached){event.waitUntil(network);return cached;}
    return (await network)||Response.error();
  })());
});

/* GitHub Pages adapter: compiled UI + saved display views, no Python API. */
(()=>{
 const base='/scouter-alpha-site';
 const local=url=>url.startsWith('/')&&!url.startsWith('//')&&!url.startsWith(base+'/')?base+url:url;
 const originalFetch=window.fetch.bind(window);
 window.fetch=async(input,init={})=>{
  const url=typeof input==='string'?input:input.url;
  const parsed=new URL(url,location.href);
  if(parsed.origin!==location.origin)return originalFetch(input,init);
  if(parsed.pathname==='/v1/review-ui/match')return originalFetch(`${base}/alpha-data/matches/${Number(parsed.searchParams.get('match_id'))}.json`);
  if(parsed.pathname==='/v1/review-ui/prediction-replay'){
   const body=JSON.parse(init.body||'{}');
   if(body.calculate)return new Response(JSON.stringify({error:'O recálculo precisa do servidor Python e não está disponível neste alfa.'}),{status:503});
   return originalFetch(`${base}/alpha-data/replays/${Number(body.match_id)}.json`);
  }
  if(parsed.pathname==='/v1/review-ui/season-simulate')return new Response('{}',{status:503});
  return originalFetch(local(parsed.pathname)+parsed.search,init);
 };
 for(const name of ['replaceState','pushState']){const original=history[name].bind(history);history[name]=(state,title,url)=>original(state,title,typeof url==='string'?local(url):url)}
 // Rewrite rendered navigation and image URLs without exporting private source.
 function adapt(){
  document.querySelectorAll('a[href^="/"],img[src^="/"]').forEach(el=>{const attr=el.tagName==='A'?'href':'src';const value=el.getAttribute(attr);if(value)el.setAttribute(attr,local(value))});
  document.querySelectorAll('.prediction-lab__recalculate').forEach(el=>{el.disabled=true;const text='Comparação ao vivo indisponível';if(el.textContent!==text)el.textContent=text});
  document.querySelectorAll('.prediction-lab__lock').forEach(el=>{const text='Aqui você explora resultados salvos. Escolha uma das quatro leituras no duelo de cenários.';if(el.textContent!==text)el.textContent=text});
 }
 addEventListener('DOMContentLoaded',()=>{
  const banner=document.createElement('div');banner.style.cssText='padding:9px 18px;background:#25266f;color:white;text-align:center;font:600 12px "IBM Plex Sans",sans-serif';banner.textContent='Versão alfa · explore previsões e cenários salvos';document.body.prepend(banner);
  const style=document.createElement('style');style.textContent='.scenario-probabilities>*{display:none!important}.scenario-probabilities::before{content:"Probabilidades: o recálculo precisa do servidor Python. Neste alfa, escolha resultados para explorar a tabela simulada.";display:block;font-size:13px;line-height:1.6}';document.head.append(style);
  new MutationObserver(()=>{observerTask()}).observe(document.getElementById('root'),{childList:true,subtree:true});adapt();
 });
 let pending=false;function observerTask(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;adapt()})}
})();

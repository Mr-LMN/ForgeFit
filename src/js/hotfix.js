const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

function domReady(fn){ document.readyState==='loading'
  ? document.addEventListener('DOMContentLoaded', fn, {once:true})
  : fn(); }

// --- Rest timer ---
const fmt = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
function parseRestSeconds(txt){
  if(!txt) return 90;
  const nums = String(txt).match(/\d+/g);
  if(!nums) return 90;
  let m = Math.max(...nums.map(n=>parseInt(n,10)));
  if (/min/i.test(txt) && m < 15) m *= 60;
  return m;
}
function startTimer(btn, secs){
  btn.disabled = true;
  let t = secs; btn.textContent = fmt(t);
  const id = setInterval(()=>{ t--;
    btn.textContent = fmt(Math.max(t,0));
    if(t<=0){ clearInterval(id); btn.disabled=false; btn.textContent='Rest'; }
  },1000);
}

function enhanceSession(){
  const session = $('#session'); if(!session) return;
  $$('.ex', session).forEach(exEl=>{
    if (exEl.querySelector('.btn-rest')) return;
    const grid = exEl.querySelector('.grid') || exEl;
    const right = exEl.querySelector('.right, .details, .ex-right');
    const secs = parseRestSeconds(right?.textContent || '');
    const b = document.createElement('button');
    b.className='btn-rest'; b.type='button'; b.textContent='Rest';
    b.addEventListener('click', ()=>startTimer(b, secs), {passive:true});
    grid.appendChild(b);

    // make names clickable via exLink(slug,name) if available
    const nameEl = exEl.querySelector('.ex-name');
    if (nameEl && typeof window.exLink === 'function' && !nameEl.querySelector('a')){
      const name = nameEl.textContent.trim();
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
      const tmp = document.createElement('div');
      try { tmp.innerHTML = window.exLink(slug, name)||''; } catch {}
      const a = tmp.querySelector('a');
      if (a && a.href){ nameEl.textContent=''; a.target='_blank'; a.rel='noopener'; nameEl.appendChild(a); }
    }
  });
}

function wireUI(){
  // Days
  $$('.day-btn').forEach(btn=>{
    const go=()=>{ $$('.day-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
      if (typeof window.render==='function') window.render(); setTimeout(enhanceSession,0); };
    btn.addEventListener('click', go, {passive:true});
    btn.addEventListener('touchstart', e=>{ e.preventDefault(); go(); }, {passive:false});
  });
  // Equipment toggles
  $$('.toggle, .equipment-toggle').forEach(t=>{
    const go=()=>{ t.classList.toggle('active');
      if (typeof window.render==='function') window.render(); setTimeout(enhanceSession,0); };
    t.addEventListener('click', go, {passive:true});
    t.addEventListener('touchstart', e=>{ e.preventDefault(); go(); }, {passive:false});
  });
  // HIIT
  const gen = $('#genHIIT') || $('#generate-hiit-btn');
  gen?.addEventListener('click', ()=>{ try{ window.generateHIIT?.(); }catch{} setTimeout(enhanceSession,0); }, {passive:true});
  // Export
  const exp = $('#export') || $('#export-logs-btn');
  exp?.addEventListener('click', ()=>{ try{ window.exportCSV?.(); }catch{} }, {passive:true});
}

function boot(){
  try{ window.render?.(); }catch(e){ console.warn('render() failed', e); }
  wireUI(); enhanceSession();
  // re-enhance if app re-renders HTML later
  let last = '';
  setInterval(()=>{ const s=$('#session'); if(!s) return;
    if (s.innerHTML !== last){ last = s.innerHTML; enhanceSession(); }
  }, 400);
}
domReady(boot);

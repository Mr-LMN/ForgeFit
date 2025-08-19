// src/js/hiit.js
const $ = (s, el=document) => el.querySelector(s);

const templates = [
  { name:'Greenfield 30/90', build:(pool)=> ({type:'Intervals', desc:'Ben Greenfield style engine work', mono: pool(1), rounds:10, on:30, off:90, cap:20}) },
  { name:'Philly EMOM',       build:(pool)=> ({type:'EMOM', desc:'Marcus Philly inspired EMOM', work:[{m:pool(1),reps:'8–12'},{m:pool(1),reps:'8–12'}], rounds:10, emom:true, cap:10}) },
  { name:'Chek Pyramid',      build:(pool)=> ({type:'For quality', desc:'Paul Chek primal pyramid', chipper:[pool(1),pool(1),pool(1)], scheme:'1‑2‑3‑4‑5‑4‑3‑2‑1'}) },
  { name:'Classic Chipper',   build:(pool)=> ({type:'For time', desc:'For time chipper', chipper:[pool(1),pool(1),pool(1),pool(1)], scheme:'50‑40‑30‑20', cap:20}) },
  { name:'21‑15‑9 WOD',       build:(pool)=> ({type:'For time', desc:'CrossFit 21‑15‑9 for time', items:[{m:pool(1),reps:'21'},{m:pool(1),reps:'15'},{m:pool(1),reps:'9'}], rft:1, cap:10}) },
  { name:'12‑min AMRAP',      build:(pool)=> ({type:'AMRAP', desc:'CrossFit style AMRAP', items:[{m:pool(1),reps:'12'},{m:pool(1),reps:'12'},{m:pool(1),reps:'12'}], amrap:12, cap:12}) }
];

function movementPool(){
  const has = id => document.querySelector(`#eq-${id}`)?.classList.contains('on');
  const list = [];
  if(has('bw')) list.push('Burpees','Push‑ups','Sit‑ups / V‑ups','Air Squats','Box Step‑ups (20–24")');
  if(has('airbike')) list.push('AirBike calories');
  if(has('ski')) list.push('SkiErg cals');
  if(has('wallball')) list.push('Wall Balls (9/10 ft)');
  if(has('kb')) list.push('KB Swings (Russian)','DB Snatch (alt)','KB Clean + Press (light)');
  if(has('powerbag')) list.push('Powerbag Clean to Shoulder');
  if(has('sled')) list.push('Sled Push/Drag (20–30 m)');
  if(has('ropes')) list.push('Battle Ropes (30s)');
  if(has('rope')) list.push('Jump Rope (DU/SU)');
  return list;
}

function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function generateHIIT(){
  const poolList = movementPool();
  const pool = (n)=>{ const copy=poolList.slice(); const out=[]; for(let i=0;i<n;i++){ out.push(copy.splice(Math.floor(Math.random()*copy.length),1)[0]); } return (out.length===1? out[0]: out); };
  const t = pick(templates); const p = t.build(pool); const out = { name:t.name, ...p };
  const el = $('#hiitResult'); el.innerHTML='';
  const card = document.createElement('div'); card.className='card';
  card.innerHTML = `<div class="sec-title">Random HIIT — ${out.name}</div><div class="muted">${out.desc||''}</div>`;
  const ul = document.createElement('ul');
  const add = x => { const li=document.createElement('li'); li.textContent=x; ul.appendChild(li); };
  if(out.type){ add(`${out.type}${out.cap?` — Cap ${out.cap} min`:''}`); }
  if(out.mono){ add(`${out.mono} — ${out.rounds}× ${out.on}s ON / ${out.off}s EASY`); }
  if(out.work){ out.work.forEach(w=> add(`${w.m} — ${w.reps}`)); add(`Rounds: ${out.rounds}`); add('EMOM: alternate the two lines above'); }
  if(out.chipper){ add(`Chipper: ${out.chipper.join(' + ')}`); add(`Scheme: ${out.scheme}`); }
  if(out.items && out.rft){ out.items.forEach(it=> add(`${it.m} — ${it.reps}`)); add(`Rounds for time: ${out.rft}`); }
  if(out.items && out.amrap){ add(`AMRAP ${out.amrap} min:`); out.items.forEach(it=> add(`${it.m} — ${it.reps}`)); }
  add('Scale load and reps as needed.');
  card.appendChild(ul); el.appendChild(card); window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});
}

document.addEventListener('DOMContentLoaded', ()=>{
  const btn = $('#genHIIT');
  btn && btn.addEventListener('click', generateHIIT);
});

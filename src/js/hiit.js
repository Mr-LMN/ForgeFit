// src/js/hiit.js
const $ = (s, el=document) => el.querySelector(s);

const templates = [
  { name:'Tabata Classic', build:(pool)=> ({desc:'8 rounds • 20s ON / 10s OFF', work:[{m:pool(1),reps:'max reps'}], rounds:8, on:20, off:10}) },
  { name:'EMOM Alternating 14′', build:(pool)=> ({desc:'Every minute on the minute, 14 minutes (alt movements)', work:[{m:pool(1),reps:'8–15'},{m:pool(1),reps:'8–15'}], rounds:7, emom:true}) },
  { name:'30/30 x 12', build:(pool)=> ({desc:'12 rounds: 30s hard / 30s easy', mono: pool(1), rounds:12, on:30, off:30}) },
  { name:'Ladder 10→1', build:(pool)=> ({desc:'For time: 10‑1 ladder', chipper:[pool(1), pool(1)], scheme:'10‑9‑…‑1'}) },
  { name:'3RFT Mixed', build:(pool)=> ({desc:'3 Rounds For Time', rft:3, items:[{m:pool(1),reps:'12'},{m:pool(1),reps:'200 m'},{m:pool(1),reps:'12'}]}) },
  { name:'Ropes & Rows', build:(pool)=> ({desc:'Intervals pairing ropes and monostructural', work:[{m:'Battle Ropes (30s)',reps:'hard'},{m:'SkiErg (30s)',reps:'moderate'}], rounds:10}) },
];

function movementPool(){
  const has = id => document.querySelector(`#eq-${id}`)?.classList.contains('on');
  const list = [];
  if(has('airbike')) list.push('AirBike calories');
  if(has('ski')) list.push('SkiErg cals');
  list.push('Burpees','Push‑ups','Sit‑ups / V‑ups');
  if(has('wallball')) list.push('Wall Balls (9/10 ft)');
  list.push('KB Swings (Russian)');
  if(has('powerbag')) list.push('Powerbag Clean to Shoulder');
  if(has('sled')) list.push('Sled Push/Drag (20–30 m)');
  if(has('ropes')) list.push('Battle Ropes (30s)');
  if(has('kb')) list.push('DB Snatch (alt)','KB Clean + Press (light)');
  if(has('rope')) list.push('Jump Rope (DU/SU)');
  list.push('Box Step‑ups (20–24")');
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
  if(out.mono){ add(`${out.mono} — ${out.rounds}× ${out.on}s ON / ${out.off}s EASY`); }
  if(out.work){ out.work.forEach(w=> add(`${w.m} — ${w.reps}`)); add(`Rounds: ${out.rounds}`); }
  if(out.emom){ add('EMOM: alternate the two lines above'); }
  if(out.chipper){ add(`Chipper: ${out.chipper.join(' + ')}`); add(`Scheme: ${out.scheme}`); }
  if(out.items){ out.items.forEach(it=> add(`${it.m} — ${it.reps}`)); add(`Rounds: ${out.rft}`); }
  card.appendChild(ul); el.appendChild(card); window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});
}

document.addEventListener('DOMContentLoaded', ()=>{
  const btn = $('#genHIIT');
  btn && btn.addEventListener('click', generateHIIT);
});

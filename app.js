import './improvements.js';
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>Array.from(el.querySelectorAll(s));
const storeKey = (w,d,id) => `ff::w${w}d${d}::${id}`;
const getPhase = (w)=> (w<=4?1:(w<=8?2:3));
const eqDefault = { airbike:true, sled:true, wallball:true, powerbag:true, ropes:true, medballs:true, ski:true, kb:true, rope:true };
const subs = {
  sled: 'No sled: heavy farmer carry or treadmill incline 10–15%.',
  airbike: 'No AirBike: rower, 200m run, or jump rope.',
  wallball: 'No wall ball: DB/KB thruster.',
  powerbag: 'No powerbag: DB/KB clean to front rack.',
  ropes: 'No battle ropes: KB swings or burpees.',
  ski: 'No SkiErg: any monostructural 200–300m / 45–60s moderate.',
};

let eq = JSON.parse(localStorage.getItem('ff_equipment_v2')||JSON.stringify(eqDefault));
const saveEq = ()=> localStorage.setItem('ff_equipment_v2', JSON.stringify(eq));

// link helper
function exLink(slug, label){
  return `<a href=\"./exercises/${slug}.html\" target=\"_blank\" rel=\"noopener\">${label}</a>`;
}

// ---- Plans (condensed; same content philosophy) ----
function phasePlan(phase){
  // Only key exercise IDs used for linking
  if(phase===1){
    return {
      1:{ title:'Lower‑Body Strength + Core', power:'Tall Clean Pulls + Front Squat (tech) 6×', warmup:['5′ easy AirBike','2rds: 10 Cossacks, 10 glute bridges, 30s dead‑hang'], exercises:[
        {id:'goblet-squat', label:'A1', group:'A', name: exLink('goblet-squat','Goblet Squat'), variant:'KB/DB; heel wedge ok', sets:'4', reps:'8–10 @3010', rest:'90s', notes:'Brace hard; depth you own'},
        {id:'romanian-deadlift', label:'A2', group:'A', name: exLink('romanian-deadlift','KB Romanian Deadlift'), variant:'Double KB/DB', sets:'4', reps:'10 @3010', rest:'90s', notes:'Hips back'},
        {id:'rfess', label:'B1', group:'B', name: exLink('rfess','RFESS'), variant:'DBs at sides', sets:'3', reps:'10/leg @2110', rest:'75s', notes:'Knee tracks'},
        {id:'side-plank', label:'B2', group:'B', name:'Side Plank', variant:'', sets:'3', reps:'30–45s', rest:'75s', notes:'Ribs down; glutes on'},
        {id:'sled', name: exLink('sled-push','Sled Push'), variant:'6×20–30 m, moderate', sets:'6', reps:'20–30 m', rest:'Walk back', notes: subs.sled }
      ], finisher:'AirBike 6′: 10s surge/20s easy'},
      2:{ title:'Upper Push/Pull + Carries', power:'Push Press EMOM 8×2 (skill)', warmup:['Band pull‑aparts • scap push‑ups • face pulls'], exercises:[
        {id:'db-bench', label:'A1', group:'A', name:'DB Bench Press', variant:'Neutral grip', sets:'4', reps:'8–12 @2111', rest:'90s', notes:'Feet planted'},
        {id:'row', label:'A2', group:'A', name:'1‑Arm DB Row', variant:'Bench‑supported', sets:'4', reps:'10/side', rest:'90s', notes:'Elbow tracks'},
        {id:'incline', label:'B1', group:'B', name:'Incline DB Press', variant:'30°', sets:'3', reps:'10–12', rest:'75s', notes:'Control down'},
        {id:'pullups', label:'B2', group:'B', name: exLink('pull-up','Pull‑ups / Inverted Rows'), variant:'Scale 6–12', sets:'3', reps:'6–12', rest:'75s', notes:'Full ROM'},
        {id:'carry', name:'Farmer Carry', variant:'Heavy DB/KB', sets:'4', reps:'30–40 m', rest:'60–90s', notes:'Ribs stacked'}
      ], finisher:'10′ easy AirBike nasal'},
      3:{ title:'Conditioning: Intervals + EMOM', warmup:['5–8′ easy AirBike'], exercises:[
        {id:'airbike-intervals', name: exLink('airbike-intervals','AirBike Intervals'), variant:'10× 30s hard / 90s easy @ RPE 7–8', sets:'10', reps:'30/90', rest:'—', notes: subs.airbike},
        {id:'emom', name:'EMOM 10 (alt)', variant:`1) ${exLink('wall-ball','Wall Balls')} ×10  2) ${exLink('kb-swing','KB Swings')} ×12 (Russian)`, sets:'10', reps:'Every 60s', rest:'—', notes:'Keep reps smooth'}
      ], finisher:'Walk 5–10′ nasal'},
      4:{ title:'Full‑Body FB', power:'KB Clean + Push Press (skill) — 6×3 light', warmup:['Band dislocates • hip airplanes • light goblet'], exercises:[
        {id:'bss', label:'A1', group:'A', name:'Bulgarian Split Squat', variant:'DBs', sets:'3', reps:'12/leg @2110', rest:'75s', notes:'Mid‑foot pressure'},
        {id:'ring-row', label:'A2', group:'A', name:'Ring/TRX Row', variant:'Strict', sets:'3', reps:'10–15', rest:'75s', notes:'Squeeze 1s'},
        {id:'db-inc', label:'B1', group:'B', name:'DB Incline Press', variant:'Neutral grip', sets:'3', reps:'10–12', rest:'75s', notes:'Soft lockout'},
        {id:'deadbug', label:'B2', group:'B', name:'Deadbug', variant:'Exhale on extend', sets:'3', reps:'10/side', rest:'60s', notes:'Low back down'},
        {id:'sled-drag', name:'Sled Drag (backwards)', variant:'Quad flush', sets:'4', reps:'20–30 m', rest:'60–90s', notes: subs.sled}
      ], finisher:'3′ easy spin'}
    };
  }
  if(phase===2){
    return {
      1:{ title:'Lower‑Body Strength + Power', power: exLink('hang-power-clean','Hang Power Clean')+' EMOM 6×2 @ 50–60%', warmup:['5′ easy • hinge & squat prep'], exercises:[
        {id:'front-squat', label:'A1', group:'A', name: exLink('front-squat','Front Squat'), variant:'Clean grip/straps', sets:'5', reps:'5 @31X1', rest:'120s', notes:'Elbows high'},
        {id:'rdl', label:'A2', group:'A', name:'Romanian Deadlift', variant:'BB/trap bar', sets:'4', reps:'6–8 @3010', rest:'120s', notes:'Hamstrings load'},
        {id:'lunge', label:'B1', group:'B', name:'DB Walking Lunge', variant:'Long stride', sets:'3', reps:'10/leg', rest:'75s', notes:'Tall chest'},
        {id:'hkr', label:'B2', group:'B', name:'Hanging Knee Raise', variant:'Pause at top', sets:'3', reps:'10–12', rest:'60–75s', notes:'Posterior tilt'},
        {id:'sled2', name:'Sled Push (heavier)', variant:'5×20–30m', sets:'5', reps:'20–30 m', rest:'Walk back', notes: subs.sled}
      ], finisher:'AirBike 6×30/90 @ RPE 8'},
      2:{ title:'Upper Push/Pull + Carries', power: exLink('push-press','Push Press')+' EMOM 8×2 @ 60–70%', warmup:['Band series • thoracic opener'], exercises:[
        {id:'bench', label:'A1', group:'A', name:'Bench Press', variant:'BB', sets:'5', reps:'5', rest:'120s', notes:'Leg drive'},
        {id:'csrow', label:'A2', group:'A', name:'Chest‑Supported Row', variant:'DBs/machine', sets:'4', reps:'8–10', rest:'120s', notes:'Squeeze 1s'},
        {id:'wpu', label:'B1', group:'B', name:'Pull‑ups (weighted/strict)', variant:'Scale to 4–6 reps', sets:'4', reps:'4–6', rest:'90s', notes:'Full ROM'},
        {id:'fr-carry', label:'B2', group:'B', name:'Front Rack Carry', variant:'DB/KB', sets:'4', reps:'20–30 m', rest:'60–90s', notes:'Ribs down'}
      ], finisher:'Breathing ladder (optional)'},
      3:{ title:'Conditioning: Intervals + Mixed Modal', warmup:['5–8′ easy • openers'], exercises:[
        {id:'bike-45-75', name:'AirBike Intervals', variant:'8× 45s hard / 75s easy', sets:'8', reps:'45/75', rest:'—', notes: subs.airbike},
        {id:'amrap15', name:'AMRAP 15', variant:'10 Powerbag Clean to Shoulder • 12 Box Step‑ups (20–24\") • 60–80 m Sled Push/Pull', sets:'—', reps:'15 min', rest:'—', notes: subs.powerbag + ' ' + subs.sled}
      ], finisher:'Walk 6–8′'},
      4:{ title:'FB + Carries (Power Emphasis)', power: exLink('hang-power-clean','Hang Power Clean')+' 6×2 @ 60–70%', warmup:['Clean pull drills • front squat light'], exercises:[
        {id:'landmine', label:'A1', group:'A', name:'Landmine Press', variant:'Half‑kneeling', sets:'4', reps:'8–10/side', rest:'75–90s', notes:'Ribs down'},
        {id:'nordic', label:'A2', group:'A', name:'Nordic Curl/Hamstring Slide', variant:'Assisted', sets:'3', reps:'6–8', rest:'90s', notes:'Slow lower'},
        {id:'chin', label:'B1', group:'B', name:'Chin‑ups / Pulldown', variant:'Supinated', sets:'3', reps:'AMRAP 6–12', rest:'75s', notes:'Elbows to ribs'},
        {id:'bearhug', label:'B2', group:'B', name:'Sandbag Bear Hug Carry', variant:'Med‑heavy', sets:'4', reps:'20–30 m', rest:'60–90s', notes:'Breathe behind shield'}
      ], finisher:'Sled Drag 4×30m'}
    };
  }
  return {
    1:{ title:'Lower‑Body Strength + Power', power: exLink('hang-power-clean','Power Clean')+' 6×2 @ 70–80%', warmup:['5–8′ easy • prep'], exercises:[
      {id:'back-squat', label:'A1', group:'A', name: exLink('back-squat','Back Squat'), variant:'High bar', sets:'5', reps:'3', rest:'150s', notes:'Brace strong'},
      {id:'deadlift', label:'A2', group:'A', name:'Trap‑Bar or Conventional Deadlift', variant:'Mixed grip/straps', sets:'4', reps:'3–5', rest:'150s', notes:'No grind'},
      {id:'pallof', label:'B1', group:'B', name:'Pallof Press', variant:'Cable/band', sets:'3', reps:'12/side', rest:'60s', notes:'Resist rotation'},
      {id:'rev-lunge', label:'B2', group:'B', name:'Barbell Reverse Lunge', variant:'From rack', sets:'3', reps:'6–8/leg', rest:'75–90s', notes:'Soft touch'},
      {id:'sledH', name:'Sled Push (heavier)', variant:'4×20–30 m', sets:'4', reps:'20–30 m', rest:'Walk back', notes: subs.sled}
    ], finisher:'AirBike 6×20/100 @ RPE 9'},
    2:{ title:'Upper Power + Strength', power:'Split Jerk 8×1 @ 60–75%', warmup:['Band + thoracic openers'], exercises:[
      {id:'incline-bench', label:'A1', group:'A', name:'Incline Bench Press', variant:'BB/DB', sets:'4', reps:'6–8', rest:'120s', notes:'No bounce'},
      {id:'pendlay', label:'A2', group:'A', name:'Pendlay Row', variant:'From floor', sets:'4', reps:'6–8', rest:'120s', notes:'Explosive up'},
      {id:'dips', label:'B1', group:'B', name:'Ring/Bar Dips', variant:'Assist as needed', sets:'3', reps:'6–10', rest:'90s', notes:'Shoulders down/back'},
      {id:'suitcase', label:'B2', group:'B', name:'Suitcase Carry', variant:'KB/DB heavy', sets:'4', reps:'30–40 m/side', rest:'45–60s', notes:'Don’t lean'}
    ], finisher:'8′ flush'},
    3:{ title:'Conditioning: Sprint + Metcon', warmup:['8′ easy • drill wall ball/burpee'], exercises:[
      {id:'spr', name:'AirBike Sprints', variant:'10× 20s all‑out / 100s easy', sets:'10', reps:'20/100', rest:'—', notes:'Keep repeatable power'},
      {id:'ft4', name:'For Time — 4 Rounds (CAP 16′)', variant:`15 ${exLink('wall-ball','Wall Balls')} • 10 Burpees over line • 10/8 cals AirBike`, sets:'4 rds', reps:'—', rest:'—', notes:'Steady pace'}
    ], finisher:'Walk 5–8′'},
    4:{ title:'Full‑Body Power + FB', power: exLink('hang-power-clean','Power Clean')+' + Push Press 5×2 @ 70–75%', warmup:['Tall cleans • front squat light • bridges'], exercises:[
      {id:'thruster', label:'A1', group:'A', name:'Thruster', variant:'BB/DB', sets:'4', reps:'6', rest:'120s', notes:'Vertical path'},
      {id:'hipthrust', label:'A2', group:'A', name:'Barbell Hip Thrust', variant:'Pause 1s top', sets:'4', reps:'6–8', rest:'120s', notes:'Neutral spine'},
      {id:'tgu', label:'B1', group:'B', name:'Turkish Get‑Up', variant:'KB', sets:'3', reps:'3/side', rest:'75–90s', notes:'Eyes on bell'},
      {id:'rowv', label:'B2', group:'B', name:'Chest‑Supported or Ring Row', variant:'Strict', sets:'3', reps:'10–12', rest:'75–90s', notes:'2s squeeze top'}
    ], finisher:'6′ 20/40 micro‑intervals'}
  };
}

// HIIT generator with wider equipment pool
const templates = [
  { name:'Tabata Classic', build:(pool)=> ({desc:'8 rounds • 20s ON / 10s OFF', work:[{m:pool(1),reps:'max reps'}], rounds:8, on:20, off:10}) },
  { name:'EMOM Alternating 14′', build:(pool)=> ({desc:'Every minute on the minute, 14 minutes (alt movements)', work:[{m:pool(1),reps:'8–15'},{m:pool(1),reps:'8–15'}], rounds:7, emom:true}) },
  { name:'30/30 x 12', build:(pool)=> ({desc:'12 rounds: 30s hard / 30s easy', mono: pool(1), rounds:12, on:30, off:30}) },
  { name:'Ladder 10→1', build:(pool)=> ({desc:'For time: 10‑1 ladder', chipper:[pool(1), pool(1)], scheme:'10‑9‑…‑1'}) },
  { name:'3RFT Mixed', build:(pool)=> ({desc:'3 Rounds For Time', rft:3, items:[{m:pool(1),reps:'12'},{m:pool(1),reps:'200 m'},{m:pool(1),reps:'12'}]}) },
  { name:'Ropes & Rows', build:(pool)=> ({desc:'Intervals pairing ropes and monostructural', work:[{m:'Battle Ropes (30s)',reps:'hard'},{m:'SkiErg (30s)',reps:'moderate'}], rounds:10}) },
];

function movementPool(){
  const e = JSON.parse(localStorage.getItem('ff_equipment_v2')||'{}');
  const list = [];
  if(e.airbike) list.push('AirBike calories');
  if(e.ski) list.push('SkiErg cals');
  list.push('Burpees','Push‑ups','Sit‑ups / V‑ups');
  if(e.wallball) list.push('Wall Balls (9/10 ft)');
  list.push('KB Swings (Russian)');
  if(e.powerbag) list.push('Powerbag Clean to Shoulder');
  if(e.sled) list.push('Sled Push/Drag (20–30 m)');
  if(e.ropes) list.push('Battle Ropes (30s)');
  if(e.kb) list.push('DB Snatch (alt)','KB Clean + Press (light)');
  if(e.rope) list.push('Jump Rope (DU/SU)');
  list.push('Box Step‑ups (20–24\")');
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
  const ul = document.createElement('ul'); const add = (x)=>{ const li=document.createElement('li'); li.textContent=x; ul.appendChild(li); };
  if(out.mono){ add(`${out.mono} — ${out.rounds}× ${out.on}s ON / ${out.off}s EASY`); }
  if(out.work){ out.work.forEach(w=> add(`${w.m} — ${w.reps}`)); add(`Rounds: ${out.rounds}`); }
  if(out.emom){ add('EMOM: alternate the two lines above'); }
  if(out.chipper){ add(`Chipper: ${out.chipper.join(' + ')}`); add(`Scheme: ${out.scheme}`); }
  if(out.items){ out.items.forEach(it=> add(`${it.m} — ${it.reps}`)); add(`Rounds: ${out.rft}`); }
  card.appendChild(ul); el.appendChild(card); window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});
}

// CSV export
function exportLogs(){
  const rows = [['Week','Day','ExerciseID','Exercise','Variant','Log']];
  for(let w=1; w<=12; w++){ const phase = getPhase(w), plan = phasePlan(phase);
    for(let d=1; d<=4; d++){ const ses = plan[d]; if(!ses) continue;
      (ses.exercises||[]).forEach(ex=>{
        const key = storeKey(w,d,ex.id);
        const v = localStorage.getItem(key) || '';
        if(v) rows.push([String(w), String(d), ex.id, ex.name.replace(/<[^>]+>/g,''), (ex.variant||'').replace(/<[^>]+>/g,''), v]);
      });
    }
  }
  const csv = rows.map(r => r.map(x=>`"${(x||'').replaceAll('"','""')}"`).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
  const a = document.createElement('a'); a.href=url; a.download='ForgeFit_logs.csv'; a.click(); URL.revokeObjectURL(url);
}

let state = { week:1, day:1 };
function render(){
  const phase = getPhase(state.week);
  const plan = phasePlan(phase)[state.day];
  $('#weekVal').textContent = `Week ${state.week} — Phase ${phase}`;
  $$('.day-btn').forEach((b,i)=> b.classList.toggle('active', (i+1)===state.day));
  // toggles
  ['airbike','sled','wallball','powerbag','ropes','medballs','ski','kb','rope'].forEach(k=> $('#eq-'+k).classList.toggle('on', !!eq[k]));
  // session
  const sec = $('#session'); sec.innerHTML='';
  const c = document.createElement('div'); c.className='card';
  const head = document.createElement('div');
  head.innerHTML = `<div class="sec-title">D${state.day} — ${plan.title}</div>${plan.power?('<div class="muted">Power: '+plan.power+'</div>'):''}`;
  c.appendChild(head);
  const wu = document.createElement('div'); wu.innerHTML = '<div class="sec-title">Warm‑up</div>';
  const ul = document.createElement('ul'); (plan.warmup||[]).forEach(w=>{ const li=document.createElement('li'); li.textContent=w; ul.appendChild(li); }); wu.appendChild(ul); c.appendChild(wu);
  sec.appendChild(c);
  (plan.exercises||[]).forEach(ex=>{
    const exEl = document.createElement('div'); exEl.className='ex';
    const top = document.createElement('div'); top.className='ex-top';
    const left = document.createElement('div');
    left.innerHTML = `<div class="ex-name">${ex.name} ${ex.label?('<span class="badge">'+ex.label+'</span>'):''}</div>` + (ex.variant? `<div class="ex-variant">Variant: ${ex.variant}</div>`:'');
    top.appendChild(left);
    if(ex.group){ const tag = document.createElement('span'); tag.className='badge'; tag.textContent='Superset '+ex.group; top.appendChild(tag); }
    exEl.appendChild(top);
    const grid = document.createElement('div'); grid.className='ex-grid';
    const logval = localStorage.getItem(storeKey(state.week,state.day,ex.id))||'';
    grid.innerHTML = `
      <div class="field"><div class="lab">Sets</div><div class="val">${ex.sets}</div></div>
      <div class="field"><div class="lab">Reps/Tempo</div><div class="val">${ex.reps}</div></div>
      <div class="field"><div class="lab">Rest</div><div class="val">${ex.rest||'60–120s'}</div></div>
      <div><div class="lab" style="font-size:11px;color:#6a6a6a">Top set weight & notes</div>
        <input class="input" value="${logval}" placeholder="e.g., 42.5 kg × 8 @ RPE 8"
          oninput="localStorage.setItem('${storeKey(state.week,state.day,ex.id)}', this.value)"></div>`;
    exEl.appendChild(grid);
    if(ex.notes){ const p=document.createElement('div'); p.className='hint'; p.textContent=ex.notes; exEl.appendChild(p); }
    $('#session').appendChild(exEl);
  });
  if(plan.finisher){ const f=document.createElement('div'); f.className='hint'; f.textContent='Finisher: '+plan.finisher; $('#session').appendChild(f); }
}

function init(){
  // week/day
  $('#week').addEventListener('input', e=>{ state.week = parseInt(e.target.value,10); render(); });
  $$('.day-btn').forEach((b,i)=> b.addEventListener('click', ()=>{ state.day = (i+1); render(); }));
  // equipment toggles
  ['airbike','sled','wallball','powerbag','ropes','medballs','ski','kb','rope'].forEach(k=>{
    $('#eq-'+k).addEventListener('click', ()=>{ eq[k]=!eq[k]; saveEq(); render(); });
  });
  // actions
  $('#genHIIT').addEventListener('click', generateHIIT);
  $('#export').addEventListener('click', exportLogs);
  // install prompt\n  let deferred=null; window.addEventListener('beforeinstallprompt', e=>{ e.preventDefault(); deferred=e; $('#install').style.display='inline-flex'; });\n  $('#install').addEventListener('click', ()=>{ if(deferred){ deferred.prompt(); deferred=null; $('#install').style.display='none'; }});\n  render();\n}\n\ndocument.addEventListener('DOMContentLoaded', init);\n

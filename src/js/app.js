// src/js/app.js
import { buildPlan } from "./plan.js";
import * as Store from "./storage.js";

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

const state = {
  week: 1,
  day: "D1",
  eq: { bw:true, airbike:true, sled:true, wallball:true, powerbag:true, ropes:true, skierg:true, kb:true, rope:true }
};

const PLAN = buildPlan();

function exerciseRow(wk, day, ex, idx){
  const key = Store.keyFor(wk, day, ex.name);
  const prev = Store.getLog(key) || {};
  const name = `<span class="ex-name">${ex.name}</span>${ex.variant?` <span class="badge">${ex.variant}</span>`:""}`;

  return `
    <div class="ex" data-name="${ex.name}">
      <div class="grid">
        <div class="left">
          ${name}
          <div class="meta">Sets: ${ex.sets} • Reps: ${ex.reps} • Rest: ${ex.rest}${ex.note?` • ${ex.note}`:""}</div>
        </div>
        <div class="right">
          <label>Wt <input type="number" step="0.5" class="inp-w" value="${prev.wt??""}"></label>
          <label>RPE <input type="number" step="0.5" class="inp-rpe" value="${prev.rpe??""}"></label>
          <label>Notes <input type="text" class="inp-notes" value="${prev.notes??""}"></label>
          <button class="btn save">Save</button>
        </div>
      </div>
    </div>`;
}

export function render(){
  $("#weekVal").textContent = `Week ${state.week} — ${phaseOf(state.week)}`;
  $$(".day-btn").forEach(b => b.classList.toggle("active", b.textContent === state.day.replace("D","D")));
  const wrap = $("#session"); if(!wrap) return;
  const todays = PLAN[state.week][state.day];
  wrap.innerHTML = todays.map((ex,i)=>exerciseRow(state.week, state.day, ex, i)).join("");
  bindRowEvents();

  const isHIIT = state.day === "D3";
  const eqCard = $("#eq-card");
  const hiitBtn = $("#genHIIT");
  const actions = $("#actionsRow");
  if(eqCard) eqCard.style.display = isHIIT ? "block" : "none";
  if(hiitBtn) hiitBtn.style.display = isHIIT ? "block" : "none";
  if(actions) actions.style.gridTemplateColumns = isHIIT ? "1fr 1fr" : "1fr";
  if(!isHIIT){ const out=$("#hiitResult"); if(out) out.innerHTML=""; }
}

function phaseOf(w){
  if (w<=4) return "Phase 1"; if(w<=8) return "Phase 2"; return "Phase 3";
}

function bindRowEvents(){
  $$("#session .ex").forEach(exEl=>{
    const name = exEl.dataset.name;
    const wt = $(".inp-w", exEl);
    const rpe = $(".inp-rpe", exEl);
    const notes = $(".inp-notes", exEl);
    $(".btn.save", exEl).addEventListener("click", ()=>{
      Store.saveLog(Store.keyFor(state.week, state.day, name), {
        wt: wt.value, rpe: rpe.value, notes: notes.value, ts: Date.now()
      });
      exEl.classList.add("saved");
      setTimeout(()=>exEl.classList.remove("saved"), 800);
    });
  });
}

// ---- UI events
document.addEventListener("DOMContentLoaded", ()=>{
  const wk = $("#week"); if (wk){
    wk.addEventListener("input", ()=>{ state.week = +wk.value; render(); });
  }
  $$(".day-btn").forEach(b=> b.addEventListener("click", ()=>{
    state.day = "D"+b.textContent.trim().replace("D","");
    render();
  }));

  $$(".toggle").forEach(t=>{
    t.addEventListener("click", ()=>{
      const id = t.id || t.textContent.toLowerCase().replace(/\s+/g,'');
      state.eq[id] = !state.eq[id];
      t.classList.toggle("on", !!state.eq[id]);
      render();
    });
  });

  const exp = $("#export"); exp && exp.addEventListener("click", Store.exportCSV);

  render();
});

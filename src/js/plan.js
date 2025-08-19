// src/js/plan.js

export const PHASES = {
  1: {
    D1: [
      { name: "Front Squat",   variant: "barbell", sets: 4, reps: "6–8", rest: "120s", group:"A", equipment:"barbell", slug:"front-squat" },
      { name: "Romanian Deadlift", variant: "barbell", sets: 3, reps: "8–10", rest: "90s", group:"B", equipment:"barbell", slug:"romanian-deadlift" },
      { name: "Walking Lunge", variant: "db/kb", sets: 3, reps: "10/leg", rest: "60–90s", equipment:"dumbbell", slug:"lunge" },
      { name: "Calf Raise",    variant: "standing", sets: 3, reps: "12–15", rest: "45–60s", equipment:"machine", slug:"calf-raise" }
    ],
    D2: [
      { name: "Pull-ups/Inverted Rows", variant:"as able", sets: 4, reps:"6–10", rest:"90s", equipment:"bar", slug:"pull-up"},
      { name: "DB Bench/Push-ups", variant:"db/bench", sets: 4, reps:"8–12", rest:"90s", equipment:"bench", slug:"db-bench-press"},
      { name: "Single-arm Row",  variant:"db/kb", sets: 3, reps:"10/side", rest:"60–90s", equipment:"dumbbell", slug:"one-arm-row"},
      { name: "Face Pull",       variant:"cable/band", sets: 3, reps:"12–15", rest:"45–60s", equipment:"cable", slug:"face-pull"}
    ],
    D3: [],
    D4: [
      { name:"Hang Power Clean", variant:"barbell", sets:5, reps:"3–5", rest:"120s", equipment:"barbell", slug:"hang-power-clean"},
      { name:"Push Press",       variant:"barbell", sets:4, reps:"4–6", rest:"120s", equipment:"barbell", slug:"push-press" },
      { name:"KB Swing",         variant:"hardstyle", sets:3, reps:"15", rest:"60–90s", equipment:"kb", slug:"kettlebell-swing" },
      { name:"Farmer Carry",     variant:"heavy", sets:3, reps:"30–40m", rest:"60–90s", equipment:"kb", slug:"farmer-carry" }
    ]
  },
  2: {
    D1: [
      { name: "Back Squat",   variant:"barbell", sets:4, reps:"5–6", rest:"120s", group:"A", equipment:"barbell", slug:"back-squat" },
      { name: "Deadlift",      variant:"barbell", sets:3, reps:"5–6", rest:"120s", group:"B", equipment:"barbell", slug:"deadlift" },
      { name: "Reverse Lunge", variant:"db/kb", sets:3, reps:"8/leg", rest:"60–90s", equipment:"dumbbell", slug:"reverse-lunge" },
      { name: "Seated Calf Raise", variant:"machine", sets:3, reps:"10–12", rest:"45–60s", equipment:"machine", slug:"calf-raise" }
    ],
    D2: [
      { name: "Weighted Pull-up/Chin-up", variant:"as able", sets:4, reps:"5–8", rest:"90s", equipment:"bar", slug:"pull-up" },
      { name: "Barbell Bench Press",      variant:"barbell", sets:4, reps:"6–8", rest:"120s", equipment:"barbell", slug:"bench-press" },
      { name: "Bent-over Row",            variant:"barbell", sets:3, reps:"8–10", rest:"90s", equipment:"barbell", slug:"row" },
      { name: "Band Pull-apart",          variant:"band", sets:3, reps:"15–20", rest:"45–60s", equipment:"band", slug:"band-pull-apart" }
    ],
    D3: [],
    D4: [
      { name:"Power Clean",  variant:"from floor", sets:5, reps:"3",   rest:"120s", equipment:"barbell", slug:"power-clean" },
      { name:"Push Jerk",    variant:"barbell",    sets:4, reps:"3–5", rest:"120s", equipment:"barbell", slug:"push-jerk" },
      { name:"KB Swing",     variant:"heavy",      sets:3, reps:"12",  rest:"60–90s", equipment:"kb", slug:"kettlebell-swing" },
      { name:"Farmer Carry", variant:"longer",     sets:3, reps:"40–50m", rest:"60–90s", equipment:"kb", slug:"farmer-carry" }
    ]
  },
  3: {
    D1: [
      { name: "Pause Front Squat", variant:"3s pause", sets:4, reps:"3–5", rest:"120s", group:"A", equipment:"barbell", slug:"front-squat" },
      { name: "Deadlift",          variant:"heavy",    sets:3, reps:"3–5", rest:"150s", group:"B", equipment:"barbell", slug:"deadlift" },
      { name: "Bulgarian Split Squat", variant:"db/kb", sets:3, reps:"8/leg", rest:"60–90s", equipment:"dumbbell", slug:"rfess" },
      { name: "Calf Raise",        variant:"heavy",   sets:3, reps:"8–10", rest:"60s",   equipment:"machine",  slug:"calf-raise" }
    ],
    D2: [
      { name: "Weighted Pull-up",     variant:"heavy", sets:4, reps:"4–6", rest:"120s", equipment:"bar", slug:"pull-up" },
      { name: "Barbell Bench Press",  variant:"heavy", sets:4, reps:"4–6", rest:"120s", equipment:"barbell", slug:"bench-press" },
      { name: "Pendlay Row",          variant:"barbell", sets:3, reps:"6–8", rest:"90s", equipment:"barbell", slug:"row" },
      { name: "Face Pull",            variant:"cable/band", sets:3, reps:"12–15", rest:"45–60s", equipment:"cable", slug:"face-pull" }
    ],
    D3: [],
    D4: [
      { name:"Clean & Jerk",  variant:"barbell", sets:5, reps:"2–3", rest:"150s", equipment:"barbell", slug:"clean-and-jerk" },
      { name:"Push Press",    variant:"heavy",   sets:4, reps:"3–5", rest:"120s", equipment:"barbell", slug:"push-press" },
      { name:"KB Snatch",     variant:"alt.",   sets:3, reps:"10/arm", rest:"60–90s", equipment:"kb", slug:"kettlebell-snatch" },
      { name:"Farmer Carry",  variant:"heavy",   sets:3, reps:"30–40m", rest:"60–90s", equipment:"kb", slug:"farmer-carry" }
    ]
  }
};

// week modifiers: % intensity change or set tweaks
const WEEK_TUNING = {
  1:{vol:1.00}, 2:{vol:1.05}, 3:{vol:1.10}, 4:{vol:0.85}, // deload
  5:{vol:1.05}, 6:{vol:1.10}, 7:{vol:1.15}, 8:{vol:0.90}, // deload
  9:{vol:1.10}, 10:{vol:1.15}, 11:{vol:1.20}, 12:{vol:0.95, note:"test/peak"},
};

// Expand reps strings like "6–8" toward the top of range as volume↑
function tweakReps(reps, vol){
  const m = reps.match(/(\d+)\D+(\d+)/);
  if(!m) return reps;
  let [ , lo, hi ] = m.map(Number);
  const span = hi - lo;
  const bump = Math.round(span * Math.min(0.4, Math.max(0, vol-1))); // up to 40% toward hi
  return `${lo + bump}–${hi}`;
}

export function buildPlan(){
  const plan = {};
  for(let w=1; w<=12; w++){
    const t = WEEK_TUNING[w] || {vol:1};
    const phase = w<=4 ? 1 : w<=8 ? 2 : 3;
    plan[w] = {};
    ["D1","D2","D3","D4"].forEach(day=>{
      const base = PHASES[phase][day] || [];
      plan[w][day] = base.map(x => ({
        ...x,
        reps: typeof x.reps === "string" ? tweakReps(x.reps, t.vol) : x.reps,
        note: t.note || ""
      }));
    });
  }
  return plan;
}

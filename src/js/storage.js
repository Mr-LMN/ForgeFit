// src/js/storage.js
const NS = "forgefit";

export const keyFor = (week, day, name) => `${NS}:${week}:${day}:${name}`;

export function getLog(key){
  try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; }
}
export function saveLog(key, obj){
  localStorage.setItem(key, JSON.stringify(obj));
}

export function exportCSV(){
  const rows = [["Week","Day","Exercise","Weight","RPE","Notes","Timestamp"]];
  for (let i=0; i<localStorage.length; i++){
    const k = localStorage.key(i);
    if (!k.startsWith(`${NS}:`)) continue;
    const [ , week, day, ...rest ] = k.split(":");
    const exName = rest.join(":");
    const v = getLog(k) || {};
    rows.push([week,day,exName,v.wt??"",v.rpe??"", (v.notes??"").replace(/,/g,";"), new Date(v.ts||Date.now()).toISOString()]);
  }
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "forgefit-logs.csv";
  a.click();
}

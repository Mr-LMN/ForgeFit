/* improvements.js - adds exercise links and rest timer */
const exerciseLinks = {
  "Goblet Squat": "https://www.athleanx.com/exercises/goblet-squat",
  "Romanian Deadlift": "https://www.healthline.com/health/romanian-deadlift",
  "Pull-ups/Inverted Rows": "https://www.muscleandstrength.com/exercises/pull-up",
  "Front Squat": "https://www.healthline.com/health/front-squat",
  "Back Squat": "https://www.healthline.com/health/back-squat",
  "Hang Power Clean": "https://www.verywellfit.com/how-to-do-the-hang-clean-3120098",
  "Clean Grip/straps": "https://www.verywellfit.com/how-to-do-the-hang-clean-3120098",
  "Push Press": "https://www.crossfit.com/exercisedemos/push-press"
};

// Enhance session: wrap exercise names in links and add rest timer buttons.
function enhanceSession() {
  // Linkify exercise names.
  document.querySelectorAll('.ex-name').forEach(el => {
    // If there is already a link inside, skip.
    if (el.querySelector('a')) return;
    const text = el.textContent.trim();
    const link = exerciseLinks[text];
    if (link) {
      el.innerHTML = `<a href="${link}" target="_blank">${text}</a>`;
    }
  });

  // Add rest timer buttons to exercise grids.
  document.querySelectorAll('.ex-grid').forEach(grid => {
    if (grid.querySelector('.btn-rest')) return;
    // Determine rest seconds from the third field value.
    const restField = grid.querySelector('.field:nth-child(3) .val');
    let seconds = 60;
    if (restField && restField.textContent) {
      seconds = parseRest(restField.textContent);
    }
    const btn = document.createElement('button');
    btn.className = 'btn-rest';
    btn.textContent = 'Rest Timer';
    btn.addEventListener('click', () => startTimer(btn, seconds));
    grid.appendChild(btn);
  });
}

// Parse rest text such as '90s' or '30-45s' to a number of seconds.
function parseRest(rest) {
  const matches = rest.match(/\d+/g) || [];
  if (matches.length === 0) return 60;
  // Convert strings to numbers, choose minimum.
  const values = matches.map(n => parseInt(n, 10));
  return Math.min(...values);
}

// Format seconds into mm:ss.
function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

// Start a countdown timer on the button.
function startTimer(btn, seconds) {
  let remaining = seconds;
  btn.disabled = true;
  btn.textContent = fmtTime(remaining);
  const intervalId = setInterval(() => {
    remaining--;
    btn.textContent = fmtTime(remaining);
    if (remaining <= 0) {
      clearInterval(intervalId);
      btn.textContent = 'Go!';
      setTimeout(() => {
        btn.textContent = 'Rest Timer';
        btn.disabled = false;
      }, 1000);
    }
  }, 1000);
}

// Hook into global render to run enhancements after each session render.
if (window.render) {
  const origRender = window.render;
  window.render = function() {
    origRender.apply(this, arguments);
    enhanceSession();
  };
}

// Run once on initial DOM load.
document.addEventListener('DOMContentLoaded', enhanceSession);

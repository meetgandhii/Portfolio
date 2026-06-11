// On-screen controls for touch devices: d-pad + interact (A) + fire (B).
export function createTouchControls() {
  const state = { up: false, down: false, left: false, right: false, fire: false, interact: false };
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (!isTouch) return state;

  const root = document.getElementById("touch-controls");
  root.classList.add("show");
  root.innerHTML = `
    <div class="dpad">
      <button data-dir="up" class="d-up">▲</button>
      <button data-dir="left" class="d-left">◀</button>
      <button data-dir="right" class="d-right">▶</button>
      <button data-dir="down" class="d-down">▼</button>
    </div>
    <div class="action-pad">
      <button data-act="interact" class="a-btn">E</button>
      <button data-act="fire" class="b-btn">⦿</button>
    </div>`;

  const bindHold = (btn, key) => {
    const press = (e) => {
      e.preventDefault();
      state[key] = true;
    };
    const release = (e) => {
      e.preventDefault();
      state[key] = false;
    };
    btn.addEventListener("touchstart", press, { passive: false });
    btn.addEventListener("touchend", release, { passive: false });
    btn.addEventListener("touchcancel", release, { passive: false });
  };

  root.querySelectorAll("[data-dir]").forEach((btn) => bindHold(btn, btn.dataset.dir));
  root.querySelectorAll("[data-act]").forEach((btn) => bindHold(btn, btn.dataset.act));
  return state;
}

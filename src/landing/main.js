// Landing "select mode" screen: starfield + keyboard selection.
const STAR_COUNT = 110;
const STAR_SPEED_MIN = 0.02;
const STAR_SPEED_MAX = 0.12;

const setupStarfield = () => {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6 + 0.3,
    s: STAR_SPEED_MIN + Math.random() * (STAR_SPEED_MAX - STAR_SPEED_MIN),
  }));

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
      ctx.fillStyle = `rgba(160, 200, 255, ${0.3 + star.r * 0.3})`;
      ctx.fillRect(star.x, star.y, star.r * 2, star.r * 2);
      star.y = star.y + star.s > canvas.height ? 0 : star.y + star.s;
    });
    if (!reduced) requestAnimationFrame(draw);
  };
  draw();
};

const setupModeSelect = () => {
  const modes = [...document.querySelectorAll(".mode")];
  let selected = 0;

  const render = () => {
    modes.forEach((mode, i) => mode.classList.toggle("selected", i === selected));
  };
  render();

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      selected = (selected + 1) % modes.length;
      render();
      e.preventDefault();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      selected = (selected - 1 + modes.length) % modes.length;
      render();
      e.preventDefault();
    } else if (e.key === "Enter") {
      modes[selected].click();
    }
  });

  modes.forEach((mode, i) =>
    mode.addEventListener("mouseenter", () => {
      selected = i;
      render();
    }),
  );
};

const flagTouchDevices = () => {
  const isTouchOnly = window.matchMedia("(pointer: coarse)").matches;
  if (isTouchOnly) {
    const tag = document.getElementById("story-tag");
    tag.textContent = "best on desktop · touch controls included";
  }
};

setupStarfield();
setupModeSelect();
flagTouchDevices();

// CINEMATIC MODE — scroll-driven parallax portfolio.
// All content comes from src/data/content.js; this file only renders + animates.

import "./style.css";
import {
  identity,
  socials,
  about,
  skills,
  achievements,
  timeline,
  projects,
  districts,
} from "../data/content.js";

const TYPE_INTERVAL_MS = 70;
const ERASE_INTERVAL_MS = 38;
const ROLE_HOLD_MS = 1900;
const REVEAL_STAGGER_MS = 90;
const REVEAL_STAGGER_MAX_MS = 540;
const TILT_MAX_DEG = 6;
const TILT_LIFT_PX = 6;
const PLACEHOLDER_HUE_MIN = 205;
const PLACEHOLDER_HUE_SPAN = 55;
const PLACEHOLDER_HUE_OFFSET = 28;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ---------- tiny DOM helpers (no innerHTML for content) ---------- */

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
};

const link = (href, className, text) => {
  const anchor = el("a", className, text);
  anchor.href = href;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  return anchor;
};

/* ---------- hero ---------- */

const renderHero = () => {
  const name = document.getElementById("hero-name");
  const tagline = document.getElementById("hero-tagline");
  if (name) name.textContent = identity.name ?? "";
  if (tagline) tagline.textContent = identity.tagline ?? "";
};

const startRoleRotation = () => {
  const target = document.getElementById("role-text");
  const roles = identity.roles ?? [];
  if (!target || roles.length === 0) return;

  if (prefersReducedMotion) {
    target.textContent = roles[0];
    return;
  }

  const typeRole = (roleIndex) => {
    const role = roles[roleIndex % roles.length];
    let charCount = 0;
    const typer = setInterval(() => {
      charCount += 1;
      target.textContent = role.slice(0, charCount);
      if (charCount >= role.length) {
        clearInterval(typer);
        setTimeout(() => eraseRole(roleIndex), ROLE_HOLD_MS);
      }
    }, TYPE_INTERVAL_MS);
  };

  const eraseRole = (roleIndex) => {
    const eraser = setInterval(() => {
      const current = target.textContent;
      target.textContent = current.slice(0, -1);
      if (target.textContent.length === 0) {
        clearInterval(eraser);
        typeRole(roleIndex + 1);
      }
    }, ERASE_INTERVAL_MS);
  };

  typeRole(0);
};

/* ---------- about ---------- */

const renderAbout = () => {
  const body = document.getElementById("about-body");
  if (!body) return;
  const paragraphs = [about.intro, ...(about.long ?? [])].filter(Boolean);
  const nodes = paragraphs.map((text, index) => {
    const p = el("p", "about__para reveal", text);
    if (index === 0) p.classList.add("about__para--intro");
    return p;
  });
  body.replaceChildren(...nodes);
};

/* ---------- timeline ---------- */

const buildTimelineEntry = (entry, index) => {
  const sideClass = index % 2 === 0 ? "timeline__item--left" : "timeline__item--right";
  const item = el("li", `timeline__item ${sideClass} reveal`);

  const card = el("article", `timeline-card timeline-card--${entry.type ?? "work"}`);
  card.append(
    el("p", "timeline-card__period", entry.period ?? ""),
    el("h3", "timeline-card__title", entry.title ?? ""),
    el("p", "timeline-card__org", [entry.org, entry.place].filter(Boolean).join(" · "))
  );

  const points = entry.points ?? [];
  if (points.length > 0) {
    const list = el("ul", "timeline-card__points");
    list.append(...points.map((point) => el("li", null, point)));
    card.append(list);
  }

  const dot = el("span", `timeline__dot timeline__dot--${entry.type ?? "work"}`);
  dot.setAttribute("aria-hidden", "true");
  item.append(dot, card);
  return item;
};

const renderTimeline = () => {
  const list = document.getElementById("timeline-list");
  if (!list) return;
  list.replaceChildren(...timeline.map(buildTimelineEntry));

  const download = document.getElementById("resume-download");
  if (download && identity.resumePdf) download.href = identity.resumePdf;
};

/* ---------- skills ---------- */

const buildSkillGroup = ([groupName, items]) => {
  const group = el("div", "skills__group reveal");
  group.append(el("h3", "skills__group-title", groupName));
  const chipRow = el("ul", "skills__chips");
  chipRow.append(...items.map((skill) => el("li", "chip", skill)));
  group.append(chipRow);
  return group;
};

const renderSkills = () => {
  const container = document.getElementById("skills-groups");
  if (!container) return;
  container.replaceChildren(...Object.entries(skills).map(buildSkillGroup));
};

/* ---------- achievements ---------- */

const renderAchievements = () => {
  const list = document.getElementById("achievements-list");
  if (!list) return;
  const items = achievements.map((text) => {
    const item = el("li", "achievements__item reveal");
    item.append(el("span", "achievements__trophy", "★"), el("span", null, text));
    return item;
  });
  list.replaceChildren(...items);
};

/* ---------- projects ---------- */

const hashString = (text) => {
  let hash = 0;
  for (const char of text) {
    hash = (hash * 31 + char.codePointAt(0)) >>> 0;
  }
  return hash;
};

const initialsOf = (title) =>
  title
    .split(/\s+/)
    .filter((word) => /[a-z0-9]/i.test(word))
    .slice(0, 2)
    .map((word) => word.replace(/[^a-z0-9]/gi, "").charAt(0).toUpperCase())
    .join("");

const buildProjectMedia = (project) => {
  if (project.img) {
    const image = document.createElement("img");
    image.className = "project-card__img";
    image.src = project.img;
    image.alt = `${project.title} screenshot`;
    image.loading = "lazy";
    return image;
  }
  const hue = PLACEHOLDER_HUE_MIN + (hashString(project.title) % PLACEHOLDER_HUE_SPAN);
  const hueB = hue + PLACEHOLDER_HUE_OFFSET;
  const placeholder = el("div", "project-card__placeholder", initialsOf(project.title));
  placeholder.style.background = `linear-gradient(135deg, hsl(${hue} 65% 32%), hsl(${hueB} 70% 16%))`;
  placeholder.setAttribute("aria-hidden", "true");
  return placeholder;
};

const buildProjectLinks = (project) => {
  const row = el("div", "project-card__links");
  if (project.ghLink) row.append(link(project.ghLink, "project-card__link", "GITHUB >"));
  if (project.demoLink) row.append(link(project.demoLink, "project-card__link", "LIVE >"));
  return row.childElementCount > 0 ? row : null;
};

const buildProjectCard = (project) => {
  const card = el("article", "project-card reveal");
  card.dataset.tilt = "true";
  card.append(buildProjectMedia(project));

  const body = el("div", "project-card__body");
  body.append(
    el("h4", "project-card__title", project.title ?? "Untitled"),
    el("p", "project-card__desc", project.description ?? "")
  );

  const techList = el("ul", "project-card__tech");
  techList.append(...(project.tech ?? []).map((tech) => el("li", "chip chip--small", tech)));
  body.append(techList);

  const links = buildProjectLinks(project);
  if (links) body.append(links);

  card.append(body);
  return card;
};

const buildDistrictSection = (districtKey) => {
  const meta = districts[districtKey] ?? { name: districtKey, blurb: "" };
  const districtProjects = projects.filter((p) => p.district === districtKey);
  if (districtProjects.length === 0) return null;

  const section = el("div", "district");
  section.append(
    el("h3", "district__name reveal", meta.name),
    el("p", "district__blurb reveal", meta.blurb)
  );
  const grid = el("div", "district__grid");
  grid.append(...districtProjects.map(buildProjectCard));
  section.append(grid);
  return section;
};

const renderProjects = () => {
  const container = document.getElementById("projects-districts");
  if (!container) return;
  // District order comes straight from the data definition — never hardcoded here.
  const sections = Object.keys(districts ?? {})
    .map(buildDistrictSection)
    .filter(Boolean);
  container.replaceChildren(...sections);
};

/* ---------- contact / footer ---------- */

const renderContact = () => {
  const details = document.getElementById("contact-details");
  if (details) {
    const email = el("a", "footer__email", identity.email ?? "");
    email.href = `mailto:${identity.email ?? ""}`;
    const meta = el(
      "p",
      "footer__meta",
      [identity.phone, identity.location].filter(Boolean).join(" · ")
    );
    details.replaceChildren(email, meta);
  }

  const socialList = document.getElementById("contact-socials");
  if (socialList) {
    const items = socials.map((social) => {
      const item = el("li");
      item.append(link(social.url, "footer__social-link", social.label));
      return item;
    });
    socialList.replaceChildren(...items);
  }
};

/* ---------- scroll reveals ---------- */

const applyRevealStagger = () => {
  const groups = document.querySelectorAll(
    ".about__body, .skills, .achievements, .district__grid, .timeline__list"
  );
  groups.forEach((group) => {
    const revealChildren = group.querySelectorAll(":scope > .reveal");
    revealChildren.forEach((child, index) => {
      const delay = Math.min(index * REVEAL_STAGGER_MS, REVEAL_STAGGER_MAX_MS);
      child.style.transitionDelay = `${delay}ms`;
    });
  });
};

const setupReveals = () => {
  const targets = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }
  applyRevealStagger();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  targets.forEach((target) => observer.observe(target));
};

/* ---------- parallax + timeline draw (single rAF loop) ---------- */

const computeTimelineProgress = (timelineBox, viewportHeight) => {
  const rect = timelineBox.getBoundingClientRect();
  const traveled = viewportHeight * 0.8 - rect.top;
  return Math.min(1, Math.max(0, traveled / rect.height));
};

const setupScrollLoop = () => {
  if (prefersReducedMotion) return;

  const layers = [...document.querySelectorAll("[data-parallax-speed]")].map(
    (node) => ({ node, speed: Number(node.dataset.parallaxSpeed) || 0 })
  );
  const hero = document.getElementById("hero");
  const timelineBox = document.querySelector(".timeline");
  const timelineFill = document.getElementById("timeline-fill");
  let ticking = false;

  const onFrame = () => {
    ticking = false;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    if (hero && scrollY <= viewportHeight * 1.5) {
      layers.forEach(({ node, speed }) => {
        node.style.transform = `translate3d(0, ${Math.round(scrollY * speed)}px, 0)`;
      });
    }
    if (timelineBox && timelineFill) {
      const progress = computeTimelineProgress(timelineBox, viewportHeight);
      timelineFill.style.transform = `scaleY(${progress})`;
    }
  };

  const requestFrame = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onFrame);
  };

  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", requestFrame, { passive: true });
  requestFrame();
};

/* ---------- card hover tilt ---------- */

const setupCardTilt = () => {
  if (prefersReducedMotion || !window.matchMedia("(hover: hover)").matches) return;

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const ratioX = (event.clientX - rect.left) / rect.width - 0.5;
      const ratioY = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateY = (ratioX * 2 * TILT_MAX_DEG).toFixed(2);
      const rotateX = (-ratioY * 2 * TILT_MAX_DEG).toFixed(2);
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${TILT_LIFT_PX}px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
};

/* ---------- comet cursor ---------- */

const COMET_EASE = 0.16;
const COMET_HEAD_RADIUS_PX = 4;
const COMET_TRAIL_LIFE_MS = 600;
const COMET_TRAIL_MAX = 110;
const COMET_SPAWN_SPACING_PX = 6;
const COMET_TRAIL_RADIUS_PX = 3;
const COMET_IDLE_DISTANCE_PX = 0.4;
const COMET_GLOW_SCALE = 3;
const COMET_DPR_MAX = 2;
const COMET_HEAD_RGB = "147, 197, 253"; // blue-300 core
const COMET_BLUE_RGB = "59, 130, 246"; // blue-500
const COMET_INDIGO_RGB = "99, 102, 241"; // indigo-500

const isFinePointerDevice = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const createCometCanvas = () => {
  const canvas = document.createElement("canvas");
  canvas.className = "comet-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.append(canvas);
  return canvas;
};

const createTrailParticle = (x, y, now) => ({
  x: x + (Math.random() - 0.5) * 2,
  y: y + (Math.random() - 0.5) * 2,
  bornAt: now,
  radius: COMET_TRAIL_RADIUS_PX * (0.7 + Math.random() * 0.7),
  isIndigo: Math.random() > 0.5,
});

const setupCometCursor = () => {
  if (prefersReducedMotion || !isFinePointerDevice()) return;

  const canvas = createCometCanvas();
  const context = canvas.getContext("2d");
  if (!context) return;

  let particles = [];
  let pointer = null;
  let head = null;
  let lastSpawn = null;
  let frameId = null;

  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, COMET_DPR_MAX);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const drawTrailParticle = (particle, now) => {
    const lifeRatio = (now - particle.bornAt) / COMET_TRAIL_LIFE_MS;
    const fade = (1 - lifeRatio) ** 2;
    const glowRadius = particle.radius * (1 - lifeRatio * 0.5) * COMET_GLOW_SCALE;
    const rgb = particle.isIndigo ? COMET_INDIGO_RGB : COMET_BLUE_RGB;
    const glow = context.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, glowRadius
    );
    glow.addColorStop(0, `rgba(${rgb}, ${(0.5 * fade).toFixed(3)})`);
    glow.addColorStop(1, `rgba(${rgb}, 0)`);
    context.fillStyle = glow;
    context.beginPath();
    context.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
    context.fill();
  };

  const drawCometHead = () => {
    const glowRadius = COMET_HEAD_RADIUS_PX * 4;
    const glow = context.createRadialGradient(
      head.x, head.y, 0,
      head.x, head.y, glowRadius
    );
    glow.addColorStop(0, `rgba(${COMET_HEAD_RGB}, 0.85)`);
    glow.addColorStop(0.35, `rgba(${COMET_BLUE_RGB}, 0.35)`);
    glow.addColorStop(1, `rgba(${COMET_INDIGO_RGB}, 0)`);
    context.fillStyle = glow;
    context.beginPath();
    context.arc(head.x, head.y, glowRadius, 0, Math.PI * 2);
    context.fill();
  };

  const spawnIfTraveled = (now) => {
    const from = lastSpawn ?? pointer;
    const traveled = Math.hypot(head.x - from.x, head.y - from.y);
    if (lastSpawn && traveled < COMET_SPAWN_SPACING_PX) return;
    particles = [...particles, createTrailParticle(head.x, head.y, now)].slice(
      -COMET_TRAIL_MAX
    );
    lastSpawn = { x: head.x, y: head.y };
  };

  const onFrame = (now) => {
    frameId = null;
    if (!pointer) return;

    head = head
      ? {
          x: head.x + (pointer.x - head.x) * COMET_EASE,
          y: head.y + (pointer.y - head.y) * COMET_EASE,
        }
      : { ...pointer };

    spawnIfTraveled(now);
    particles = particles.filter((p) => now - p.bornAt < COMET_TRAIL_LIFE_MS);

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.globalCompositeOperation = "lighter";
    particles.forEach((particle) => drawTrailParticle(particle, now));
    drawCometHead();
    context.globalCompositeOperation = "source-over";

    const headLag = Math.hypot(pointer.x - head.x, pointer.y - head.y);
    const isIdle = headLag < COMET_IDLE_DISTANCE_PX && particles.length === 0;
    if (!isIdle) requestCometFrame();
  };

  const requestCometFrame = () => {
    if (frameId !== null) return;
    frameId = requestAnimationFrame(onFrame);
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      requestCometFrame();
    },
    { passive: true }
  );

  window.addEventListener(
    "resize",
    () => {
      resizeCanvas();
      requestCometFrame();
    },
    { passive: true }
  );

  resizeCanvas();
};

/* ---------- boot ---------- */

const init = () => {
  if (prefersReducedMotion) document.documentElement.classList.add("reduced-motion");
  renderHero();
  startRoleRotation();
  renderAbout();
  renderTimeline();
  renderSkills();
  renderAchievements();
  renderProjects();
  renderContact();
  setupReveals();
  setupScrollLoop();
  setupCardTilt();
  setupCometCursor();
};

init();

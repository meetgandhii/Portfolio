// SPEEDRUN MODE — classic one-page portfolio, rebuilt in vanilla JS.
// All content comes from src/data/content.js; this file only renders it.

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

// ---------- Constants ----------

const GITHUB_URL = "https://github.com/meetgandhii";
const GITHUB_CHART_URL = "https://ghchart.rshah.org/41a6f6/meetgandhii";

const MODE_LINKS = [
  { label: "MENU", href: "/" },
  { label: "GAME", href: "/game.html" },
  { label: "CINEMATIC", href: "/parallax.html" },
  { label: "BASIC", href: "/basic.html", isCurrent: true },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
];

const TIMELINE_TYPE_LABELS = {
  work: "Work",
  education: "Education",
  venture: "Venture",
};

const TYPE_MS = 90;
const ERASE_MS = 45;
const HOLD_MS = 1500;
const NEXT_ROLE_GAP_MS = 350;

const PARTICLE_COUNT = 60;
const PARTICLE_MAX_SPEED = 0.35;
const PARTICLE_LINK_DISTANCE = 110;
const PARTICLE_RADIUS = 1.6;
const PARTICLE_COLOR = "rgba(65, 166, 246, 0.55)";
const PARTICLE_LINK_COLOR = "65, 166, 246";

// ---------- Utilities ----------

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const externalLink = (url, label, className = "") => {
  if (!url) return "";
  const isMail = url.startsWith("mailto:");
  const targetAttrs = isMail ? "" : 'target="_blank" rel="noopener noreferrer"';
  return `<a class="${className}" href="${escapeHtml(url)}" ${targetAttrs}>${escapeHtml(label)}</a>`;
};

const prefersReducedMotion = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Navbar ----------

const renderModeSwitch = () => {
  const items = MODE_LINKS.map((mode) => {
    const currentClass = mode.isCurrent ? " mode-switch__link--current" : "";
    const aria = mode.isCurrent ? ' aria-current="page"' : "";
    return `<a class="mode-switch__link${currentClass}" href="${mode.href}"${aria}>${mode.label}</a>`;
  });
  return `<nav class="mode-switch" aria-label="Site mode">${items.join("")}</nav>`;
};

const renderNavbar = () => {
  const links = NAV_LINKS.map(
    (link) => `<a class="navbar__link" href="${link.href}">${escapeHtml(link.label)}</a>`
  ).join("");
  const githubLink = `<a class="navbar__link navbar__link--github" href="${GITHUB_URL}" target="_blank" rel="noopener noreferrer">GitHub</a>`;
  return `
    <header class="navbar">
      <div class="navbar__inner">
        <a class="navbar__brand" href="#home">Meet <span class="navbar__brand-accent">Gandhi</span></a>
        <nav class="navbar__links" aria-label="Page sections">${links}${githubLink}</nav>
        ${renderModeSwitch()}
      </div>
    </header>
  `;
};

// ---------- Hero ----------

const renderHero = () => `
  <section class="hero" id="home">
    <canvas class="hero__particles" id="hero-particles" aria-hidden="true"></canvas>
    <div class="hero__content">
      <p class="hero__hi">Hi There! <span class="hero__wave" aria-hidden="true">👋</span></p>
      <h1 class="hero__name">I'M <span class="hero__name-accent">${escapeHtml(identity.name.toUpperCase())}</span></h1>
      <p class="hero__type-line">
        <span class="hero__typed" id="hero-typed"></span><span class="hero__caret" aria-hidden="true"></span>
      </p>
      <p class="hero__tagline">${escapeHtml(identity.tagline)}</p>
      <p class="hero__location">${escapeHtml(identity.location)} · ${escapeHtml(identity.phone)}</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#projects">See my work</a>
        <a class="btn btn--secondary" href="mailto:${escapeHtml(identity.email)}">Email me</a>
      </div>
    </div>
  </section>
`;

// ---------- About ----------

const renderSkillTiles = () => {
  const groups = Object.entries(skills).map(([category, items]) => {
    const tiles = (items ?? [])
      .map((item) => `<div class="skill-tile">${escapeHtml(item)}</div>`)
      .join("");
    return `
      <div class="skills__group">
        <h4 class="skills__category">${escapeHtml(category)}</h4>
        <div class="skills__grid">${tiles}</div>
      </div>
    `;
  });
  return groups.join("");
};

const renderAchievements = () => {
  const items = achievements
    .map((achievement) => `<li>${escapeHtml(achievement)}</li>`)
    .join("");
  return `<ul class="achievements">${items}</ul>`;
};

const renderAbout = () => {
  const paragraphs = [about.intro, ...(about.long ?? [])]
    .filter(Boolean)
    .map((text) => `<p>${escapeHtml(text)}</p>`)
    .join("");
  return `
    <section class="section" id="about">
      <h2 class="section__title">About <span class="section__title-accent">Me</span></h2>
      <div class="about">${paragraphs}</div>
      <h3 class="section__subtitle">Professional <span class="section__title-accent">Skillset</span></h3>
      ${renderSkillTiles()}
      <h3 class="section__subtitle">Achievements</h3>
      ${renderAchievements()}
      <h3 class="section__subtitle">Days I <span class="section__title-accent">Code</span></h3>
      <div class="gh-chart">
        <img class="gh-chart__img" src="${GITHUB_CHART_URL}" alt="Meet Gandhi's GitHub contribution chart" loading="lazy" />
      </div>
    </section>
  `;
};

// ---------- Timeline ----------

const renderTimelineEntry = (entry) => {
  const typeLabel = TIMELINE_TYPE_LABELS[entry.type] ?? entry.type;
  const points = (entry.points ?? [])
    .map((point) => `<li>${escapeHtml(point)}</li>`)
    .join("");
  return `
    <li class="timeline__entry timeline__entry--${escapeHtml(entry.type)}">
      <div class="timeline__meta">
        <span class="timeline__period">${escapeHtml(entry.period)}</span>
        <span class="badge badge--${escapeHtml(entry.type)}">${escapeHtml(typeLabel)}</span>
      </div>
      <h3 class="timeline__heading">${escapeHtml(entry.title)} <span class="timeline__org">@ ${escapeHtml(entry.org)}</span></h3>
      <p class="timeline__place">${escapeHtml(entry.place)}</p>
      <ul class="timeline__points">${points}</ul>
    </li>
  `;
};

const renderTimeline = () => {
  const mostRecentFirst = [...timeline].reverse();
  return `
    <section class="section" id="experience">
      <h2 class="section__title">Experience &amp; <span class="section__title-accent">Education</span></h2>
      <ol class="timeline">${mostRecentFirst.map(renderTimelineEntry).join("")}</ol>
    </section>
  `;
};

// ---------- Projects ----------

const renderProjectCard = (project) => {
  const thumbnail = project.img
    ? `<img class="project-card__thumb" src="${escapeHtml(project.img)}" alt="${escapeHtml(project.title)} screenshot" loading="lazy" />`
    : "";
  const chips = (project.tech ?? [])
    .map((tech) => `<span class="chip chip--small">${escapeHtml(tech)}</span>`)
    .join("");
  const links = [
    externalLink(project.ghLink, "GitHub", "btn btn--card"),
    externalLink(project.demoLink, "Demo", "btn btn--card btn--card-ghost"),
  ]
    .filter(Boolean)
    .join("");
  const linksBlock = links ? `<div class="project-card__links">${links}</div>` : "";
  return `
    <article class="project-card">
      ${thumbnail}
      <div class="project-card__body">
        <h4 class="project-card__title">${escapeHtml(project.title)}</h4>
        <p class="project-card__description">${escapeHtml(project.description)}</p>
        <div class="project-card__tech">${chips}</div>
        ${linksBlock}
      </div>
    </article>
  `;
};

const renderDistrictGroup = (districtKey) => {
  const district = districts[districtKey];
  const districtProjects = projects.filter((project) => project.district === districtKey);
  if (!district || districtProjects.length === 0) return "";
  return `
    <div class="district">
      <h3 class="district__name">${escapeHtml(district.name)} <span class="district__count">${districtProjects.length}</span></h3>
      <p class="district__blurb">${escapeHtml(district.blurb)}</p>
      <div class="project-grid">${districtProjects.map(renderProjectCard).join("")}</div>
    </div>
  `;
};

const renderProjects = () => {
  const groups = Object.keys(districts).map(renderDistrictGroup).join("");
  return `
    <section class="section" id="projects">
      <h2 class="section__title">My Recent <span class="section__title-accent">Works</span> <span class="section__count">${projects.length} projects</span></h2>
      ${groups}
    </section>
  `;
};

// ---------- Resume ----------

const renderResume = () => {
  const pdfPath = escapeHtml(identity.resumePdf ?? "/Meet_Resume.pdf");
  return `
    <section class="section" id="resume">
      <h2 class="section__title">My <span class="section__title-accent">Resume</span></h2>
      <div class="resume__actions">
        <a class="btn btn--primary" href="${pdfPath}" download>Download Resume (PDF)</a>
      </div>
      <object class="resume__embed" data="${pdfPath}" type="application/pdf" width="100%" aria-label="Resume PDF preview">
        <p class="resume__fallback">
          Your browser can't display the PDF inline —
          <a href="${pdfPath}" target="_blank" rel="noopener noreferrer">open the resume in a new tab</a> instead.
        </p>
      </object>
    </section>
  `;
};

// ---------- Footer ----------

const renderFooterSocials = () => {
  const links = (socials ?? []).map((social) =>
    externalLink(social.url, social.label, "footer__social-link")
  );
  return `<nav class="footer__socials" aria-label="Social links">${links.join("")}</nav>`;
};

const renderFooter = () => `
  <footer class="footer">
    <p class="footer__credit">Designed and Developed by ${escapeHtml(identity.name)}</p>
    ${renderFooterSocials()}
    <p class="footer__game-hint">This site is also a game → <a href="/game.html">/game.html</a></p>
  </footer>
`;

// ---------- Typewriter ----------

const startTypewriter = (element) => {
  if (!element) return;
  const roles = (identity.roles ?? []).filter(Boolean);
  if (roles.length === 0) return;
  if (prefersReducedMotion()) {
    element.textContent = roles[0];
    return;
  }
  const step = (roleIndex, charCount, isErasing) => {
    const role = roles[roleIndex % roles.length];
    element.textContent = role.slice(0, charCount);
    if (!isErasing && charCount < role.length) {
      schedule(TYPE_MS, roleIndex, charCount + 1, false);
    } else if (!isErasing) {
      schedule(HOLD_MS, roleIndex, charCount, true);
    } else if (charCount > 0) {
      schedule(ERASE_MS, roleIndex, charCount - 1, true);
    } else {
      schedule(NEXT_ROLE_GAP_MS, roleIndex + 1, 1, false);
    }
  };
  const schedule = (delay, roleIndex, charCount, isErasing) =>
    setTimeout(() => step(roleIndex, charCount, isErasing), delay);
  step(0, 1, false);
};

// ---------- Hero particles ----------

const createParticle = (width, height) => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 2 * PARTICLE_MAX_SPEED,
  vy: (Math.random() - 0.5) * 2 * PARTICLE_MAX_SPEED,
});

const moveParticle = (particle, width, height) => ({
  ...particle,
  x: (particle.x + particle.vx + width) % width,
  y: (particle.y + particle.vy + height) % height,
});

const drawParticles = (context, particlesList, width, height) => {
  context.clearRect(0, 0, width, height);
  particlesList.forEach((particle, index) => {
    context.beginPath();
    context.arc(particle.x, particle.y, PARTICLE_RADIUS, 0, Math.PI * 2);
    context.fillStyle = PARTICLE_COLOR;
    context.fill();
    particlesList.slice(index + 1).forEach((other) => {
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.hypot(dx, dy);
      if (distance >= PARTICLE_LINK_DISTANCE) return;
      const alpha = 0.25 * (1 - distance / PARTICLE_LINK_DISTANCE);
      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.lineTo(other.x, other.y);
      context.strokeStyle = `rgba(${PARTICLE_LINK_COLOR}, ${alpha})`;
      context.lineWidth = 1;
      context.stroke();
    });
  });
};

const startParticles = (canvas) => {
  if (!canvas || prefersReducedMotion()) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  let particlesList = [];
  let isVisible = true;

  const resize = () => {
    const hero = canvas.parentElement;
    if (!hero) return;
    canvas.width = hero.clientWidth;
    canvas.height = hero.clientHeight;
    particlesList = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height)
    );
  };

  const frame = () => {
    if (isVisible) {
      particlesList = particlesList.map((particle) =>
        moveParticle(particle, canvas.width, canvas.height)
      );
      drawParticles(context, particlesList, canvas.width, canvas.height);
    }
    requestAnimationFrame(frame);
  };

  if (typeof IntersectionObserver === "function") {
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries.some((entry) => entry.isIntersecting);
    });
    observer.observe(canvas);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(frame);
};

// ---------- Mount ----------

const renderPage = () => [
  renderNavbar(),
  renderHero(),
  '<main class="page">',
  renderAbout(),
  renderTimeline(),
  renderProjects(),
  renderResume(),
  "</main>",
  renderFooter(),
].join("\n");

const mount = () => {
  const root = document.getElementById("app");
  if (!root) return;
  root.innerHTML = renderPage();
  startTypewriter(document.getElementById("hero-typed"));
  startParticles(document.getElementById("hero-particles"));
};

mount();

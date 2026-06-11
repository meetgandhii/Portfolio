// DOM overlay UI for the game: modals, HUD counters, prompts, pause menu.
import { identity, socials, about, skills, achievements, timeline, projects } from "../data/content.js";

const TOTAL_PROJECTS = projects.length;

const el = (tag, className, html) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
};

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]),
  );

const linkBtn = (href, text, primary) =>
  href
    ? `<a class="btn ${primary ? "btn-primary" : ""}" href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>`
    : "";

const placeholderArt = (title) => {
  const hue = [...title].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 360;
  const initials = title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();
  return `<div class="ph-art" style="background:linear-gradient(135deg,hsl(${hue},45%,28%),hsl(${(hue + 60) % 360},50%,18%))"><span>${esc(initials)}</span></div>`;
};

export function createUI({ onModalChange, onReset }) {
  const root = document.getElementById("modal-root");
  const promptBar = document.getElementById("prompt");
  const hudProjects = document.getElementById("hud-projects");
  const hudCoins = document.getElementById("hud-coins");
  const toast = document.getElementById("toast");
  let openCount = 0;

  const setOpen = (delta) => {
    openCount = Math.max(0, openCount + delta);
    onModalChange(openCount > 0);
  };

  const close = (overlay) => {
    overlay.remove();
    setOpen(-1);
  };

  const openModal = (innerHtml, { wide = false } = {}) => {
    const overlay = el("div", "overlay");
    const box = el("div", `modal ${wide ? "modal-wide" : ""}`, innerHtml);
    const closeBtn = el("button", "modal-close", "✕");
    closeBtn.setAttribute("aria-label", "Close");
    box.prepend(closeBtn);
    overlay.appendChild(box);
    root.appendChild(overlay);
    setOpen(1);
    closeBtn.addEventListener("click", () => close(overlay));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close(overlay);
    });
    const onKey = (e) => {
      if (e.key === "Escape") {
        close(overlay);
        document.removeEventListener("keydown", onKey);
      }
    };
    document.addEventListener("keydown", onKey);
    return overlay;
  };

  const showToast = (text) => {
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2600);
  };

  const api = {
    isOpen: () => openCount > 0,
    showToast,

    showPrompt(text) {
      promptBar.innerHTML = text;
      promptBar.classList.add("show");
    },
    hidePrompt() {
      promptBar.classList.remove("show");
    },
    setCounts({ discovered, coins }) {
      hudProjects.textContent = `${discovered}/${TOTAL_PROJECTS}`;
      hudCoins.textContent = String(coins);
    },

    openProject(project) {
      const art = project.img
        ? `<img class="modal-art" src="${esc(project.img)}" alt="${esc(project.title)}">`
        : placeholderArt(project.title);
      openModal(`
        <p class="modal-kicker">PROJECT UNLOCKED</p>
        <h2>${esc(project.title)}</h2>
        ${art}
        <p>${esc(project.description)}</p>
        <div class="chips">${(project.tech ?? []).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        <div class="btn-row">
          ${linkBtn(project.ghLink, "GitHub ↗", true)}
          ${linkBtn(project.demoLink, "Live Demo ↗")}
        </div>`);
    },

    openAbout() {
      const skillRows = Object.entries(skills)
        .map(
          ([group, list]) => `
          <div class="skill-row"><span class="skill-group">${esc(group)}</span>
          <span class="chips">${list.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</span></div>`,
        )
        .join("");
      openModal(
        `
        <p class="modal-kicker">CHARACTER SHEET</p>
        <h2>${esc(identity.name)}</h2>
        <p class="muted">${esc(identity.tagline)}</p>
        <p>${esc(about.intro)}</p>
        ${about.long.map((p) => `<p>${esc(p)}</p>`).join("")}
        <h3>Skill Tree</h3>
        ${skillRows}
        <h3>Achievements</h3>
        <ul>${achievements.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
        <h3>Quest Log (GitHub)</h3>
        <img class="gh-chart" src="https://ghchart.rshah.org/41a6f6/meetgandhii" alt="GitHub contributions" loading="lazy">`,
        { wide: true },
      );
    },

    openMilestone(entry) {
      openModal(`
        <p class="modal-kicker">RESUME ROAD · ${esc(entry.period)}</p>
        <h2>${esc(entry.title)}</h2>
        <p class="muted">${esc(entry.org)} — ${esc(entry.place)}</p>
        <ul>${entry.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`);
    },

    openResume() {
      const items = [...timeline]
        .reverse()
        .map(
          (entry) => `
          <div class="tl-item tl-${esc(entry.type)}">
            <div class="tl-period">${esc(entry.period)}</div>
            <div class="tl-body"><strong>${esc(entry.title)}</strong> · ${esc(entry.org)}
            <span class="muted">— ${esc(entry.place)}</span>
            <ul>${entry.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>
          </div>`,
        )
        .join("");
      openModal(
        `
        <p class="modal-kicker">LEGENDARY ITEM FOUND</p>
        <h2>The Resume</h2>
        <div class="btn-row">
          <a class="btn btn-primary" href="${esc(identity.resumePdf)}" download>Download PDF ⤓</a>
          <a class="btn" href="${esc(identity.resumePdf)}" target="_blank" rel="noopener">Open in tab ↗</a>
        </div>
        <div class="tl">${items}</div>`,
        { wide: true },
      );
    },

    openContact() {
      openModal(`
        <p class="modal-kicker">SEND A RAVEN</p>
        <h2>Contact</h2>
        <p class="muted">${esc(identity.location)} · ${esc(identity.phone)}</p>
        <div class="btn-row btn-col">
          ${socials.map((s) => linkBtn(s.url, `${s.label} ↗`, s.label === "Email")).join("")}
        </div>`);
    },

    openMenu() {
      const overlay = openModal(`
        <p class="modal-kicker">PAUSED</p>
        <h2>Menu</h2>
        <div class="btn-row btn-col">
          <button class="btn btn-primary" data-act="resume">Resume</button>
          <a class="btn" href="/">Mode select</a>
          <a class="btn" href="/parallax.html">Cinematic site ↗</a>
          <a class="btn" href="/basic.html">Basic site ↗</a>
          <button class="btn" data-act="reset">Reset progress</button>
        </div>
        <p class="muted small">WASD / arrows — move · click or SPACE — shoot · E — interact · M — menu</p>`);
      overlay.querySelector('[data-act="resume"]').addEventListener("click", () => close(overlay));
      overlay.querySelector('[data-act="reset"]').addEventListener("click", () => {
        onReset();
        close(overlay);
      });
    },

    showIntro(onStart) {
      const overlay = el(
        "div",
        "overlay intro",
        `<div class="modal intro-box">
          <p class="modal-kicker">MEET GANDHI PRESENTS</p>
          <h1>PORTFOLIO<br>WORLD</h1>
          <p>Explore the map. Enter buildings to discover <strong>${TOTAL_PROJECTS} projects</strong>,
          walk <strong>Resume Road</strong> back through my career, and find the legendary
          <strong>Resume Chest</strong>.</p>
          <div class="controls-grid">
            <span><kbd>W A S D</kbd> move</span>
            <span><kbd>click</kbd>/<kbd>space</kbd> shoot</span>
            <span><kbd>E</kbd> interact</span>
            <span><kbd>M</kbd> menu</span>
          </div>
          <button class="btn btn-primary btn-big" id="start-btn">▶ PRESS START</button>
          <p class="small muted">prefer scrolling? <a href="/parallax.html">cinematic site</a> · <a href="/basic.html">basic site</a></p>
        </div>`,
      );
      root.appendChild(overlay);
      setOpen(1);
      overlay.querySelector("#start-btn").addEventListener("click", () => {
        close(overlay);
        onStart();
      });
    },
  };

  return api;
}

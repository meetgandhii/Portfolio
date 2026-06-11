# meetgandhi.me — Portfolio World

Meet Gandhi's portfolio, playable three ways:

| Mode | URL | What it is |
|------|-----|------------|
| 🎮 Story | `/game.html` | Top-down pixel RPG (Phaser 3). Walk, shoot, and explore 4 districts holding all 42 projects, a walkable Resume Road timeline, and the legendary Resume Chest. |
| ✨ Cinematic | `/parallax.html` | Animation-heavy parallax one-pager with a comet cursor trail. |
| ⚡ Speedrun | `/basic.html` | Fast, recruiter-friendly one-pager: typewriter hero, timeline, all projects, embedded resume PDF. |

`/` is a retro mode-select screen.

## Stack

- [Vite](https://vitejs.dev) multi-page build (`index`, `game`, `parallax`, `basic`)
- [Phaser 3](https://phaser.io) for the game; vanilla JS + CSS for everything else
- Single content source: `src/data/content.js` drives all three views
- Art: [Kenney](https://kenney.nl) Tiny Town + Tiny Dungeon packs (CC0)
- Deployed on Vercel (auto-deploy from `master`)

## Develop

```bash
npm install
npm run dev      # dev server
npm run build    # production build → dist/
```

## Edit content

Everything (bio, skills, timeline, projects, socials) lives in `src/data/content.js`.
Add a project there and it appears in all three views; the game assigns it a building
in its district automatically. Replace `public/Meet_Resume.pdf` to update the resume.

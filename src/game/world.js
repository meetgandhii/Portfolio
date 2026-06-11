// World map generation for the portfolio RPG.
// Produces plain tile-index arrays + lists of interactables; the scene renders them.
import { projects, timeline, districts } from "../data/content.js";

export const TILE = 16;
export const WORLD_W = 100;
export const WORLD_H = 80;

// Tiny Town tilesheet indices (12 columns)
export const T = {
  GRASS: [0, 0, 0, 0, 0, 1, 1, 2],
  TREE_ORANGE: 3,
  TREE_GREEN: 4,
  BUSH: 5,
  SPROUT: 17,
  MUSHROOM: 29,
  DIRT: [39, 40, 41, 42],
  STONE: 43,
  FENCE_H: 45,
  FENCE_V: 59,
  FENCE_TL: 44,
  FENCE_TR: 46,
  FENCE_BL: 68,
  FENCE_BR: 70,
  BENCH: 81,
  SIGN: 83,
  COIN: 93,
  HIVE: 94,
  TARGET: 95,
  SACK: 106,
  POT: 107,
  ROOF_GRAY: { top: [48, 49, 50], bottom: [60, 61, 62] },
  ROOF_RED: { top: [52, 53, 54], bottom: [64, 65, 66] },
  WALL_BROWN: { left: 72, mid: 73, window: 84, door: 85, right: 75 },
  WALL_GRAY: { left: 76, mid: 77, window: 88, door: 89, right: 79 },
  CASTLE_TOP: [99, 100, 101],
  CASTLE_MID: [96, 97, 98],
};

// Tiny Dungeon sheet indices (characters & props)
export const D = {
  PLAYER: 96,
  WIZARD: 84,
  PRINCESS: 99,
  ELDER: 100,
  SLIME: 108,
  CHEST: 89,
  CHEST_OPEN: 91,
};

const BUILDING_W = 5;
const BUILDING_H = 3;

const STYLES = [
  { roof: T.ROOF_GRAY, wall: T.WALL_BROWN },
  { roof: T.ROOF_RED, wall: T.WALL_GRAY },
  { roof: T.ROOF_RED, wall: T.WALL_BROWN },
  { roof: T.ROOF_GRAY, wall: T.WALL_GRAY },
];

const PLAZA = { x1: 44, y1: 36, x2: 55, y2: 43 };

// Building slot positions (top-left tile) per district
const SLOTS = {
  campus: [
    ...[18, 27, 36, 45, 54, 63, 72].map((x) => ({ x, y: 8 })),
    ...[18, 27, 36, 45, 54, 63, 72].map((x) => ({ x, y: 16 })),
  ],
  arcade: [
    ...[66, 74, 82, 90].map((x) => ({ x, y: 33 })),
    ...[64, 72, 80].map((x) => ({ x, y: 45 })),
  ],
  bazaar: [
    ...[30, 38, 46, 54, 62].map((x) => ({ x, y: 54 })),
    ...[34, 42, 50, 58].map((x) => ({ x, y: 64 })),
  ],
  lab: [
    ...[70, 78, 86, 92].map((x) => ({ x, y: 54 })),
    ...[70, 78, 86, 92].map((x) => ({ x, y: 62 })),
    ...[70, 78, 86, 92].map((x) => ({ x, y: 70 })),
  ],
};

const DISTRICT_BANNERS = [
  { key: "campus", x: 48, y: 5 },
  { key: "arcade", x: 74, y: 30 },
  { key: "bazaar", x: 45, y: 52 },
  { key: "lab", x: 82, y: 52 },
];

// Resume Road milestones: west of plaza, oldest first as you walk out
const MILESTONE_XS = [38, 32, 26, 20, 14];
const MONUMENT = { x: 8, y: 36 };
const CHEST_POS = { x: 9, y: 41 };

const rngFactory = (seed) => {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
};

const makeGrid = (fill) =>
  Array.from({ length: WORLD_H }, () => Array.from({ length: WORLD_W }, () => fill));

const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

export function buildWorld() {
  const rng = rngFactory(20260611);
  const ground = makeGrid(-1);
  const road = makeGrid(-1);
  const structures = makeGrid(-1);
  const reserved = makeGrid(false);

  for (let y = 0; y < WORLD_H; y++)
    for (let x = 0; x < WORLD_W; x++) ground[y][x] = pick(rng, T.GRASS);

  const paveRect = (x1, y1, x2, y2, tileOf) => {
    for (let y = y1; y <= y2; y++)
      for (let x = x1; x <= x2; x++) {
        road[y][x] = tileOf(rng);
        reserved[y][x] = true;
      }
  };
  const dirt = (r) => pick(r, T.DIRT);
  const stone = () => T.STONE;

  // Plaza + main paths
  paveRect(PLAZA.x1, PLAZA.y1, PLAZA.x2, PLAZA.y2, stone);
  paveRect(49, 6, 50, 36, dirt); // north to campus
  paveRect(55, 39, 92, 40, dirt); // east to arcade
  paveRect(49, 43, 50, 70, dirt); // south to bazaar
  paveRect(8, 39, 44, 40, dirt); // west: Resume Road
  // campus walks
  paveRect(18, 11, 78, 12, dirt);
  paveRect(18, 19, 78, 20, dirt);
  // arcade walks
  paveRect(58, 36, 95, 37, stone);
  paveRect(62, 48, 86, 49, stone);
  paveRect(74, 37, 75, 48, stone);
  // bazaar walks
  paveRect(28, 57, 68, 58, dirt);
  paveRect(32, 67, 64, 68, dirt);
  paveRect(49, 58, 50, 67, dirt);
  // lab walks (door fronts of all three rows) + connector to arcade
  paveRect(68, 57, 97, 58, stone);
  paveRect(68, 65, 97, 66, stone);
  paveRect(68, 73, 97, 74, stone);
  paveRect(74, 49, 75, 73, stone);
  // about house approach
  paveRect(60, 33, 61, 36, stone);

  const interactables = [];
  const labels = [];
  const solids = []; // decorative solid sprites: {sheet, frame, x, y}
  const decor = []; // non-colliding sprites

  const stampBuilding = (bx, by, style, doorTile) => {
    const wallRow = [
      style.wall.left,
      style.wall.window,
      doorTile ?? style.wall.door,
      style.wall.window,
      style.wall.right,
    ];
    for (let i = 0; i < BUILDING_W; i++) {
      const edge = i === 0 ? 0 : i === BUILDING_W - 1 ? 2 : 1;
      structures[by][bx + i] = style.roof.top[edge];
      structures[by + 1][bx + i] = style.roof.bottom[edge];
      structures[by + 2][bx + i] = wallRow[i];
    }
    for (let y = by; y < by + BUILDING_H; y++)
      for (let x = bx; x < bx + BUILDING_W; x++) reserved[y][x] = true;
    for (let x = bx - 1; x <= bx + BUILDING_W; x++) {
      if (by + BUILDING_H < WORLD_H) reserved[by + BUILDING_H][x] = true;
      if (by - 1 >= 0) reserved[by - 1][x] = true;
    }
  };

  // Project buildings
  const byDistrict = (key) => projects.filter((p) => p.district === key);
  Object.entries(SLOTS).forEach(([key, slots]) => {
    byDistrict(key).forEach((project, i) => {
      const slot = slots[i];
      if (!slot) return;
      stampBuilding(slot.x, slot.y, STYLES[i % STYLES.length]);
      const doorX = slot.x + 2;
      const doorY = slot.y + 2;
      interactables.push({
        type: "project",
        payload: project,
        tx: doorX,
        ty: doorY + 1,
        w: 3,
        h: 2,
        label: project.title,
      });
      labels.push({ x: slot.x + BUILDING_W / 2, y: slot.y - 0.4, text: shortLabel(project.title) });
      decor.push({ sheet: "town", frame: T.SIGN, x: doorX - 1, y: doorY + 1 });
    });
  });

  // About house: wide special building near plaza
  const ABOUT = { x: 56, y: 30 };
  const aboutStyle = { roof: T.ROOF_RED, wall: T.WALL_BROWN };
  const w = 9;
  for (let i = 0; i < w; i++) {
    const edge = i === 0 ? 0 : i === w - 1 ? 2 : 1;
    structures[ABOUT.y][ABOUT.x + i] = aboutStyle.roof.top[edge];
    structures[ABOUT.y + 1][ABOUT.x + i] = aboutStyle.roof.bottom[edge];
    const mid = i === 4 ? aboutStyle.wall.door : i % 2 === 1 ? aboutStyle.wall.window : aboutStyle.wall.mid;
    structures[ABOUT.y + 2][ABOUT.x + i] =
      i === 0 ? aboutStyle.wall.left : i === w - 1 ? aboutStyle.wall.right : mid;
    for (let y = ABOUT.y - 1; y <= ABOUT.y + 3; y++) {
      if (reserved[y]) reserved[y][ABOUT.x + i] = true;
    }
  }
  interactables.push({
    type: "about",
    payload: null,
    tx: ABOUT.x + 4,
    ty: ABOUT.y + 3,
    w: 3,
    h: 2,
    label: "About Meet",
  });
  labels.push({ x: ABOUT.x + w / 2, y: ABOUT.y - 0.4, text: "ABOUT ME" });

  // Resume Road milestones (chronological as you walk west)
  timeline.forEach((entry, i) => {
    const x = MILESTONE_XS[i];
    if (x === undefined) return;
    solids.push({ sheet: "town", frame: T.SIGN, x, y: 38 });
    interactables.push({
      type: "milestone",
      payload: entry,
      tx: x,
      ty: 39,
      w: 2,
      h: 2,
      label: `${entry.org} (${entry.period})`,
    });
    reserved[38][x] = true;
  });
  labels.push({ x: 41, y: 37.6, text: "← RESUME ROAD" });

  // Monument + resume chest at the road's end
  for (let i = 0; i < 3; i++) {
    structures[MONUMENT.y][MONUMENT.x + i] = T.CASTLE_TOP[i];
    structures[MONUMENT.y + 1][MONUMENT.x + i] = T.CASTLE_MID[i];
    for (let y = MONUMENT.y; y <= MONUMENT.y + 1; y++)
      for (let x = MONUMENT.x; x <= MONUMENT.x + 2; x++) reserved[y][x] = true;
  }
  labels.push({ x: MONUMENT.x + 1.5, y: MONUMENT.y - 0.4, text: "RESUME" });
  interactables.push({
    type: "resume",
    payload: null,
    tx: CHEST_POS.x,
    ty: CHEST_POS.y,
    w: 3,
    h: 2,
    label: "Resume chest",
  });

  // Shooting range: targets on the fence south of campus
  const targets = [];
  [64, 67, 70, 73].forEach((x) => {
    solids.push({ sheet: "town", frame: T.FENCE_V, x, y: 24 });
    targets.push({ x, y: 23.2 });
    reserved[24][x] = true;
    reserved[23][x] = true;
  });
  labels.push({ x: 68.5, y: 22.2, text: "SHOOTING RANGE" });

  // Plaza decorations
  decor.push({ sheet: "town", frame: T.BENCH, x: 46, y: 36 });
  decor.push({ sheet: "town", frame: T.BENCH, x: 53, y: 36 });
  decor.push({ sheet: "town", frame: T.HIVE, x: 45, y: 43 });
  [
    [33, 56], [60, 56], [37, 66], [61, 66],
  ].forEach(([x, y]) => decor.push({ sheet: "town", frame: pick(rng, [T.SACK, T.POT]), x, y }));

  // NPCs
  const npcs = [
    { frame: D.WIZARD, tx: 63, ty: 34, type: "about", say: "Talk to the wizard" },
    { frame: D.PRINCESS, tx: 46, ty: 41, type: "contact", say: "Say hi" },
    { frame: D.ELDER, tx: 12, ty: 41, type: "resume", say: "Hear the story" },
  ];
  npcs.forEach((n) => {
    interactables.push({
      type: n.type,
      payload: null,
      tx: n.tx,
      ty: n.ty,
      w: 2,
      h: 2,
      label: n.say,
    });
  });

  // Slimes wander the open fields
  const slimes = [
    { tx: 30, ty: 30 }, { tx: 85, ty: 20 }, { tx: 20, ty: 50 },
    { tx: 88, ty: 12 }, { tx: 15, ty: 25 }, { tx: 40, ty: 47 },
  ];

  // Trees: border ring + scattered clusters in free cells
  const treeAt = (x, y) => {
    structures[y][x] = rng() < 0.7 ? T.TREE_GREEN : T.TREE_ORANGE;
    reserved[y][x] = true;
  };
  for (let x = 0; x < WORLD_W; x++)
    [0, 1, WORLD_H - 2, WORLD_H - 1].forEach((y) => !reserved[y][x] && treeAt(x, y));
  for (let y = 0; y < WORLD_H; y++)
    [0, 1, WORLD_W - 2, WORLD_W - 1].forEach((x) => !reserved[y][x] && treeAt(x, y));

  const isFree = (x, y) =>
    x > 2 && y > 2 && x < WORLD_W - 3 && y < WORLD_H - 3 &&
    !reserved[y][x] && road[y][x] === -1 && structures[y][x] === -1;
  for (let i = 0; i < 420; i++) {
    const x = Math.floor(rng() * WORLD_W);
    const y = Math.floor(rng() * WORLD_H);
    if (!isFree(x, y)) continue;
    const roll = rng();
    if (roll < 0.55) treeAt(x, y);
    else if (roll < 0.75) decor.push({ sheet: "town", frame: T.BUSH, x, y });
    else if (roll < 0.9) decor.push({ sheet: "town", frame: T.SPROUT, x, y });
    else decor.push({ sheet: "town", frame: T.MUSHROOM, x, y });
  }

  const banners = DISTRICT_BANNERS.map((b) => ({
    x: b.x,
    y: b.y,
    text: districts[b.key].name.toUpperCase(),
  }));

  return {
    ground,
    road,
    structures,
    interactables,
    labels,
    banners,
    decor,
    solids,
    targets,
    npcs,
    slimes,
    spawn: { tx: 50, ty: 41 },
    chest: CHEST_POS,
  };
}

function shortLabel(title) {
  const MAX = 14;
  return title.length <= MAX ? title : `${title.slice(0, MAX - 1)}…`;
}

import Phaser from "phaser";
import { buildWorld, TILE, WORLD_W, WORLD_H, D } from "./world.js";
import { createUI } from "./ui.js";
import { sfx } from "./sfx.js";
import { createTouchControls } from "./touch.js";

const PLAYER_SPEED = 95;
const BULLET_SPEED = 270;
const BULLET_LIFETIME_MS = 520;
const INTERACT_RADIUS = 30;
const CAMERA_ZOOM = 3;
const MINIMAP = { w: 176, h: 140, margin: 12 };
const STORAGE_KEY = "mg-portfolio-game-v1";

const loadProgress = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { discovered: new Set(raw?.discovered ?? []), coins: raw?.coins ?? 0 };
  } catch {
    return { discovered: new Set(), coins: 0 };
  }
};

const saveProgress = (progress) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ discovered: [...progress.discovered], coins: progress.coins }),
    );
  } catch {
    // private mode etc. — progress just won't persist
  }
};

export class WorldScene extends Phaser.Scene {
  constructor() {
    super("world");
  }

  preload() {
    this.load.image("townTiles", "/assets/game/town.png");
    this.load.spritesheet("town", "/assets/game/town.png", { frameWidth: TILE, frameHeight: TILE });
    this.load.spritesheet("dungeon", "/assets/game/dungeon.png", {
      frameWidth: TILE,
      frameHeight: TILE,
    });
  }

  create() {
    this.world = buildWorld();
    this.progress = loadProgress();
    this.touch = createTouchControls();
    this.lastFacing = { x: 0, y: 1 };
    this.started = false;

    this.buildTilemap();
    this.buildBulletTexture();
    this.buildPlayer();
    this.buildProps();
    this.buildLabels();
    this.buildMinimap();
    this.buildInput();
    this.buildUI();
    window.__scene = this; // debug/testing handle
  }

  // ---------- construction ----------

  buildTilemap() {
    const map = this.make.tilemap({
      tileWidth: TILE,
      tileHeight: TILE,
      width: WORLD_W,
      height: WORLD_H,
    });
    const tiles = map.addTilesetImage("townTiles");
    const putLayer = (name, grid, depth) => {
      const layer = map.createBlankLayer(name, tiles);
      grid.forEach((row, y) =>
        row.forEach((index, x) => {
          if (index >= 0) layer.putTileAt(index, x, y);
        }),
      );
      layer.setDepth(depth);
      return layer;
    };
    putLayer("ground", this.world.ground, 0);
    putLayer("road", this.world.road, 1);
    this.structuresLayer = putLayer("structures", this.world.structures, 2);
    this.structuresLayer.setCollisionByExclusion([-1]);
    this.physics.world.setBounds(0, 0, WORLD_W * TILE, WORLD_H * TILE);
  }

  buildBulletTexture() {
    const g = this.add.graphics();
    g.fillStyle(0xfff1a8, 1);
    g.fillCircle(3, 3, 3);
    g.fillStyle(0xffffff, 1);
    g.fillCircle(3, 3, 1.5);
    g.generateTexture("bullet", 6, 6);
    g.destroy();
  }

  buildPlayer() {
    const { spawn } = this.world;
    this.player = this.physics.add.sprite(px(spawn.tx), px(spawn.ty), "dungeon", D.PLAYER);
    this.player.setDepth(10).setCollideWorldBounds(true);
    this.player.body.setSize(10, 9).setOffset(3, 7);
    this.physics.add.collider(this.player, this.structuresLayer);

    const cam = this.cameras.main;
    cam.setBounds(0, 0, WORLD_W * TILE, WORLD_H * TILE);
    cam.startFollow(this.player, true, 0.12, 0.12);
    cam.setZoom(CAMERA_ZOOM);
    cam.setBackgroundColor("#1a1c2c");

    this.bullets = this.physics.add.group({ defaultKey: "bullet", maxSize: 24 });
    this.physics.add.collider(this.bullets, this.structuresLayer, (bullet) =>
      this.killBullet(bullet, true),
    );
  }

  buildProps() {
    this.solidGroup = this.physics.add.staticGroup();
    this.world.solids.forEach((s) =>
      this.solidGroup.create(px(s.x), px(s.y), s.sheet, s.frame).setDepth(3),
    );
    this.physics.add.collider(this.player, this.solidGroup);

    this.world.decor.forEach((d) => this.add.image(px(d.x), px(d.y), d.sheet, d.frame).setDepth(3));

    // Resume chest
    this.chest = this.add
      .image(px(this.world.chest.x), px(this.world.chest.y), "dungeon", D.CHEST)
      .setDepth(4);
    this.tweens.add({
      targets: this.chest,
      scale: 1.12,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: "sine.inout",
    });

    // NPCs (decorative bodies; their interactions come from world.interactables)
    this.world.npcs.forEach((n) => {
      const npc = this.add.image(px(n.tx), px(n.ty), "dungeon", n.frame).setDepth(9);
      this.tweens.add({
        targets: npc,
        y: npc.y - 1.5,
        duration: 900,
        yoyo: true,
        repeat: -1,
        ease: "sine.inout",
      });
    });

    // Shootable targets
    this.targetGroup = this.physics.add.staticGroup();
    this.world.targets.forEach((t) => {
      const target = this.targetGroup.create(px(t.x), px(t.y), "town", 95);
      target.setDepth(4);
      target.cooldownUntil = 0;
    });
    this.physics.add.overlap(this.bullets, this.targetGroup, (a, b) => {
      const [bullet, target] = this.bulletFirst(a, b);
      this.onTargetHit(bullet, target);
    });

    // Slimes
    this.slimeGroup = this.physics.add.group();
    this.world.slimes.forEach((s) => this.spawnSlime(px(s.tx), px(s.ty)));
    this.physics.add.collider(this.slimeGroup, this.structuresLayer);
    this.physics.add.overlap(this.bullets, this.slimeGroup, (a, b) => {
      const [bullet, slime] = this.bulletFirst(a, b);
      this.onSlimeHit(bullet, slime);
    });
    this.time.addEvent({
      delay: 1400,
      loop: true,
      callback: () => this.wanderSlimes(),
    });

    // Interaction zones (for bullets) + list (for E key)
    this.zones = this.world.interactables.map((item) => {
      const zone = this.add.zone(px(item.tx), px(item.ty), item.w * TILE, item.h * TILE);
      this.physics.add.existing(zone, true);
      zone.meta = item;
      return zone;
    });
    this.physics.add.overlap(this.bullets, this.zones, (a, b) => {
      const [bullet, zone] = this.bulletFirst(a, b);
      this.killBullet(bullet, false);
      this.openInteractable(zone.meta);
    });
  }

  // Phaser may pass overlap pairs in either order when groups/arrays are involved.
  bulletFirst(a, b) {
    return this.bullets.contains(a) ? [a, b] : [b, a];
  }

  buildLabels() {
    const labelStyle = {
      fontFamily: "monospace",
      fontSize: "7px",
      fontStyle: "bold",
      color: "#ffffff",
      stroke: "#1a1c2c",
      strokeThickness: 2,
      resolution: 6,
    };
    this.world.labels.forEach((l) =>
      this.add.text(l.x * TILE, l.y * TILE, l.text, labelStyle).setOrigin(0.5, 1).setDepth(20),
    );
    this.world.banners.forEach((b) =>
      this.add
        .text(b.x * TILE, b.y * TILE, b.text, {
          fontFamily: '"Press Start 2P", monospace',
          fontSize: "9px",
          color: "#f6c945",
          stroke: "#1a1c2c",
          strokeThickness: 3,
          resolution: 4,
        })
        .setOrigin(0.5)
        .setDepth(20),
    );
  }

  buildMinimap() {
    const zoom = Math.min(MINIMAP.w / (WORLD_W * TILE), MINIMAP.h / (WORLD_H * TILE));
    this.minimap = this.cameras
      .add(this.scale.width - MINIMAP.w - MINIMAP.margin, MINIMAP.margin, MINIMAP.w, MINIMAP.h)
      .setZoom(zoom)
      .setBackgroundColor("rgba(10,12,20,0.85)");
    this.minimap.centerOn((WORLD_W * TILE) / 2, (WORLD_H * TILE) / 2);

    this.playerMarker = this.add.rectangle(0, 0, 42, 42, 0xff5566).setDepth(30);
    this.cameras.main.ignore(this.playerMarker);
    this.scale.on("resize", (size) => {
      this.minimap.setPosition(size.width - MINIMAP.w - MINIMAP.margin, MINIMAP.margin);
    });
  }

  buildInput() {
    this.keys = this.input.keyboard.addKeys({
      up: "W",
      down: "S",
      left: "A",
      right: "D",
      up2: "UP",
      down2: "DOWN",
      left2: "LEFT",
      right2: "RIGHT",
      interact: "E",
      fire: "SPACE",
      menu: "M",
    });
    this.input.on("pointerdown", (pointer) => {
      if (!this.started || this.ui.isOpen()) return;
      const world = pointer.positionToCamera(this.cameras.main);
      this.fireToward(world.x, world.y);
    });
  }

  buildUI() {
    this.ui = createUI({
      onModalChange: (open) => {
        if (open) this.player?.setVelocity(0, 0);
      },
      onReset: () => {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* noop */
        }
        window.location.reload();
      },
    });
    this.ui.setCounts(this.countsForHud());
    this.ui.showIntro(() => {
      sfx.unlock();
      this.started = true;
    });
    window.addEventListener("mg-open-menu", () => {
      if (this.started && !this.ui.isOpen()) this.ui.openMenu();
    });
  }

  // ---------- behaviors ----------

  countsForHud() {
    return { discovered: this.progress.discovered.size, coins: this.progress.coins };
  }

  addCoins(amount) {
    this.progress = { ...this.progress, coins: this.progress.coins + amount };
    saveProgress(this.progress);
    this.ui.setCounts(this.countsForHud());
  }

  fireToward(targetX, targetY) {
    const bullet = this.bullets.get(this.player.x, this.player.y - 2);
    if (!bullet) return;
    bullet.setActive(true).setVisible(true).setDepth(11);
    bullet.body.enable = true;
    bullet.body.reset(this.player.x, this.player.y - 2);
    const angle = Math.atan2(targetY - this.player.y, targetX - this.player.x);
    bullet.setVelocity(Math.cos(angle) * BULLET_SPEED, Math.sin(angle) * BULLET_SPEED);
    bullet.diesAt = this.time.now + BULLET_LIFETIME_MS;
    sfx.shoot();
  }

  fireFacing() {
    this.fireToward(
      this.player.x + this.lastFacing.x * 100,
      this.player.y + this.lastFacing.y * 100,
    );
  }

  killBullet(bullet, withThud) {
    if (!bullet.active) return;
    const spark = this.add.image(bullet.x, bullet.y, "bullet").setDepth(11).setAlpha(0.9);
    this.tweens.add({
      targets: spark,
      scale: 2.4,
      alpha: 0,
      duration: 140,
      onComplete: () => spark.destroy(),
    });
    bullet.setActive(false).setVisible(false);
    bullet.body.enable = false;
    if (withThud) sfx.thud();
  }

  onTargetHit(bullet, target) {
    this.killBullet(bullet, false);
    if (this.time.now < target.cooldownUntil) return;
    target.cooldownUntil = this.time.now + 800;
    target.setTintFill(0xffffff);
    this.time.delayedCall(90, () => target.clearTint());
    this.addCoins(1);
    sfx.ding();
  }

  onSlimeHit(bullet, slime) {
    this.killBullet(bullet, false);
    sfx.squish();
    this.addCoins(2);
    const { x, y } = slime;
    slime.destroy();
    this.time.delayedCall(4000, () => this.spawnSlime(x, y));
  }

  spawnSlime(x, y) {
    const slime = this.slimeGroup.create(x, y, "dungeon", D.SLIME);
    slime.setDepth(8).setCollideWorldBounds(true);
    slime.body.setSize(12, 10).setOffset(2, 5);
    slime.setAlpha(0);
    this.tweens.add({ targets: slime, alpha: 1, duration: 350 });
  }

  wanderSlimes() {
    this.slimeGroup.children.iterate((slime) => {
      if (!slime?.body) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = 18 + Math.random() * 22;
      slime.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      slime.setFlipX(slime.body.velocity.x < 0);
    });
  }

  openInteractable(meta) {
    if (this.ui.isOpen()) return;
    sfx.open();
    if (meta.type === "project") {
      this.ui.openProject(meta.payload);
      if (!this.progress.discovered.has(meta.payload.id)) {
        const discovered = new Set([...this.progress.discovered, meta.payload.id]);
        this.progress = { ...this.progress, discovered, coins: this.progress.coins + 5 };
        saveProgress(this.progress);
        this.ui.setCounts(this.countsForHud());
        if (discovered.size === this.totalProjects()) {
          this.ui.showToast("🏆 WORLD CLEARED — every project discovered!");
        }
      }
    } else if (meta.type === "about") this.ui.openAbout();
    else if (meta.type === "milestone") this.ui.openMilestone(meta.payload);
    else if (meta.type === "contact") this.ui.openContact();
    else if (meta.type === "resume") {
      this.chest.setTexture("dungeon", D.CHEST_OPEN);
      this.ui.openResume();
    }
  }

  totalProjects() {
    return this.world.interactables.filter((i) => i.type === "project").length;
  }

  nearestInteractable() {
    const candidates = this.world.interactables
      .map((item) => ({
        item,
        dist: Phaser.Math.Distance.Between(this.player.x, this.player.y, px(item.tx), px(item.ty)),
      }))
      .filter(({ dist }) => dist < INTERACT_RADIUS);
    if (candidates.length === 0) return null;
    return candidates.reduce((best, c) => (c.dist < best.dist ? c : best)).item;
  }

  // ---------- loop ----------

  update() {
    if (!this.player) return;
    this.playerMarker.setPosition(this.player.x, this.player.y);

    this.bullets.children.iterate((bullet) => {
      if (bullet?.active && this.time.now > bullet.diesAt) this.killBullet(bullet, false);
    });

    if (!this.started || this.ui.isOpen()) {
      this.player.setVelocity(0, 0);
      return;
    }

    const k = this.keys;
    const t = this.touch;
    const dx = (k.left.isDown || k.left2.isDown || t.left ? -1 : 0) +
      (k.right.isDown || k.right2.isDown || t.right ? 1 : 0);
    const dy = (k.up.isDown || k.up2.isDown || t.up ? -1 : 0) +
      (k.down.isDown || k.down2.isDown || t.down ? 1 : 0);
    const vec = new Phaser.Math.Vector2(dx, dy).normalize().scale(PLAYER_SPEED);
    this.player.setVelocity(vec.x, vec.y);
    if (dx !== 0 || dy !== 0) {
      this.lastFacing = { x: dx, y: dy };
      this.player.setFlipX(dx < 0);
      this.player.rotation = Math.sin(this.time.now / 60) * 0.06;
    } else {
      this.player.rotation = 0;
    }

    if (Phaser.Input.Keyboard.JustDown(k.fire) || t.fire) {
      t.fire = false;
      this.fireFacing();
    }
    if (Phaser.Input.Keyboard.JustDown(k.menu)) this.ui.openMenu();

    const near = this.nearestInteractable();
    if (near) {
      this.ui.showPrompt(`<kbd>E</kbd> ${near.label}`);
      if (Phaser.Input.Keyboard.JustDown(k.interact) || t.interact) {
        t.interact = false;
        this.openInteractable(near);
      }
    } else {
      this.ui.hidePrompt();
    }
  }
}

const px = (tileCoord) => tileCoord * TILE + TILE / 2;

import Phaser from "phaser";
import { WorldScene } from "./WorldScene.js";

const bootGame = async () => {
  try {
    await document.fonts.load('16px "Press Start 2P"');
  } catch {
    // font may not load; canvas falls back to monospace
  }

  return new Phaser.Game({
    type: Phaser.AUTO,
    parent: "game-container",
    pixelArt: true,
    backgroundColor: "#1a1c2c",
    physics: { default: "arcade", arcade: { debug: false } },
    scale: {
      mode: Phaser.Scale.RESIZE,
      width: window.innerWidth,
      height: window.innerHeight,
    },
    scene: [WorldScene],
  });
};

bootGame();

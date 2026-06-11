import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        game: resolve(__dirname, "game.html"),
        parallax: resolve(__dirname, "parallax.html"),
        basic: resolve(__dirname, "basic.html"),
      },
    },
  },
});

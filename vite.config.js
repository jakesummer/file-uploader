import { defineConfig } from "vite";

export default defineConfig({
  build: {
    manifest: true,
    emptyOutDir: true,
    rolldownOptions: {
      input: {
        main: "src/client/main.js",
      },
      output: {
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});

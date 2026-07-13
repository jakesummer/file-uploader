import { defineConfig } from "vite";

export default defineConfig({
  build: {
    manifest: true,
    emptyOutDir: true,
    rolldownOptions: {
      input: {
        main: "src/client/entries/dashboard.js",
        auth: "src/client/entries/auth.js",
      },
      output: {
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});

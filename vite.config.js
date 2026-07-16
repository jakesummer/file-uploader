import { defineConfig } from "vite";

export default defineConfig({
  build: {
    manifest: true,
    emptyOutDir: true,
    rolldownOptions: {
      input: {
        main: "src/client/entries/dashboard.js",
        signUp: "src/client/entries/signUp.js",
        signIn: "src/client/entries/signIn.js",
      },
      output: {
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});

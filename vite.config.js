import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Set BASE_PATH=/<repo-name>/ when deploying to GitHub Pages.
  base: process.env.BASE_PATH ?? "/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    css: false,
  },
});

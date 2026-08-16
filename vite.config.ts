import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      // Real static pages, not client routes: each ships its own <title> and
      // meta tags at build time, so crawlers that don't execute JS still see
      // correct per-page metadata.
      input: {
        main: path.resolve(__dirname, "index.html"),
        privacyPolicy: path.resolve(__dirname, "privacy-policy/index.html"),
        termsOfService: path.resolve(__dirname, "terms-of-service/index.html"),
      },
    },
  },
});

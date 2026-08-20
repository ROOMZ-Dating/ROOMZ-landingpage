import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * The login/dashboard SPA client-routes beneath its two shells. In production
 * vercel.json rewrites those URLs; the dev server needs the same behavior or
 * deep links like /dashboard/rooms/{id} 404 locally while working deployed —
 * the exact inverse of the usual failure.
 */
function spaFallback(): Plugin {
  return {
    name: "roomz-spa-fallback",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        const isAsset = path.extname(url) !== "";
        const inDash = url === "/dashboard" || url.startsWith("/dashboard/");
        const inLogin = url === "/login" || url.startsWith("/login/");
        if (!isAsset && (inDash || inLogin)) {
          req.url = inDash ? "/dashboard/index.html" : "/login/index.html";
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallback()],
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
        login: path.resolve(__dirname, "login/index.html"),
        dashboard: path.resolve(__dirname, "dashboard/index.html"),
      },
    },
  },
});

// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Keep local/GitHub builds aligned with Lovable's publishing image, which
  // copies the complete deployment artifact from /src/dist.
  nitro: {
    // Lovable publishing uses the default cloudflare-module preset.
    // For Node hosts (e.g. Zeabur), build with NITRO_PRESET=node-server
    // and start with: node dist/server/index.mjs
    preset:
      process.env["NITRO_PRESET"] ||
      (process.env["ZEABUR"] ? "node-server" : "cloudflare-module"),
    output: {
      dir: "dist",
      serverDir: "dist/server",
      publicDir: "dist/client",
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

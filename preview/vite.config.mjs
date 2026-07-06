import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..");

// Live preview of the REAL Hamstack components. Root is preview/, but the app
// imports the actual source from ../components and ../lib (via the @ alias, the
// same one button.tsx uses), so what you see is exactly what ships.
export default defineConfig({
  root: here,
  resolve: { alias: { "@": repo } },
  server: {
    host: "127.0.0.1",
    port: 5178,
    fs: { allow: [repo] },
  },
});

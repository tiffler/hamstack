import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..");
export default defineConfig({
  root: here,
  resolve: { alias: { "@": repo } },
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: resolve(here, "dist"),
    assetsInlineLimit: 100000000,   // inline fonts (woff2) as data URIs
    cssCodeSplit: false,
    reportCompressedSize: false,
    emptyOutDir: true,
  },
});

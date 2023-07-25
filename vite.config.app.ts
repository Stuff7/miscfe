import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  publicDir: "src/app/public",
  build: { outDir: "dist/app" },
  base: "/miscfe",
  server: {
    port: 3000,
    host: true,
  },
  plugins: [
    vue(),
  ],
  preview: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      "@app": resolve("./src/app"),
      "@lib": resolve("./src/lib"),
    },
  },
});

export function resolve(filepath: string) {
  return fileURLToPath(new URL(filepath, import.meta.url));
}

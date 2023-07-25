import { readdirSync } from "node:fs";
import { join } from "node:path";
import { resolve } from "./vite.config.app.ts";

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist/lib",
    lib: {
      entry: getFilePaths("src/lib"),
      formats: ["es"],
      fileName: (_, entryName) => entryName,
    },
  },
});

function getFilePaths(folderPath: string) {
  return readdirSync(resolve(folderPath)).reduce((entries, filePath) => {
    if (filePath.endsWith(".d.ts")) {
      entries[filePath] = resolve(join(folderPath, filePath));
    } else if (filePath.endsWith(".ts")) {
      const fileName = filePath.slice(0, filePath.lastIndexOf("."));
      entries[`${fileName}.js`] = resolve(join(folderPath, filePath));
    }
    return entries;
  }, {} as Record<string, string>);
}

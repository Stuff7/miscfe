import { readdirSync } from "node:fs";
import { join } from "node:path";

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
  return readdirSync(folderPath).reduce((entries, filePath) => {
    if (/^(?!.*\.d\.ts$).*\.ts$/.test(filePath)) {
      const fileName = filePath.slice(0, filePath.lastIndexOf("."));
      entries[`${fileName}.js`] = join(folderPath, filePath);
    }
    return entries;
  }, {} as Record<string, string>);
}

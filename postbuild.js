import { copyFile, readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const sourceFolder = "src/lib";
const destinationFolder = "dist/lib";
const tsFile = /^(?!.*\.d\.ts$).*\.ts$/;

readdirSync(resolve(sourceFolder)).forEach((filePath) => {
  if (!tsFile.test(filePath)) {
    const source = resolve(join(sourceFolder, filePath));
    const destination = resolve(join(destinationFolder, filePath));
    copyFile(source, destination, (err) => {
      if (err) {
        console.error("Failed to copy", filePath);
        throw err;
      }
    });
  }
});

/** @param {string} filepath */
export function resolve(filepath) {
  return fileURLToPath(new URL(filepath, import.meta.url));
}

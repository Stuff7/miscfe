import { copyFile, readdirSync } from "fs";
import { join, resolve } from "path";

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

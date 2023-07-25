import { copyFile, readdirSync } from "fs";
import { join } from "path";

const sourceFolder = "src/lib";
const destinationFolder = "dist/lib";
const tsFile = /^(?!.*\.d\.ts$).*\.ts$/;

readdirSync(sourceFolder).forEach((filePath) => {
  if (!tsFile.test(filePath)) {
    const source = join(sourceFolder, filePath);
    const destination = join(destinationFolder, filePath);
    copyFile(source, destination, (err) => {
      if (err) {
        console.error("Failed to copy", filePath);
        throw err;
      }
    });
  }
});

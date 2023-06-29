const fs = require("fs");
const archiver = require("archiver");
const path = require("path");

// Utility function to compress a DOC file using archiver
function compressDOC(inputPath, outputFileName, compressedDir) {
  return new Promise((resolve, reject) => {
    const outputFilePath = path.join(compressedDir, `${outputFileName}.zip`);

    const output = fs.createWriteStream(outputFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      resolve(outputFilePath);
    });

    output.on("error", (error) => {
      reject(error);
    });

    archive.pipe(output);
    archive.file(inputPath, { name: `${outputFileName}.doc` });
    archive.finalize();
  });
}

module.exports = compressDOC;

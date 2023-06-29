const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");
const compressedDir = "compressed";

const sharp = require('sharp');

function compressImage(inputPath, outputFileName) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(compressedDir, `${outputFileName}.jpg`);
    
    sharp(inputPath)
      .jpeg({ quality: 30 })
      .toFile(outputPath, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(outputPath);
        }
      });
  });
}

module.exports = compressImage;

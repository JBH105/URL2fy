const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
// Utility function to compress a PDF file using GhostScript
function compressPDF(inputPath, outputFileName, compressedDir) {
    return new Promise((resolve, reject) => {
        const outputFilePath = path.join(compressedDir, `${outputFileName}.pdf`);
        const command = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputFilePath} ${inputPath}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(outputFilePath);
            }
        });
    });
}


module.exports = compressPDF

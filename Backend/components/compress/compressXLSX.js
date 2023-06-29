const express = require("express");
const path = require("path");
const XlsxPopulate = require("xlsx-populate");

const app = express();
// Utility function to compress an XLSX file using xlsx-populate library
function compressXLSX(inputPath, outputFileName, compressedDir) {
    return new Promise((resolve, reject) => {
        const outputFilePath = path.join(compressedDir, `${outputFileName}.xlsx`);

        XlsxPopulate.fromFileAsync(inputPath)
            .then((workbook) => {
                workbook
                    .toFileAsync(outputFilePath)
                    .then(() => {
                        resolve(outputFilePath);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = compressXLSX

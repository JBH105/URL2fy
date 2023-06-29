const express = require("express");
const fs = require("fs");
const path = require("path");
const pptxgen = require("nodejs-pptx");

const app = express();

function compressPPTX(inputPath, outputFileName, compressedDir) {
    return new Promise((resolve, reject) => {
        const outputFilePath = path.join(compressedDir, `${outputFileName}.pptx`);

        fs.readFile(inputPath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const pptx = new pptxgen();

            pptx.load(data, (loadErr) => {
                if (loadErr) {
                    reject(loadErr);
                    return;
                }

                pptx.save(outputFilePath, (saveErr) => {
                    if (saveErr) {
                        reject(saveErr);
                    } else {
                        resolve(outputFilePath);
                    }
                });
            });
        });
    });
}

module.exports = compressPPTX
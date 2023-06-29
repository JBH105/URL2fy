const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const compressDOC = require('../components/compress/compressDOC')
const compressImage = require('../components/compress/compressImage')
const compressPDF = require('../components/compress/compressPDF')
const compressPPTX = require('../components/compress/compressPPTX')
const compressXLSX = require('../components/compress/compressXLSX')

const compressedDir = "compressed";
if (!fs.existsSync(compressedDir)) {
    fs.mkdirSync(compressedDir);
}

function compressFile(req, res) {
    // Get the uploaded file path
    const filePath = req.file.path;

    // Generate a unique output file name
    const outputFileName = `${Date.now()}_compressed`;

    const mimeType = req.file.mimetype;

    // Check if the file is an image
    if (mimeType.startsWith("image/")) {
        compressImage(filePath, outputFileName, compressedDir)
            .then((outputFilePath) => {
                // Move the compressed image file to the 'compressed' directory
                const destinationPath = path.join(
                    compressedDir,
                    `${outputFileName}.jpg`
                );
                fs.rename(outputFilePath, destinationPath, (renameError) => {
                    if (renameError) {
                        console.error(`Error: ${renameError.message}`);
                        res.status(500).json({
                            error: "An error occurred while moving the compressed image.",
                        });
                        return;
                    }

                    // Get the live URL for the compressed image file
                    const compressedImageURL = `${req.protocol}://${req.get('host')}/${compressedDir}/${outputFileName}.jpg`;

                    res.json({ message: "URL Create successfully", url: compressedImageURL });

                    // Clean up the temporary files
                    fs.unlinkSync(filePath);
                });
            })
            .catch((error) => {
                console.error(`Error: ${error.message}`);
                res
                    .status(500)
                    .json({ error: "An error occurred while compressing the image." });

                // Clean up the temporary files
                fs.unlinkSync(filePath);
            });
    } else if (mimeType === "application/pdf") {
        compressPDF(filePath, outputFileName, compressedDir)
            .then((outputFilePath) => {
                // Move the compressed PDF file to the 'compressed' directory
                const destinationPath = path.join(
                    compressedDir,
                    `${outputFileName}.pdf`
                );
                fs.rename(outputFilePath, destinationPath, (renameError) => {
                    if (renameError) {
                        console.error(`Error: ${renameError.message}`);
                        res.status(500).json({
                            error: "An error occurred while moving the compressed PDF.",
                        });
                        return;
                    }

                    // Get the live URL for the compressed PDF file
                    const compressedPDFURL = `${req.protocol}://${req.get('host')}/${compressedDir}/${outputFileName}.pdf`;

                    res.json({ message: "URL Create successfully", url: compressedPDFURL });

                    // Clean up the temporary files
                    fs.unlinkSync(filePath);
                });
            })
            .catch((error) => {
                console.error(`Error: ${error.message}`);
                res
                    .status(500)
                    .json({ error: "An error occurred while compressing the PDF." });

                // Clean up the temporary files
                fs.unlinkSync(filePath);
            });
    } else if (
        mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
        compressXLSX(filePath, outputFileName, compressedDir)
            .then((outputFilePath) => {
                // Move the compressed XLSX file to the 'compressed' directory
                const destinationPath = path.join(
                    compressedDir,
                    `${outputFileName}.xlsx`
                );
                fs.rename(outputFilePath, destinationPath, (renameError) => {
                    if (renameError) {
                        console.error(`Error: ${renameError.message}`);
                        res.status(500).json({
                            error: "An error occurred while moving the compressed XLSX.",
                        });
                        return;
                    }

                    // Get the live URL for the compressed XLSX file
                    const compressedXLSXURL = `${req.protocol}://${req.get('host')}/${compressedDir}/${outputFileName}.xlsx`;

                    res.json({ message: "URL Create successfully", url: compressedXLSXURL });

                    // Clean up the temporary files
                    fs.unlinkSync(filePath);
                });
            })
            .catch((error) => {
                console.error(`Error: ${error.message}`);
                res
                    .status(500)
                    .json({ error: "An error occurred while compressing the XLSX." });

                // Clean up the temporary files
                fs.unlinkSync(filePath);
            });
    } else if (
        mimeType ===
        "application/msword") {
        compressDOC(filePath, outputFileName, compressedDir)
            .then((outputFilePath) => {
                // Move the compressed DOC file to the 'compressed' directory
                const destinationPath = path.join(compressedDir, `${outputFileName}.zip`);
                fs.rename(outputFilePath, destinationPath, (renameError) => {
                    if (renameError) {
                        console.error(`Error: ${renameError.message}`);
                        res.status(500).json({
                            error: "An error occurred while moving the compressed DOC.",
                        });
                        return;
                    }

                    // Get the live URL for the compressed DOC file
                    const compressedDOCURL = `${req.protocol}://${req.get('host')}/${compressedDir}/${outputFileName}.zip`;

                    res.json({ message: "URL Create successfully", url: compressedDOCURL });

                    // Clean up the temporary files
                    fs.unlinkSync(filePath);
                });
            })
            .catch((error) => {
                console.error(`Error: ${error.message}`);
                res.status(500).json({ error: "An error occurred while compressing the DOC." });

                // Clean up the temporary files
                fs.unlinkSync(filePath);
            });
    } else if (
        mimeType ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
        compressPPTX(filePath, outputFileName, compressedDir)
            .then((outputFilePath) => {
                // Move the compressed PPTX file to the 'compressed' directory
                const destinationPath = path.join(
                    compressedDir,
                    `${outputFileName}.pptx`
                );
                fs.rename(outputFilePath, destinationPath, (renameError) => {
                    if (renameError) {
                        console.error(`Error: ${renameError.message}`);
                        res.status(500).json({
                            error: "An error occurred while moving the compressed PPTX.",
                        });
                        return;
                    }

                    // Get the live URL for the compressed PPTX file
                    const compressedPPTXURL = `${req.protocol}://${req.get('host')}/${compressedDir}/${outputFileName}.pptx`;

                    res.json({ message: "URL Create successfully", url: compressedPPTXURL });

                    // Clean up the temporary files
                    fs.unlinkSync(filePath);
                });
            })
            .catch((error) => {
                console.error(`Error: ${error.message}`);
                res
                    .status(500)
                    .json({ error: "An error occurred while compressing the PPTX." });

                // Clean up the temporary files
                fs.unlinkSync(filePath);
            });
    } else {
        // Unsupported file type
        res.status(400).json({ error: "Unsupported file type." });

        // Clean up the temporary files
        fs.unlinkSync(filePath);
    }
}

module.exports = {
    compressFile
}
const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const XlsxPopulate = require("xlsx-populate");
const PptxGenJS = require("pptxgenjs");
const XLSX = require("xlsx");
const JSZip = require("jszip");
const Docxtemplater = require("docxtemplater");
const Pptxtemplater = require("pptxtemplater");
const pptxgen = require("nodejs-pptx");

const app = express();

// Configure multer to store uploaded files in the 'uploads' directory
const upload = multer({ dest: "uploads/" });

// Create the 'compressed' directory if it doesn't exist
const compressedDir = "compressed";
if (!fs.existsSync(compressedDir)) {
  fs.mkdirSync(compressedDir);
}

// Define a route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  // Get the uploaded file path
  const filePath = req.file.path;

  // Generate a unique output file name
  const outputFileName = `${Date.now()}_compressed`;

  const mimeType = req.file.mimetype;

  // Check if the file is an image
  if (mimeType.startsWith("image/")) {
    compressImage(filePath, outputFileName)
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
          const compressedImageURL = `http://localhost:8000/${compressedDir}/${outputFileName}.jpg`;

          res.json({ url: compressedImageURL });

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
    compressPDF(filePath, outputFileName)
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
          const compressedPDFURL = `http://localhost:8000/${compressedDir}/${outputFileName}.pdf`;

          res.json({ url: compressedPDFURL });

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
    compressXLSX(filePath, outputFileName)
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
          const compressedXLSXURL = `http://localhost:8000/${compressedDir}/${outputFileName}.xlsx`;

          res.json({ url: compressedXLSXURL });

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
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    compressDOC(filePath, outputFileName)
      .then((outputFilePath) => {
        // Move the compressed DOC file to the 'compressed' directory
        const destinationPath = path.join(
          compressedDir,
          `${outputFileName}.docx`
        );
        fs.rename(outputFilePath, destinationPath, (renameError) => {
          if (renameError) {
            console.error(`Error: ${renameError.message}`);
            res.status(500).json({
              error: "An error occurred while moving the compressed DOC.",
            });
            return;
          }

          // Get the live URL for the compressed DOC file
          const compressedDOCURL = `http://localhost:8000/${compressedDir}/${outputFileName}.docx`;

          res.json({ url: compressedDOCURL });

          // Clean up the temporary files
          fs.unlinkSync(filePath);
        });
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
        res
          .status(500)
          .json({ error: "An error occurred while compressing the DOC." });

        // Clean up the temporary files
        fs.unlinkSync(filePath);
      });
  } else if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    compressPPTX(filePath, outputFileName)
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
          const compressedPPTXURL = `http://localhost:8000/${compressedDir}/${outputFileName}.pptx`;

          res.json({ url: compressedPPTXURL });

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
});

// Serve the compressed files
app.use(`/${compressedDir}`, express.static(compressedDir));

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Utility function to compress an image using ImageMagick
function compressImage(inputPath, outputFileName) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(compressedDir, `${outputFileName}.jpg`);
    const command = `convert ${inputPath} -quality 20 ${outputPath}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(outputPath);
      }
    });
  });
}

// Utility function to compress a PDF file using GhostScript
function compressPDF(inputPath, outputFileName) {
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

// Utility function to compress an XLSX file using xlsx-populate library
function compressXLSX(inputPath, outputFileName) {
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

// Utility function to compress a DOC file using docxtemplater library
function compressDOC(inputPath, outputFileName) {
  return new Promise((resolve, reject) => {
    const outputFilePath = path.join(compressedDir, `${outputFileName}.docx`);

    fs.readFile(inputPath, "binary", (readError, fileData) => {
      if (readError) {
        reject(readError);
        return;
      }

      const zip = new JSZip(fileData);
      const doc = new Docxtemplater().loadZip(zip);

      doc.render();
      const updatedContent = doc.getZip().generate({ type: "nodebuffer" });

      fs.writeFile(outputFilePath, updatedContent, "binary", (writeError) => {
        if (writeError) {
          reject(writeError);
        } else {
          resolve(outputFilePath);
        }
      });
    });
  });
}

// Utility function to compress a PPTX file using pptxgenjs library
// function compressPPTX(inputPath, outputFileName) {
//   return new Promise((resolve, reject) => {
//     const outputFilePath = path.join(compressedDir, `${outputFileName}.pptx`);

//     const pptx = new PptxGenJS();
//     pptx.load(inputPath);

//     pptx.save(outputFilePath, (saveError) => {
//       if (saveError) {
//         reject(saveError);
//       } else {
//         resolve(outputFilePath);
//       }
//     });
//   });
// }

// Utility function to compress a PPTX file using node-pptx-compressor
function compressPPTX(inputPath, outputFileName) {
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


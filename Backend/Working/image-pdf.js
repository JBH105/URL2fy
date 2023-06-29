const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

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
        const destinationPath = path.join(compressedDir, `${outputFileName}.jpg`);
        fs.rename(outputFilePath, destinationPath, (renameError) => {
          if (renameError) {
            console.error(`Error: ${renameError.message}`);
            res
              .status(500)
              .json({ error: "An error occurred while moving the compressed image." });
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
    // Generate a unique output file name
    const outputFilePath = path.join(compressedDir, `${outputFileName}.pdf`);

    // Define the GhostScript command to compress the PDF
    const command = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputFilePath} ${filePath}`;

    // Execute the GhostScript command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        res
          .status(500)
          .json({ error: "An error occurred while compressing the PDF." });
        return;
      }

      // Get the live URL for the compressed PDF file
      const compressedPDFURL = `http://localhost:8000/${compressedDir}/${outputFileName}.pdf`;

      res.json({ url: compressedPDFURL });

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

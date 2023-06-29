const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");

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
  const outputFileName = `${Date.now()}_compressed.pdf`;

  // Define the GhostScript command to compress the PDF
  const command = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputFileName} ${filePath}`;

  // Execute the GhostScript command
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res
        .status(500)
        .json({ error: "An error occurred while compressing the PDF." });
      return;
    }

    // Move the compressed PDF file to the 'compressed' directory
    const destinationPath = `${compressedDir}/${outputFileName}`;
    fs.rename(outputFileName, destinationPath, (renameError) => {
      if (renameError) {
        console.error(`Error: ${renameError.message}`);
        res
          .status(500)
          .json({ error: "An error occurred while moving the compressed PDF." });
        return;
      }

      // Get the live URL for the compressed PDF file
      const compressedPDFURL = `http://localhost:8000/${compressedDir}/${outputFileName}`;

      res.json({ url: compressedPDFURL });

      // Clean up the temporary files
      fs.unlinkSync(filePath);
    });
  });
});

// Serve the compressed PDF files
app.use(`/${compressedDir}`, express.static(compressedDir));

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

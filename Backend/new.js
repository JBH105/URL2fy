const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { promisify } = require('util');
const pdfParse = require('pdf-parse');
const TurndownService = require('turndown');

const app = express();
const port = 8000;
const uploadPath = 'uploads/';
const convertedPath = 'converted/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueId = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, uniqueId + extension);
  },
});

const upload = multer({ storage: storage });

app.use(express.static('uploads'));
app.use('/converted', express.static('converted')); // Serve the converted HTML files

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const filePath = path.join(uploadPath, file.filename);
    let htmlFilePath;

    if (file.mimetype === 'application/pdf') {
      // Convert PDF to HTML using pdf-parse library
      const pdfData = await promisify(fs.readFile)(filePath);
      const { text } = await pdfParse(pdfData);
      const turndownService = new TurndownService();
      const markdownContent = turndownService.turndown(text);
      htmlFilePath = path.join(convertedPath, file.filename + '.html');
      await promisify(fs.writeFile)(htmlFilePath, markdownContent);
    } else {
      // For other file types, create a download link
      htmlFilePath = filePath;
    }

    const url = req.protocol + '://' + req.get('host') + '/' + htmlFilePath;
    res.json({ message: 'File uploaded and converted to HTML', url: url });
  } catch (err) {
    console.error('Error uploading and converting file:', err);
    res.status(500).json({ error: 'Failed to upload and convert file' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

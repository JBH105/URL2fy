const express = require("express");
const multer = require("multer");
const { compressFile } = require("./controllers/compressionController");

const router = express.Router();
// Configure multer to store uploaded files in the 'uploads' directory
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), compressFile);

module.exports = router;
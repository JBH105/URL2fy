const express = require("express");
const routes = require("./routes");
var cors = require('cors')
const app = express();
app.use(cors())

const compressedDir = "compressed";

// Mount compression routes
app.use(routes);

// Serve the compressed files
app.use(`/${compressedDir}`, express.static(compressedDir));

// Start the server
app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});

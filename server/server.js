// server.js
require("dotenv").config();
const spawn = require('child_process').spawn;
const express = require("express");
const cors = require('cors')
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3306;

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/example.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/example.com/fullchain.pem'),
};


app.use(cors())

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const studentsRoutes = require("./rest/routes/students.routes");
const compositeRoutes = require("./rest/routes/composite.routes");

// Use routes
app.use("/students", studentsRoutes);
app.use("/composite", compositeRoutes); // for GET /year?program? and PUT /year/program

// Generic error handling (optional advanced structure)
//const { errorHandler } = require("./utils/errorHandler");
//app.use(errorHandler);

// Start server
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});

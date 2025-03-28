// server.js
require("dotenv").config();
const spawn = require('child_process').spawn;
const express = require("express");
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3306;

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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

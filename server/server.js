// server.js
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const studentsRoutes = require("./routes/students.routes");
const compositeRoutes = require("./routes/year.routes");
const blacklistRoutes = require("./routes/blacklist.routes");

// Use routes
app.use("/allStudents", studentsRoutes);
app.use("/composite", compositeRoutes); // for GET /year?program? and PUT /year/program
app.use("/blacklist", blacklistRoutes);

// Generic error handling (optional advanced structure)
const { errorHandler } = require("./utils/errorHandler");
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

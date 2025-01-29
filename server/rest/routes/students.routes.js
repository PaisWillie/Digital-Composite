const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/students.controller");

// GET /allStudents -> returns { year-program: {name: center} }
router.get("/", studentsController.getAllStudents);

module.exports = router;

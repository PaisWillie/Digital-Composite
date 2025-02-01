const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/students.controller");

// GET /allStudents -> returns { year-program: {name: center} }
router.get("/getAll", studentsController.getAllStudents);

router.get("/getUniquePrograms", studentsController.getUniquePrograms);

router.get("/getStudentByYearProgram", studentsController.getStudentsByProgram);

// PUT -> add Student to DB manually
router.put("/addStudent", studentsController.addStudentBatch)

module.exports = router;

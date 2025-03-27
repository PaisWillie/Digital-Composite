const studentsService = require("../services/students.service");
require("dotenv").config();

exports.getAllStudents = async (req, res) => {
    try {
      const allStudents = await studentsService.getAllStudents();
      return res.status(200).json(allStudents);
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
};

exports.addStudentBatch = async (req, res) => {
    try {
      const { Year, Program, Batch } = req.body;

      if (!Year || !Program || !Batch ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      await studentsService.deleteStudentsWithImageId(Year, Program);
      await studentsService.addBatch({ Year, Program, Batch });
      
      return res.status(200).json({ message: "Added student successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
};

exports.getUniquePrograms = async (req, res) => {
  try {
    const allStudents = await studentsService.getUniquePrograms();
    console.log(process.env.DB_HOST)
    return res.status(200).json(allStudents);
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
};

exports.getStudentsByProgram = async (req, res) => {
  try {
    const { year, program } = req.query;

    if (year == null || program == null) {
      return res.status(400).send("Ba Request. Please provide the year and program")
    }

    const allStudents = await studentsService.getStudentsByYearProgram(year, program);
    return res.status(200).json(allStudents);
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

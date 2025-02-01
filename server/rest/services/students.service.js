const StudentsDAL = require("../../db/dal/student_service");

exports.addStudent = async ({ year, program, data }) => {
    
  const studentsDAL = new StudentsDAL();
  
  return studentsDAL.addStudent(year, program, data)
  
};

exports.addBatch = async ({year, program, batchreq}) => {
  const students = batchreq.students
  students.forEach((data) => {
    this.addStudent(year, program, data)
  });
}

exports.getAllStudents = async () => {
  const studentsDAL = new StudentsDAL();

  return studentsDAL.getAllStudents();
}

exports.getUniquePrograms = async () => {
  const studentsDAL = new StudentsDAL();

  return studentsDAL.getUniquePrograms();
}

exports.getStudentsByYearProgram = async (year, program) => {
  const studentsDAL = new StudentsDAL();

  return studentsDAL.getStudentsByProgram(year, program)
}
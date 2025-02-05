const StudentsDAL = require("../../db/dal/student_service");

async function addStudent(Year, Program, Data) {
    
  const studentsDAL = new StudentsDAL();
  
  return studentsDAL.addStudent(Year, Program, Data)
  
};

exports.addBatch = async ({Year, Program, Batch}) => {
  const students = Batch.students
  students.forEach((data) => {
    console.log(data)
    console.log(typeof(data))
    addStudent(Year, Program, data)
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

exports.blacklistStudent = async (studentData, year, program) => {
  const studentsDAL = new StudentsDAL();

  return studentsDAL.blacklistStudent(studentData, year, program)
}

exports.deleteStudentsWithImageId = async (year, program) => {
  const studentsDAL = new StudentsDAL();

  return studentsDAL.deleteStudentsWithImageId(year, program)
}
const StudentsDAL = require("../../db/dal/student_service");

exports.addStudent = async ({ Year, Program, Name, Center }) => {
    
  const studentsDAL = new StudentsDAL();
  
  return studentsDAL.addStudent(Year, Program, Name, Center)
  
};
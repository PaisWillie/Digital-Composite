const RDS = require("../dao/rds_operations")

class StudentService {
    constructor() {
        this.RDS = new RDS();
    }

    async addStudent(year, program, data) {
        const imageId = `${year}-${program}`
        this.RDS.addStudent(data.name, imageId, data.top_left, data.top_right, data.bottom_left, data.bottom_right, data.student_region)
    }

    async getAllStudents() {
        return this.RDS.getAllStudents()
    }

    async getUniquePrograms() {
        return this.RDS.getAllUniqueImageIds()
    }

    async getStudentsByProgram(year, program) {
        const imageId = `${year}-${program}`

        return this.RDS.getStudentDataByImageId(imageId)
    }
}

module.exports = StudentService
const RDS = require("../dao/rds_operations")

class StudentService {
    constructor() {
        this.RDS = new RDS();
    }

    async addStudent(year, program, name, center) {
        const imageId = `${year}-${program}`
        this.RDS.addStudent(imageId, name, center)
    }
}

module.exports = StudentService
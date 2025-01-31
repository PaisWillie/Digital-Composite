const pool = require("../client/rds");

class RDS {

    constructor() {}

    async addStudent(image_id, name, center) {
        try {
            const [result] = await pool.execute(
                "INSERT INTO Students (image_id, name, center) VALUES (?, ?, ?)",
                [image_id, name, center]
            );
            console.log(result)
            return result
        } catch (error) {
            console.error(error);
            throw new Error(`FAILED to add student: ${error.message}`)
        }
    }
}

module.exports = RDS

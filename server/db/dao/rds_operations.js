const pool = require("../client/rds");

class RDS {

    constructor() {}

    async addStudent(name, image_id, top_left, top_right, bottom_left, bottom_right, student_region) {
        try {
            const [result] = await pool.execute(
                `INSERT INTO OCRDATA 
                (name, image_id, top_left, top_right, bottom_left, bottom_right, student_region) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    name,
                    image_id,
                    JSON.stringify(top_left),
                    JSON.stringify(top_right),
                    JSON.stringify(bottom_left),
                    JSON.stringify(bottom_right),
                    JSON.stringify(student_region)
                ]
            );
            console.log(result)
            return result
        } catch (error) {
            console.error(error);
            throw new Error(`FAILED to add student: ${error.message}`)
        }
    }

    async getAllStudents() {
        try {
            const [rows] = await pool.execute("SELECT * FROM OCRDATA");

            // Filter out rows where any field is NULL
            const students = rows.filter(row => 
                row.id !== null &&
                row.name !== null &&
                row.image_id !== null &&
                row.top_left !== null &&
                row.top_right !== null &&
                row.bottom_left !== null &&
                row.bottom_right !== null &&
                row.student_region !== null
            ).map(row => {
                // Create a new object for each student (with non-null values only)
                const student = {};
    
                student.id = row.id;
                student.name = row.name;
                student.image_id = row.image_id;
                student.top_left = JSON.parse(JSON.stringify(row.top_left));
                student.top_right = JSON.parse(JSON.stringify(row.top_right));
                student.bottom_left = JSON.parse(JSON.stringify(row.bottom_left));
                student.bottom_right = JSON.parse(JSON.stringify(row.bottom_right));
                student.student_region = JSON.parse(JSON.stringify(row.student_region));
    
                return student;
            });
    
            return students;
        } catch (error) {
            console.error("Error fetching students:", error);
            return [];
        }
    }

    async getAllUniqueImageIds() {
        try {
            const [rows] = await pool.execute("SELECT DISTINCT image_id FROM OCRDATA");
    
            const imageIds = rows.map(row => row.image_id);
            
            return imageIds;
        } catch (error) {
            console.error("Error fetching unique image IDs:", error);
            return [];
        }
    }

    async deleteStudentsWithImageId(imageId) {
        try {

            const [result] = await pool.execute("DELETE FROM OCRDATA WHERE image_id = ?", [imageId]);

            console.log(`Number of rows deleted: ${result.affectedRows}`);
            return `Successfully deleted: ${result.affectedRows}`;

        } catch (error) {
            console.error("Error deleting rows, error");
            return `Error deleting rows: ${error.message}`;   
        }
    }
    
    async getStudentDataByImageId(imageId) {
        try {
            const [rows] = await pool.execute("SELECT * FROM OCRDATA WHERE image_id = ?", [imageId]);
    
            // Check if any rows are returned
            if (rows.length > 0) {
                // If there are rows, we can parse the JSON fields
                const studentData = rows.map(row => {
                    return {
                        id: row.id,
                        name: row.name,
                        image_id: row.image_id,
                        top_left: row.top_left ? JSON.parse(JSON.stringify(row.top_left)) : null,
                        top_right: row.top_right ? JSON.parse(JSON.stringify(row.top_right)) : null,
                        bottom_left: row.bottom_left ? JSON.parse(JSON.stringify(row.bottom_left)) : null,
                        bottom_right: row.bottom_right ? JSON.parse(JSON.stringify(row.bottom_right)) : null,
                        student_region: row.student_region ? JSON.parse(JSON.stringify(row.student_region)) : null
                    };
                });
    
                return studentData;
            } else {
                console.log("No data found for the given image_id.");
                return [];
            }
        } catch (error) {
            console.error("Error fetching student data by image_id:", error);
            return [];
        }
    }
}
module.exports = RDS

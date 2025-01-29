import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import dynamodb_client from "../client/dynamodb_client";

class DYNAMODB_DAO {
    constructor() {
        this.tableName = "db_name";
        this.region = "us-east-2";
        this.roleArn = "arn:aws:iam::717279725934:role/Admin"; 
        this.table = null;
    }

    /**
     * Upload a record to DynamoDB.
     * @param {string} programYear - Unique key (e.g., "2023-Software").
     * @param {object} students - JSON object containing student names and values.
     */
    static async uploadProgramData(programYear, students) {
        const params = {
            TableName: this.tabl,
            Item: {
                program_year: programYear,
                students: students
            }
        };

        try {
            await dynamo.send(new PutCommand(params));
            console.log(`Successfully inserted ${programYear}`);
        } catch (error) {
            console.error("Error inserting data:", error);
            throw new Error("DynamoDB Insert Failed");
        }
    }
}

module.exports = DYNAMODB_DAO;
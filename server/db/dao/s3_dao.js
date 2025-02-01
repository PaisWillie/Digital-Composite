const { default: s3_client } = require("../client/s3_client");
const { PutObjectCommand, GetObjectCommand} = require("@aws-sdk/client-s3");

class S3DAO {
    constructor() {
        this.bucketName = "digital-composite-bucket";
        this.region = "us-east-2";
        this.roleArn = "arn:aws:iam::717279725934:role/Admin"; 
        this.s3 = null;
    }

    async streamToBuffer(stream) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("end", () => resolve(Buffer.concat(chunks)));
            stream.on("error", (err) => reject(err));
        });
    };

    /**
     * Upload a file to S3.
     * @param {File} file - Local file path.
     * @param {string} objectName - S3 object key.
     * @returns {string} - Public URL of the uploaded file.
     */
    async uploadFile(objKey, file) {
        
        this.s3 = await s3_client(this.roleArn, this.region);

        try {
            const params = {
                Bucket: this.bucketName,
                Key: objKey,
                Body: file.buffer,
                ContentType: file.mimetype
            };

            await this.s3.send(new PutObjectCommand(params));
            return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${objKey}`;

        } catch (error) {
            throw new Error(`File upload failed: ${error.message}`);
        }
    }

    /**
     * Download a file from S3.
     * @param {string} objectName - S3 object key.
     */
    async downloadFile(objectName) {

        this.s3 = await s3_client(this.roleArn, this.region);

        try {
            const { Body, ContentType } = await this.s3.send(
                new GetObjectCommand({
                  Bucket: this.bucketName,
                  Key: objectName,
                }),
            );

            const buffer = await this.streamToBuffer(Body);

            console.log("Reached Dao")

            return { Body: buffer , ContentType }

        } catch (error) {
            throw new Error(`File download failed: ${error.message}`);
        }
    }
}

module.exports = S3DAO;

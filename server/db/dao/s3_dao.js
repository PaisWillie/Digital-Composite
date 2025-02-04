const { default: s3_client } = require("../client/s3_client");
const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3");

class S3DAO {
    constructor() {
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
     * @param {bucketname} bucket - bucket name
     * @param {File} file - Local file path.
     * @param {string} objectName - S3 object key.
     * @returns {string} - Public URL of the uploaded file.
     */
    async uploadFile(bucketname, objKey, file) {
        
        this.s3 = await s3_client(this.roleArn, this.region);
        
        try {
            const params = {
                Bucket: bucketname,
                Key: objKey,
                Body: file.buffer,
                ContentType: file.mimetype
            };

            await this.s3.send(new PutObjectCommand(params));
            return `https://${bucketname}.s3.${this.region}.amazonaws.com/${objKey}`;

        } catch (error) {
            throw new Error(`File upload failed: ${error.message}`);
        }
    }

    /**
     * Download a file from S3.
     * @param {bucketname} bucket - bucket name
     * @param {string} objectName - S3 object key.
     */
    async downloadFile(bucketname, objectName) {

        this.s3 = await s3_client(this.roleArn, this.region);

        try {
            const { Body, ContentType } = await this.s3.send(
                new GetObjectCommand({
                  Bucket: bucketname,
                  Key: objectName,
                }),
            );

            const buffer = await this.streamToBuffer(Body);

            return { Body: buffer , ContentType }

        } catch (error) {
            throw new Error(`File download failed: ${error.message}`);
        }
    }

    /**
     * delete a file from S3.
     * @param {bucketname} bucket - bucket name
     * @param {string} objectName - S3 object key.
     */
    async deleteFile(bucketname, objectname) {
        this.s3 = await s3_client(this.roleArn, this.region);

        try {
            const bucketParams = { Bucket: bucketname, Key: objectname}
            const data = await this.s3.send(new DeleteObjectCommand(bucketParams));
            return data
        } catch (error) {
            throw new Error(`File deletion failed: ${error.message}`);
        }
    }
}

module.exports = S3DAO;

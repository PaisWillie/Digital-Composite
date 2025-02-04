const S3DAO = require("../dao/s3_dao"); // Update the path based on your file structure

class ImageService {
    constructor() {
        this.s3DAO = new S3DAO();
    }

    /**
     * Upload an image to S3.
     * @param {string} filePath - Local file path.
     * @param {string} imageName - Desired name for the uploaded image.
     * @returns {Promise<string>} - Public URL of the uploaded image.
     */
    async uploadImage(bucketname, objectkey, file) {
        return this.s3DAO.uploadFile(bucketname, objectkey, file);
    }

    /**
     * Download an image from S3.
     * @param {string} imageName - S3 object key for the image.
     * @param {string} downloadPath - Local path to save the downloaded image.
     */
    async downloadImage(bucketname, objectName) {
        return await this.s3DAO.downloadFile(bucketname, objectName);
    }

    async deleteImage(bucketname, objectName) {
        return await this.s3DAO.deleteFile(bucketname, objectName);
    }
}

module.exports = ImageService;

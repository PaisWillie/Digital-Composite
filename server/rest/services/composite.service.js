const fs = require("fs");
const ImageService = require("../../db/dal/image_service");

exports.getImage = async ({ year, program }) => {

  const dal = new ImageService()

  console.log("Reached Service Level")
  
  return dal.downloadImage("2024/electrical/test.jpg")
  
};

exports.saveImage = async ({ year, program, file }) => {
  // If we used diskStorage in multer, file will have a path
  // e.g., /uploads/file-123456.jpg
  // If you want S3, you can pass file to s3Service.uploadFile

  // This example does nothing special because Multer is already saving
  // it to the disk. If you want to rename it or store metadata, do it here.

  // Possibly rename the file to something like "year-program-originalName"
  // if you want. For demonstration:
  const newFileName = `${year}-${program}-${file.filename}`;
  const newPath = path.join(path.dirname(file.path), newFileName);
  fs.renameSync(file.path, newPath);

  return newFileName;
};

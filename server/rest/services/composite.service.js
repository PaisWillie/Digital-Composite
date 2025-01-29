const fs = require("fs");
const dal = require("../../db/dal/image_service");

// Example local approach. If you want S3, see `s3.service.js`.

exports.getImage = async ({ year, program }) => {
  
  const possibleFiles = fs.readdirSync(uploadPath);

  // Try to find a file that might match the pattern
  // e.g. "year-program" in the filename
  const fileName = possibleFiles.find((f) => f.includes(`${year}-${program}`));
  if (!fileName) return null;

  // Return buffer
  return fs.readFileSync(path.join(uploadPath, fileName));
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

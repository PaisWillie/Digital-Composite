const ImageService = require("../../db/dal/image_service");

exports.getImage = async ({ year, program }) => {

  const s3_dal = new ImageService()
  const objKey = `${year}/${program}/random.png`

  return s3_dal.downloadImage(objKey)
};

exports.saveImage = async ({ year, program, file }) => {

  const s3_dal = new ImageService()
  const objKey = `${year}/${program}/random.png`

  return s3_dal.uploadImage(objKey, file)
};

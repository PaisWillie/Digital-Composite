const ImageService = require("../../db/dal/image_service");

exports.getImage = async ({bucketname, year, program }) => {

  const s3_dal = new ImageService()
  const objKey = `${year}/${program}/composite.jpg`

  return s3_dal.downloadImage(bucketname, objKey)
};

exports.saveImage = async ({bucketname, year, program, file }) => {

  const s3_dal = new ImageService()
  const objKey = `${year}/${program}/composite.jpg`

  return s3_dal.uploadImage(bucketname, objKey, file)
};

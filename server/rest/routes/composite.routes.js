const express = require("express");
const router = express.Router();
const compositeController = require("../controllers/composite.controller");
const upload = require("../middleware/upload.middleware");

// GET /year?program? 
router.get("/getComposite", compositeController.getImageByYearAndProgram);

// PUT /year/program  (uploading image)
router.post(
  "/uploadComposite/:year/:program",
  upload.single("file"), // "file" is the name of the form field 
  compositeController.uploadImageByYearAndProgram
);

module.exports = router;

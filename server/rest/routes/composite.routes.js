const express = require("express");
const router = express.Router();
const yearController = require("../controllers/composite.controller");
// const upload = require("../middlewares/upload.middleware");

// GET /year?program? 
router.get("/year", yearController.getImageByYearAndProgram);

// PUT /year/program  (uploading image)
/*
router.put(
  "/:year/:program",
  upload.single("file"), // "file" is the name of the form field 
  yearController.uploadImageByYearAndProgram
);
*/

module.exports = router;

const express = require("express");
const router = express.Router();
const compositeController = require("../controllers/composite.controller");
const upload = require("../middleware/upload.middleware");

// GET /year?program? 
router.get("/getComposite", compositeController.getImageByYearAndProgram);
router.get("/getCompositePreview", compositeController.getImageByYearAndProgramPreview)

// PUT /year/program  (uploading image)
router.post(
  "/uploadComposite",
  upload.single("file"), // "file" is the name of the form field 
  compositeController.uploadImageByYearAndProgram
);

router.post("/deleteComposite", compositeController.deleteImageByYearAndProgram)

router.put("/blacklistStudent", compositeController.blacklistStudent)

module.exports = router;

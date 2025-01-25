const yearService = require("../services/year.service");

exports.getImageByYearAndProgram = async (req, res, next) => {
    try {
        const { year } = req.query;
        const { program } = req.query;
        
        if (year == null || program == null) {
            return res.status(400).send("Bad Request. Please provide the year and program")
        }

        const imageBuffer = await yearService.getImage({ year, program });

        if (!imageBuffer) {
            return res.status(404).send("Image not found");
        }

        res.set("Content-Type", "image/jpeg"); 
        return res.status(200).send(imageBuffer);
    } catch (error) {
        next(error);
    }
};

exports.uploadImageByYearAndProgram = async (req, res, next) => {
    try {
        const { year, program } = req.params;
        // in mutler
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        await yearService.saveImage({ year, program, file: req.file });
        return res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
        next(error);
    }
};

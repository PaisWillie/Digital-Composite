const compositeService = require("../services/composite.service");
const fs = require("fs");

exports.getImageByYearAndProgram = async (req, res, next) => {
    try {
        const { year } = req.query;
        const { program } = req.query;
        
        if (year == null || program == null) {
            return res.status(400).send("Bad Request. Please provide the year and program")
        }

        const {Body, ContentType } = await compositeService.getImage({ year, program });

        if (!Body) {
            return res.status(404).send("Image not found");
        }

        res.setHeader("Content-Type", ContentType);
        res.setHeader("Content-Disposition", `attachment; filename="keyFileName"`);
        res.status(200)
        res.send(Body); 

        fs.writeFile("pic.png", Body, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
        });

    } catch (error) {
        next(error);
    }
};

exports.uploadImageByYearAndProgram = async (req, res) => {
    try {
        const { year, program } = req.params;

        console.log("Request Params:", { year, program });
        console.log("Request Body:", req.body);
        console.log("Request File:", req.file); // This should not be undefined

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const uploadResult = await compositeService.saveImage({ year, program, file: req.file });

        return res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

const compositeService = require("../services/composite.service");
const { executePythonScript } = require("../../util/pythonExecutor");
const { spawn } = require("child_process");

async function downloadImage(req, res, bucketname){
    try {
        const { year } = req.query;
        const { program } = req.query;
        
        if (year == null || program == null) {
            return res.status(400).send("Bad Request. Please provide the year and program")
        }

        const {Body, ContentType } = await compositeService.getImage({ bucketname, year, program });

        if (!Body) {
            return res.status(404).send("Image not found");
        }

        res.setHeader("Content-Type", ContentType);
        res.setHeader("Content-Disposition", `attachment; filename="keyFileName"`);
        res.status(200)
        res.send(Body); 

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.getImageByYearAndProgram = async (req, res) => {
    downloadImage(req, res, "digital-composite-bucket")
};

exports.getImageByYearAndProgramPreview = async (req, res) => {
    downloadImage(req, res, "digital-composite-preview")
};

exports.uploadImageByYearAndProgram = async (req, res) => {
    try {
        const year = req.body.year;
        const program = req.body.program;

        console.log("Request Body:", req.body);
        console.log("Request File:", req.file); // This should not be undefined

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        let bucketname = "digital-composite-bucket";
        await compositeService.saveImage({ bucketname, year, program, file: req.file });

        const ocrParsedData = await new Promise( (resolve, reject) => {
            const pythonProcess = spawn("python", ["scripts/ovalNameDetection.py", `${year}-${program}`]);

            let dataBuffer = "";
    
            pythonProcess.stdin.write(req.file.buffer);
            pythonProcess.stdin.end();
    
            pythonProcess.stdout.on("data", (data) => {
                dataBuffer += data.toString();
            });
    
            pythonProcess.stderr.on("data", (data) => {
                console.error(`Python Error: ${data}`);
            });
        
            pythonProcess.on("close", (code) => {
                try{
                    console.log(dataBuffer)
                    console.log(`Python script exited with code ${code}`);
                    resolve(JSON.parse(dataBuffer))
                } catch (error) {
                    reject(error)
                }                
            });
        })

        const scalingImage = await executePythonScript(
            "scripts/scaleComposite.py",
            req.file.buffer,
            []
        );

        const previewFile = {
            mimetype: req.file.mimetype,
            buffer: Buffer.isBuffer(scalingImage) ? scalingImage : Buffer.from(scalingImage)
        }

        bucketname = "digital-composite-preview";
        await compositeService.saveImage({ bucketname, year, program, file: previewFile });
                    
        return res.status(200).json({ message: "Image uploaded successfully", data: ocrParsedData });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

exports.deleteImageByYearAndProgram = async (req, res) => {
    try {
        const { year, program } = req.body;

        if (!year || !program) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let bucketname = "digital-composite-bucket";
        await compositeService.deleteImage({ bucketname, year, program });

        bucketname = "digital-composite-preview";
        await compositeService.deleteImage({ bucketname, year, program });

        return res.status(200).json({ message: "Image deleted successfully" });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.blacklistStudent = async (req, res) => {
    try {
        const { year, program, student } = req.body;

        if (!student) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let bucketname = "digital-composite-bucket";
        const {Body, ContentType } = await compositeService.getImage({ bucketname, year, program });

        const blacklistStudentImg = await executePythonScript(
            "scripts/blacklistStudent.py", 
            Body, 
            [JSON.stringify(student)]
        );

        const blacklistFile = {
            mimetype: 'image/jpeg',
            buffer: Buffer.isBuffer(blacklistStudentImg) ? blacklistStudentImg : Buffer.from(blacklistStudentImg)
        }

        await compositeService.saveImage({ bucketname, year, program, file: blacklistFile });

        const blacklistScaledImage = await executePythonScript(
            "scripts/scaleComposite.py",
            blacklistStudentImg,
            []
        );

        const blacklistScaledFile = {
            mimetype: 'image/jpeg',
            buffer: Buffer.isBuffer(blacklistScaledImage) ? blacklistScaledImage : Buffer.from(blacklistScaledImage)
        }

        bucketname = "digital-composite-preview";
        await compositeService.saveImage({ bucketname, year, program, file: blacklistScaledFile });
      
        return res.status(200).json({ message: "Blacklisted student successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}



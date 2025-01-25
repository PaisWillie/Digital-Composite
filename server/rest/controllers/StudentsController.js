const studentsService = require("../services/students.service");

exports.getAllStudents = async (req, res, next) => {
    try {
        /**
         * {
         *   "2023-Software": {"JohnDoe#1": "0.1982", 
         *                     "JaneSmith#2": "0.2382",
         *                      ....
         *                    },
         *   "2024-Electrical":{"MarkBoom#8": "0.5832", 
         *                     "JaneSmith#9": "0.3382",
         *                      ....
         *                    },
         * }
         */
        const allStudents = await studentsService.getAllStudents();
        return res.status(200).json(allStudents);
    } catch (error) {
        next(error);
    }
};

exports.addStudentToBlacklist = async (req, res, next) => {
    try {
      const { Year, Program, Name, Id } = req.body;
  
      if (!Year || !Program || !Name || !Id) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      await blacklistService.addToBlacklist({ Year, Program, Name, Id });
      return res.status(200).json({ message: "Blacklisted successfully" });
    } catch (error) {
      next(error);
    }
  };

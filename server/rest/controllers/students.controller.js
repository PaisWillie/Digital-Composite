const studentsService = require("../services/students.service");

exports.getAllStudents = async (req, res) => {
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
      return res.status(500).json({ error: error.message })
    }
};

exports.addStudent = async (req, res) => {
    try {
      const { Year, Program, Name, Center } = req.body;

      if (!Year || !Program || !Name || !Center) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      await studentsService.addStudent({ Year, Program, Name, Center });
      return res.status(200).json({ message: "Added student successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
};

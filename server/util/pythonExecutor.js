const { spawn } = require("child_process");

const executePythonScript = (scriptPath, buffer, args = []) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn("python", [scriptPath, ...args]);

        let outputBuffer = Buffer.alloc(0);

        pythonProcess.stdin.write(buffer);
        pythonProcess.stdin.end();

        pythonProcess.stdout.on("data", (data) => {
            outputBuffer = Buffer.concat([outputBuffer, data]);
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error(`Python Error: ${data}`);
        });

        pythonProcess.on("close", (code) => {
            if (code === 0) {
                resolve(outputBuffer);
            } else {
                reject(new Error(`Python script exited with code ${code}`));
            }
        });
    });
}

module.exports = { executePythonScript };
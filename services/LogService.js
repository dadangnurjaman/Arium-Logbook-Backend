const fs = require('fs');
const path = require('path');

// Function to read server log file
const readLogFile = (logFilePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(logFilePath || process.env.APP_SERVER_LOG_PATH, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
};

// Function to get recent logs
const getRecentLogs = async (logFilePath, lines = 100) => {
    try {
        const data = await readLogFile(logFilePath);
        const logLines = data.trim().split('\n');
        const recentLogs = logLines.slice(-lines).join('\n');
        return recentLogs;
    } catch (error) {
        throw new Error(`Failed to get recent logs: ${error.message}`);
    }
};

module.exports = {
    readLogFile,
    getRecentLogs,
};

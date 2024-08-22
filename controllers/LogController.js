// backend/controllers/LogController.js

const logService = require('../services/LogService');

// Controller untuk membaca seluruh file log dari server
const readLogFile = async (req, res) => {
    const { logFilePath } = req.params; // Mengambil logFilePath dari parameter URL

    try {
        // Menggunakan service untuk membaca file log
        const logData = await logService.readLogFile(logFilePath);
        res.status(200).json({ logData });
    } catch (error) {
        res.status(500).json({ error: `Failed to read log file: ${error.message}` });
    }
};

// Controller untuk mendapatkan log terbaru dari file log
const getRecentLogs = async (req, res) => {
    const { logFilePath } = req.params; // Mengambil logFilePath dari parameter URL
    const lines = parseInt(req.query.lines, 10) || 100; // Mengambil jumlah baris dari query string atau default ke 100

    try {
        // Menggunakan service untuk mendapatkan log terbaru
        const recentLogs = await logService.getRecentLogs(logFilePath, lines);
        res.status(200).json({ recentLogs });
    } catch (error) {
        res.status(500).json({ error: `Failed to get recent logs: ${error.message}` });
    }
};

module.exports = {
    readLogFile,
    getRecentLogs,
};

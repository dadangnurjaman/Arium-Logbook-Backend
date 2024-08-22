// backend/controllers/AuditLogController.js

const AuditLogService = require('../services/AuditLogService');

// Controller untuk mencatat tindakan pengguna
const logUserAction = async (req, res) => {
    const { userId, action, details } = req.body;

    try {
        await AuditLogService.logAction(userId, action, details);
        res.status(201).json({ message: 'Action logged successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk mendapatkan semua log berdasarkan userId
const getUserLogs = async (req, res) => {
    const { userId } = req.params;

    try {
        const logs = await AuditLogService.getLogsByUser(userId);
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk mendapatkan semua log
const getAllLogs = async (req, res) => {
    try {
        const logs = await AuditLogService.getAllLogs();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    logUserAction,
    getUserLogs,
    getAllLogs,
};

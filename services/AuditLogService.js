const AuditLog = require('../models/AuditLogModel');

const logAction = async (userId, action, details) => {
    const log = new AuditLog({
        userId,
        action,
        details,
        timestamp: new Date(),
    });
    await log.save();
};

const getLogsByUser = async (userId) => {
    return await AuditLog.find({ userId }).sort({ timestamp: -1 });
};

const getAllLogs = async () => {
    return await AuditLog.find().sort({ timestamp: -1 });
};

module.exports = {
    logAction,
    getLogsByUser,
    getAllLogs,
};

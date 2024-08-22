// backend/controllers/UserReportController.js

const userReportService = require('../services/UserReportService');

// Controller untuk submit laporan pengguna baru
const submitUserReport = async (req, res) => {
    try {
        const reportData = req.body;
        const userReport = await userReportService.submitUserReport(reportData);
        res.status(201).json(userReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk memperbarui status laporan pengguna
const updateUserReportStatus = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { status } = req.body;
        const updatedReport = await userReportService.updateUserReportStatus(reportId, status);
        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    submitUserReport,
    updateUserReportStatus,
};

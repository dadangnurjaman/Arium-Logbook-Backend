// backend/controllers/ReportController.js

const reportService = require('../services/ReportService');
const notificationService = require('../services/NotificationService');
const User = require('../models/UserModel');

// Controller untuk submit report
const submitReport = async (req, res) => {
    try {
        const reportData = req.body;
        const similarReport = await reportService.findSimilarReport(reportData);

        if (similarReport) {
            return res.status(200).json({ message: 'Similar report found', report: similarReport });
        }

        const report = await reportService.submitReport(reportData);

        // Kirim notifikasi ke user setelah laporan disubmit
        const user = await User.findById(report.userId);
        if (user) {
            await notificationService.notifyUser(user, `Your report titled "${report.title}" has been submitted successfully.`);
        }

        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk resolve report
const resolveReport = async (req, res) => {
    try {
        const { reportId, solutionDescription } = req.body;
        const report = await reportService.resolveReport(reportId, solutionDescription);

        // Kirim notifikasi ke user setelah laporan diselesaikan
        const user = await User.findById(report.userId);
        if (user) {
            await notificationService.notifyUser(user, `Your report titled "${report.title}" has been resolved.`);
        }

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk mencari report yang serupa
const findSimilarReport = async (req, res) => {
    try {
        const reportData = req.body;
        const similarReport = await reportService.findSimilarReport(reportData);
        res.status(200).json(similarReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk mendapatkan report berdasarkan ID
const getReportById = async (req, res) => {
    try {
        const { reportId } = req.params;
        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk mendapatkan semua report
const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    submitReport,
    resolveReport,
    findSimilarReport,
    getReportById,
    getAllReports,
};

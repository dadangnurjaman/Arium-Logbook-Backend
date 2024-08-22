// backend/routes/reportRoutes.js

const express = require('express');
const reportController = require('../controllers/ReportController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rute untuk submit report
router.post('/submit', authMiddleware, reportController.submitReport);

// Rute untuk resolve report
router.post('/resolve', authMiddleware, reportController.resolveReport);

// Rute untuk mencari report yang serupa
router.post('/find-similar', authMiddleware, reportController.findSimilarReport);

// Rute untuk mendapatkan report berdasarkan ID
router.get('/:reportId', authMiddleware, reportController.getReportById);

// Rute untuk mendapatkan semua report
router.get('/', authMiddleware, reportController.getAllReports);

module.exports = router;

// backend/routes/userReportRoutes.js

const express = require('express');
const userReportController = require('../controllers/UserReportController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rute untuk submit laporan pengguna
router.post('/', authMiddleware, userReportController.submitUserReport);

// Rute untuk memperbarui status laporan pengguna
router.put('/:reportId', authMiddleware, userReportController.updateUserReportStatus);

module.exports = router;

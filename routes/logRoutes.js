// backend/routes/logRoutes.js

const express = require('express');
const logController = require('../controllers/LogController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rute untuk membaca seluruh file log
router.get('/read/:logFilePath', authMiddleware, logController.readLogFile);

// Rute untuk mendapatkan log terbaru
router.get('/recent/:logFilePath', authMiddleware, logController.getRecentLogs);

module.exports = router;

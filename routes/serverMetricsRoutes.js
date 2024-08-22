// backend/routes/serverMetricsRoutes.js

const express = require('express');
const serverMetricsController = require('../controllers/ServerMetricsController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rute untuk mengambil dan menyimpan metrik dari semua server
router.post('/fetch-and-store', authMiddleware, serverMetricsController.fetchAndStoreMetrics);

// Rute untuk mendapatkan metrik berdasarkan nama server
router.get('/:serverName', authMiddleware, serverMetricsController.getMetricsByServer);

module.exports = router;

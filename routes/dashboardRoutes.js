// backend/routes/dashboardRoutes.js

const express = require('express');
const { getDashboardDataForRole } = require('../controllers/DashboardController');
const authMiddleware = require('../middlewares/authMiddleware'); // Pastikan pengguna sudah login

const router = express.Router();

router.get('/dashboard-data', authMiddleware, getDashboardDataForRole);

module.exports = router;

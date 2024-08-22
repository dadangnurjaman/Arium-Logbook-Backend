// backend/routes/auditLogRoutes.js

const express = require('express');
const router = express.Router();
const AuditLogController = require('../controllers/AuditLogController');

// Rute untuk mencatat tindakan pengguna
router.post('/log', AuditLogController.logUserAction);

// Rute untuk mendapatkan semua log berdasarkan userId
router.get('/user/:userId', AuditLogController.getUserLogs);

// Rute untuk mendapatkan semua log
router.get('/logs', AuditLogController.getAllLogs);

module.exports = router;

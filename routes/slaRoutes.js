// backend/routes/slaRoutes.js

const express = require('express');
const slaController = require('../controllers/SLAController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rute untuk membuat SLA baru
router.post('/create', authMiddleware, slaController.createSLA);

// Rute untuk melacak SLA
router.post('/track', authMiddleware, slaController.trackSLA);

module.exports = router;

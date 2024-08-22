// backend/routes/solutionRoutes.js

const express = require('express');
const solutionController = require('../controllers/SolutionController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rute untuk membuat solusi baru
router.post('/', authMiddleware, solutionController.createSolution);

// Rute untuk mendapatkan solusi berdasarkan incidentId
router.get('/incident/:incidentId', authMiddleware, solutionController.getSolutionByIncident);

// Rute untuk mendapatkan solusi berdasarkan reportId
router.get('/report/:reportId', authMiddleware, solutionController.getSolutionByReport);

module.exports = router;

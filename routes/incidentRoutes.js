// backend/routes/incidentRoutes.js

const express = require('express');
const incidentController = require('../controllers/IncidentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, incidentController.createIncident);
router.post('/:incidentId/assign-to-support', authMiddleware, incidentController.assignToSupport);
router.post('/:incidentId/assign-to-developer', authMiddleware, incidentController.assignToDeveloper);
router.put('/:incidentId/resolve', authMiddleware, incidentController.resolveIncident);
router.get('/:incidentId/sla', authMiddleware, incidentController.trackSLA);

module.exports = router;

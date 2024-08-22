// backend/routes/logbookRoutes.js

const express = require('express');
const logbookController = require('../controllers/LogbookController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, logbookController.createLogbookEntry);
router.get('/', authMiddleware, logbookController.getLogbookEntries);
router.get('/:application', authMiddleware, logbookController.getLogbookEntriesByApp);

module.exports = router;

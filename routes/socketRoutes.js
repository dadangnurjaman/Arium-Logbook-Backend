// backend/routes/socketRoutes.js

const express = require('express');
const socketController = require('../controllers/SocketController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rute untuk mengirim notifikasi real-time
router.post('/send-notification', authMiddleware, socketController.sendNotification);

module.exports = router;

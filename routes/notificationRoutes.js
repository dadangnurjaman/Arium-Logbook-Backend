// backend/routes/notificationRoutes.js
const express = require('express');
const notificationController = require('../controllers/NotificationController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rute untuk mengirim email notifikasi
router.post('/email', authMiddleware, notificationController.sendEmailNotification);

// Rute untuk mengirim notifikasi lokal
router.post('/local', authMiddleware, notificationController.sendLocalNotification);

// Rute untuk mengirim notifikasi berdasarkan preferensi pengguna
router.post('/notify', authMiddleware, notificationController.notifyUser);

// Rute untuk mendapatkan semua notifikasi lokal berdasarkan userId dari token
router.get('/', authMiddleware, notificationController.getLocalNotificationsByUser);

// Rute untuk menandai notifikasi sebagai telah dibaca
router.patch('/mark-as-read/:id', authMiddleware, notificationController.markAsRead);

// Rute untuk menghapus notifikasi
router.delete('/:id', authMiddleware, notificationController.deleteNotification);

module.exports = router;

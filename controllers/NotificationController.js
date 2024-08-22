// backend/controllers/NotificationController.js
const notificationService = require('../services/NotificationService');
const Notification = require('../models/NotificationModel');
const User = require('../models/UserModel');

// Controller untuk mengirim email secara manual
const sendEmailNotification = async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
        await notificationService.sendEmail({ to, subject, text, html });
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to send email: ${error.message}` });
    }
};

// Controller untuk mengirim notifikasi lokal (disimpan di database)
const sendLocalNotification = async (req, res) => {
    const { userId, title, message, type } = req.body;

    try {
        await notificationService.sendLocalNotification(userId, title, message, type);
        res.status(200).json({ message: 'Local notification saved successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to save local notification: ${error.message}` });
    }
};

// Controller untuk mengirim notifikasi berdasarkan preferensi pengguna
const notifyUser = async (req, res) => {
    const { userId, message } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await notificationService.notifyUser(user, message);
        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to send notification: ${error.message}` });
    }
};

// Controller untuk mendapatkan notifikasi lokal berdasarkan userId
const getLocalNotificationsByUser = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: `Failed to get notifications: ${error.message}` });
    }
};

// Fungsi untuk menandai notifikasi sebagai telah dibaca
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
};

// Fungsi untuk menghapus notifikasi
const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete notification' });
    }
};

module.exports = {
    sendEmailNotification,
    sendLocalNotification,
    notifyUser,
    getLocalNotificationsByUser,
    markAsRead,
    deleteNotification,
};

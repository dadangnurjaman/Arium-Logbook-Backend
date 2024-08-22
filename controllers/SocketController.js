// backend/controllers/SocketController.js

const socketService = require('../services/SocketService');

// Controller untuk mengirim notifikasi real-time kepada user tertentu
const sendNotification = async (req, res) => {
    try {
        const { userId, message } = req.body;
        socketService.sendRealTimeNotification(userId, message);
        res.status(200).json({ message: 'Real-time notification sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    sendNotification,
};

// config/notifications.js

const nodemailer = require('nodemailer');
const { Notification } = require('../models/NotificationModel'); // Pastikan model ini sudah ada
const WebSocket = require('../websocket/socket');

// Konfigurasi transport untuk nodemailer menggunakan nilai dari .env
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true untuk 465, false untuk lainnya
    auth: {
        user: process.env.EMAIL_USERNAME, // Username dari .env
        pass: process.env.EMAIL_PASSWORD, // Password dari .env
    },
});

// Fungsi untuk mengirim email
const sendEmail = async (options) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'no-reply@example.com', // Email pengirim dari .env atau default
        to: options.to, // Email penerima
        subject: options.subject, // Subjek email
        text: options.text, // Teks email
        html: options.html, // HTML email, opsional
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw new Error('Failed to send email');
    }
};

// Fungsi untuk mengirim notifikasi real-time menggunakan WebSocket
const sendRealTimeNotification = (client, message) => {
    try {
        client.send(JSON.stringify({ type: 'notification', message }));
        console.log('Real-time notification sent successfully');
    } catch (error) {
        console.error(`Error sending real-time notification: ${error.message}`);
    }
};

// Fungsi untuk mengirim notifikasi lokal (disimpan di database)
const sendLocalNotification = async (userId, title, message, type = 'info') => {
    try {
        const notification = new Notification({
            userId,
            title,
            message,
            type, // info, warning, error, success
            read: false,
            createdAt: new Date(),
        });
        await notification.save();
        console.log('Local notification saved:', notification);
    } catch (error) {
        console.error('Error saving local notification:', error);
    }
};

// Fungsi untuk mengirim notifikasi berdasarkan preferensi pengguna
const notifyUser = async (user, message) => {
    // Kirim email jika preferensi email diaktifkan
    if (user.notificationPreferences.email) {
        await sendEmail({ 
            to: user.email, 
            subject: 'Notification', 
            text: message 
        });
    }

    // Kirim notifikasi real-time jika preferensi real-time diaktifkan dan client terhubung
    if (user.notificationPreferences.realTime && WebSocket.clients[user._id]) {
        sendRealTimeNotification(WebSocket.clients[user._id], message);
    }

    // Kirim notifikasi lokal (disimpan di database)
    await sendLocalNotification(user._id, 'Notification', message);
};

module.exports = {
    sendEmail,
    sendRealTimeNotification,
    sendLocalNotification,
    notifyUser,
};

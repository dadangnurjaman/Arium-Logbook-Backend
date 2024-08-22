// backend/services/NotificationService.js
const nodemailer = require('nodemailer');
const Notification = require('../models/NotificationModel');
const { sendRealTimeNotification } = require('./SocketService');

// Email transporter configuration
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Email sending function
const sendEmail = async (options) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'no-reply@example.com',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw new Error('Failed to send email');
    }
};

// Local notification function
const sendLocalNotification = async (userId, title, message, type = 'info') => {
    try {
        const notification = new Notification({
            userId,
            title,
            message,
            type,
            read: false,
            createdAt: new Date(),
        });
        await notification.save();
        console.log('Local notification saved:', notification);
    } catch (error) {
        console.error('Error saving local notification:', error);
    }
};

// Function to notify user based on preferences
const notifyUser = async (user, message) => {
    if (user.notificationPreferences.email) {
        await sendEmail({ 
            to: user.email, 
            subject: 'Notification', 
            text: message 
        });
    }

    if (user.notificationPreferences.realTime) {
        sendRealTimeNotification(user._id, message);
    }

    await sendLocalNotification(user._id, 'Notification', message);
};

module.exports = {
    sendEmail,
    sendLocalNotification,
    notifyUser,
};

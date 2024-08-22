// backend/models/NotificationModel.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID pengguna yang menerima notifikasi
    title: { type: String, required: true }, // Judul notifikasi
    message: { type: String, required: true }, // Isi pesan notifikasi
    type: { type: String, enum: ['info', 'warning', 'error', 'success'], default: 'info' }, // Jenis notifikasi
    read: { type: Boolean, default: false }, // Status apakah notifikasi sudah dibaca
    createdAt: { type: Date, default: Date.now }, // Waktu notifikasi dibuat
    channel: { type: String, enum: ['email', 'web', 'sms'], default: 'web' } // Kanal notifikasi
});

module.exports = mongoose.model('Notification', NotificationSchema);

const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    action: { type: String, required: true }, // Deskripsi tindakan yang dilakukan
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID pengguna yang melakukan tindakan
    timestamp: { type: Date, default: Date.now }, // Waktu tindakan dilakukan
    details: { type: String } // Detail tambahan terkait tindakan
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);

const mongoose = require('mongoose');

const LogbookSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID pengguna yang melakukan tindakan
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident' }, // ID insiden yang terkait dengan tindakan
    action: { type: String, required: true }, // Deskripsi tindakan yang diambil
    timestamp: { type: Date, default: Date.now }, // Waktu tindakan dilakukan
    details: { type: String } // Detail tambahan tentang tindakan yang diambil
});

module.exports = mongoose.model('Logbook', LogbookSchema);

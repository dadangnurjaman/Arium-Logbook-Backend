const mongoose = require('mongoose');

const SLASchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nama SLA
    description: { type: String, required: true }, // Deskripsi SLA
    responseTime: { type: Number, required: true }, // Waktu respons dalam menit
    resolutionTime: { type: Number, required: true }, // Waktu penyelesaian dalam menit
    application: { type: String, enum: ['CBS', 'BIS', 'RS'], required: true } // Aplikasi yang terkait dengan SLA
});

module.exports = mongoose.model('SLA', SLASchema);

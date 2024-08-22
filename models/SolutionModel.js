const mongoose = require('mongoose');

const SolutionSchema = new mongoose.Schema({
    description: { type: String, required: true }, // Deskripsi solusi yang diterapkan
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true }, // ID insiden yang terkait dengan solusi ini
    createdAt: { type: Date, default: Date.now } // Waktu solusi dibuat
});

module.exports = mongoose.model('Solution', SolutionSchema);

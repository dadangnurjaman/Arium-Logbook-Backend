const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Judul insiden
    description: { type: String, required: true }, // Deskripsi insiden
    impactLevel: { type: String, enum: ['P0', 'P1', 'P2', 'High', 'Medium', 'Low'], required: true }, // Tingkat dampak insiden
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' }, // Status insiden
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Pengguna yang melaporkan insiden
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Pengguna yang ditugaskan untuk menangani insiden
    application: { type: String, enum: ['CBS', 'BIS', 'RS'], required: true }, // Aplikasi yang terkena dampak insiden
    timestamp: { type: Date, default: Date.now }, // Waktu insiden dilaporkan
    isSLAApplicable: { type: Boolean, default: false }, // Apakah SLA berlaku untuk insiden ini
    solution: { type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }, // Solusi yang terkait dengan insiden
    screenshots: [{ type: String }], // Daftar URL gambar yang terkait dengan insiden
    resolutionTime: { type: Number }, // Waktu yang dibutuhkan untuk menyelesaikan insiden dalam menit
    responseTime: { type: Number } // Waktu yang dibutuhkan untuk merespons insiden dalam menit
});

module.exports = mongoose.model('Incident', IncidentSchema);

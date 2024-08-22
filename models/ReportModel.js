const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Judul laporan
    description: { type: String, required: true }, // Deskripsi laporan
    category: { type: String, enum: ['Complaint', 'Incident', 'Suggestion', 'Support'], required: true }, // Kategori laporan
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Pengguna yang mengirimkan laporan
    screenshots: [{ type: String }], // Daftar URL gambar yang terkait dengan laporan
    status: { type: String, enum: ['Pending', 'Reviewed', 'Resolved'], default: 'Pending' }, // Status laporan
    createdAt: { type: Date, default: Date.now }, // Waktu laporan dibuat
    application: { type: String, enum: ['CBS', 'BIS', 'RS'], required: true }, // Aplikasi yang terkait dengan laporan
    solution: { type: mongoose.Schema.Types.ObjectId, ref: 'Solution' } // Solusi terkait laporan jika sudah tersedia
});

module.exports = mongoose.model('Report', ReportSchema);

const mongoose = require('mongoose');

const UserReportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID pengguna yang membuat laporan
    reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: true }, // ID laporan yang terkait
    submittedAt: { type: Date, default: Date.now } // Waktu laporan diserahkan
});

module.exports = mongoose.model('UserReport', UserReportSchema);

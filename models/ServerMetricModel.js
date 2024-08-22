const mongoose = require('mongoose');

const ServerMetricSchema = new mongoose.Schema({
    serverName: { type: String, required: true }, // Nama server yang dimonitor
    cpuUsage: { type: Number, required: true }, // Penggunaan CPU dalam persentase
    memoryUsage: { type: Number, required: true }, // Penggunaan memori dalam persentase
    diskUsage: { type: Number, required: true }, // Penggunaan disk dalam persentase
    timestamp: { type: Date, default: Date.now } // Waktu metrik diambil
});

module.exports = mongoose.model('ServerMetric', ServerMetricSchema);

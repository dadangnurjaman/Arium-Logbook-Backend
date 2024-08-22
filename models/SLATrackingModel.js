const mongoose = require('mongoose');

const SLATrackingSchema = new mongoose.Schema({
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true }, // ID insiden yang dilacak SLA-nya
    slaId: { type: mongoose.Schema.Types.ObjectId, ref: 'SLA', required: true }, // ID SLA yang terkait
    isCompliant: { type: Boolean, default: true }, // Apakah SLA dipatuhi atau tidak
    responseTime: { type: Number, required: true }, // Waktu respons yang dicapai
    resolutionTime: { type: Number, required: true }, // Waktu penyelesaian yang dicapai
    createdAt: { type: Date, default: Date.now } // Waktu pencatatan SLA
});

module.exports = mongoose.model('SLATracking', SLATrackingSchema);

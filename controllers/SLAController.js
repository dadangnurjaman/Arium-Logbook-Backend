// backend/controllers/SLAController.js

const slaService = require('../services/SLAService');

// Controller untuk membuat SLA baru
const createSLA = async (req, res) => {
    try {
        const sla = await slaService.createSLA(req.body);
        res.status(201).json({ message: 'SLA created successfully', sla });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk melacak SLA berdasarkan insiden dan statusnya
const trackSLA = async (req, res) => {
    try {
        const { incidentId, slaId, status } = req.body;
        const slaTracking = await slaService.trackSLA(incidentId, slaId, status);
        res.status(201).json({ message: 'SLA tracking recorded successfully', slaTracking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSLA,
    trackSLA,
};

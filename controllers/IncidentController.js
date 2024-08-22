// backend/controllers/IncidentController.js

const incidentService = require('../services/IncidentService');

// Controller untuk membuat insiden baru
const createIncident = async (req, res) => {
    try {
        const incidentData = req.body;

        // Cek apakah ada insiden serupa yang sudah terselesaikan
        const similarIncident = await incidentService.findSimilarIncident(incidentData);
        if (similarIncident) {
            return res.status(200).json({
                message: 'Similar resolved incident found. Refer to existing solution.',
                incident: similarIncident,
            });
        }

        // Jika tidak ada, buat insiden baru
        const newIncident = await incidentService.createIncident(incidentData);
        res.status(201).json(newIncident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk menugaskan insiden ke L1 Support
const assignToSupport = async (req, res) => {
    try {
        const { incidentId } = req.params;
        await incidentService.assignToSupport(incidentId);
        res.status(200).json({ message: 'Incident assigned to support successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk menugaskan insiden ke Developer (L2)
const assignToDeveloper = async (req, res) => {
    try {
        const { incidentId } = req.params;
        await incidentService.assignToDeveloper(incidentId);
        res.status(200).json({ message: 'Incident assigned to developer successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk menyelesaikan insiden
const resolveIncident = async (req, res) => {
    try {
        const { incidentId } = req.params;
        const { solutionDescription } = req.body;

        const resolvedIncident = await incidentService.resolveIncident(incidentId, solutionDescription);
        res.status(200).json(resolvedIncident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk melacak SLA insiden
const trackSLA = async (req, res) => {
    try {
        const { incidentId } = req.params;

        await incidentService.trackSLA(incidentId);
        res.status(200).json({ message: 'SLA tracked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createIncident,
    assignToSupport,
    assignToDeveloper,
    resolveIncident,
    trackSLA,
};

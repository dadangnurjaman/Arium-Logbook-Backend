// backend/controllers/SolutionController.js

const solutionService = require('../services/SolutionService');

// Controller untuk membuat solusi baru
const createSolution = async (req, res) => {
    try {
        const solutionData = req.body;
        const solution = await solutionService.createSolution(solutionData);
        res.status(201).json(solution);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk mendapatkan solusi berdasarkan incidentId
const getSolutionByIncident = async (req, res) => {
    try {
        const { incidentId } = req.params;
        const solution = await solutionService.getSolutionByIncident(incidentId);
        if (!solution) {
            return res.status(404).json({ message: 'Solution not found for this incident' });
        }
        res.status(200).json(solution);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk mendapatkan solusi berdasarkan reportId
const getSolutionByReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const solution = await solutionService.getSolutionByReport(reportId);
        if (!solution) {
            return res.status(404).json({ message: 'Solution not found for this report' });
        }
        res.status(200).json(solution);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSolution,
    getSolutionByIncident,
    getSolutionByReport,
};

const Solution = require('../models/SolutionModel');

const createSolution = async (solutionData) => {
    const solution = new Solution({
        description: solutionData.description,
        incidentId: solutionData.incidentId || null,
        reportId: solutionData.reportId || null,
        createdBy: solutionData.createdBy,
        createdAt: new Date(),
    });

    await solution.save();
    return solution;
};

const getSolutionByIncident = async (incidentId) => {
    return await Solution.findOne({ incidentId });
};

const getSolutionByReport = async (reportId) => {
    return await Solution.findOne({ reportId });
};

module.exports = {
    createSolution,
    getSolutionByIncident,
    getSolutionByReport,
};

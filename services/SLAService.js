const SLA = require('../models/SLAModel');
const SLATracking = require('../models/SLATrackingModel');

const createSLA = async (slaData) => {
    const sla = new SLA({
        application: slaData.application,
        impactLevel: slaData.impactLevel,
        responseTime: slaData.responseTime,
        resolutionTime: slaData.resolutionTime,
        createdAt: new Date(),
    });

    await sla.save();
    return sla;
};

const trackSLA = async (incidentId, slaId, status) => {
    const slaTracking = new SLATracking({
        incidentId,
        slaId,
        status,
        timestamp: new Date(),
    });

    await slaTracking.save();
    return slaTracking;
};

module.exports = {
    createSLA,
    trackSLA,
};

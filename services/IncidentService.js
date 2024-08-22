const Incident = require('../models/IncidentModel');
const SLATracking = require('../models/SLATrackingModel');
const Solution = require('../models/SolutionModel');
const User = require('../models/UserModel');
const AuditLog = require('../models/AuditLogModel');

const createIncident = async (incidentData) => {
    const incident = new Incident({
        title: incidentData.title,
        description: incidentData.description,
        impactLevel: incidentData.impactLevel || 'Medium',
        status: 'Open',
        reportedBy: incidentData.reportedBy,
        application: incidentData.application,
        timestamp: new Date(),
        screenshots: incidentData.screenshots || [],
    });

    await incident.save();
    await assignToSupport(incident);

    return incident;
};

const assignToSupport = async (incident) => {
    const supportUser = await User.findOne({ role: 'Support', assignedApp: incident.application });
    if (supportUser) {
        incident.assignedTo = supportUser._id;
        await incident.save();

        // Catat penugasan ini ke audit log
        const auditLog = new AuditLog({
            userId: supportUser._id,
            action: 'assign_to_support',
            changes: { incidentId: incident._id },
            timestamp: new Date(),
        });
        await auditLog.save();
    }
};

const assignToDeveloper = async (incidentId) => {
    const incident = await Incident.findById(incidentId);
    if (!incident) {
        throw new Error('Incident not found');
    }

    const developerUser = await User.findOne({ role: 'Developer', assignedApp: incident.application });
    if (developerUser) {
        incident.assignedTo = developerUser._id;
        await incident.save();

        // Catat penugasan ini ke audit log
        const auditLog = new AuditLog({
            userId: developerUser._id,
            action: 'assign_to_developer',
            changes: { incidentId: incident._id },
            timestamp: new Date(),
        });
        await auditLog.save();
    }
};

const resolveIncident = async (incidentId, solutionDescription) => {
    const incident = await Incident.findById(incidentId);
    if (!incident) {
        throw new Error('Incident not found');
    }

    incident.status = 'Resolved';

    const solution = new Solution({
        description: solutionDescription,
        incidentId: incident._id
    });

    await solution.save();
    incident.solution = solution._id;
    await incident.save();

    await trackSLA(incident);

    return incident;
};

const findSimilarIncident = async (incidentData) => {
    return await Incident.findOne({
        title: incidentData.title,
        description: incidentData.description,
        application: incidentData.application,
        status: 'Resolved'
    });
};

const trackSLA = async (incident) => {
    const slaTracking = new SLATracking({
        incidentId: incident._id,
        status: incident.status,
        timestamp: new Date(),
    });
    await slaTracking.save();
};

module.exports = {
    createIncident,
    assignToSupport,
    assignToDeveloper,
    resolveIncident,
    findSimilarIncident,
    trackSLA,
};

const Report = require('../models/ReportModel');
const Solution = require('../models/SolutionModel');

const submitReport = async (reportData) => {
    const report = new Report({
        userId: reportData.userId,
        title: reportData.title,
        description: reportData.description,
        category: reportData.category,
        application: reportData.application,
        status: 'Submitted',
        createdAt: new Date(),
    });

    await report.save();
    return report;
};

const resolveReport = async (reportId, solutionDescription) => {
    const report = await Report.findById(reportId);
    if (!report) {
        throw new Error('Report not found');
    }

    report.status = 'Resolved';

    const solution = new Solution({
        description: solutionDescription,
        reportId: report._id,
    });

    await solution.save();
    report.solution = solution._id;
    await report.save();

    return report;
};

const findSimilarReport = async (reportData) => {
    return await Report.findOne({
        title: reportData.title,
        description: reportData.description,
        application: reportData.application,
        status: 'Resolved',
    });
};

module.exports = {
    submitReport,
    resolveReport,
    findSimilarReport,
};

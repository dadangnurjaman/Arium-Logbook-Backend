const UserReport = require('../models/UserReportModel');

const submitUserReport = async (reportData) => {
    const userReport = new UserReport({
        userId: reportData.userId,
        title: reportData.title,
        description: reportData.description,
        category: reportData.category,
        application: reportData.application,
        status: 'Submitted',
        createdAt: new Date(),
    });

    await userReport.save();
    return userReport;
};

const updateUserReportStatus = async (reportId, status) => {
    const userReport = await UserReport.findById(reportId);
    if (!userReport) {
        throw new Error('Report not found');
    }

    userReport.status = status;
    await userReport.save();
    return userReport;
};

module.exports = {
    submitUserReport,
    updateUserReportStatus,
};

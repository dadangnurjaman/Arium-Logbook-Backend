const Logbook = require('../models/LogbookModel');

const createLogbookEntry = async (entryData) => {
    const logbookEntry = new Logbook({
        title: entryData.title,
        description: entryData.description,
        createdBy: entryData.createdBy,
        application: entryData.application,
        timestamp: new Date(),
    });

    await logbookEntry.save();
    return logbookEntry;
};

const getLogbookEntries = async () => {
    return await Logbook.find().sort({ timestamp: -1 });
};

const getLogbookEntriesByApp = async (application) => {
    return await Logbook.find({ application }).sort({ timestamp: -1 });
};

module.exports = {
    createLogbookEntry,
    getLogbookEntries,
    getLogbookEntriesByApp,
};

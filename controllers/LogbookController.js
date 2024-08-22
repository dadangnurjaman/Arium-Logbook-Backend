// backend/controllers/LogbookController.js

const logbookService = require('../services/LogbookService');

// Controller untuk membuat entri logbook baru
const createLogbookEntry = async (req, res) => {
    try {
        const entryData = req.body;

        // Membuat entri logbook baru menggunakan service
        const newLogbookEntry = await logbookService.createLogbookEntry(entryData);
        res.status(201).json(newLogbookEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk mendapatkan semua entri logbook
const getLogbookEntries = async (req, res) => {
    try {
        // Mengambil semua entri logbook menggunakan service
        const logbookEntries = await logbookService.getLogbookEntries();
        res.status(200).json(logbookEntries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk mendapatkan entri logbook berdasarkan aplikasi
const getLogbookEntriesByApp = async (req, res) => {
    try {
        const { application } = req.params;

        // Mengambil entri logbook berdasarkan aplikasi menggunakan service
        const logbookEntries = await logbookService.getLogbookEntriesByApp(application);
        res.status(200).json(logbookEntries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createLogbookEntry,
    getLogbookEntries,
    getLogbookEntriesByApp,
};

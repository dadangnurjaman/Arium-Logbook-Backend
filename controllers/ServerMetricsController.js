// backend/controllers/ServerMetricsController.js

const serverMetricService = require('../services/ServerMetricService');

// Controller untuk mendapatkan metrik dari semua server
const fetchAndStoreMetrics = async (req, res) => {
    try {
        await serverMetricService.fetchAndStoreMetrics();
        res.status(200).json({ message: 'Metrics fetched and stored successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk mendapatkan metrik berdasarkan nama server
const getMetricsByServer = async (req, res) => {
    try {
        const { serverName } = req.params;
        const metrics = await serverMetricService.getMetricsByServer(serverName);
        if (metrics.length === 0) {
            return res.status(404).json({ message: 'No metrics found for the specified server' });
        }
        res.status(200).json(metrics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    fetchAndStoreMetrics,
    getMetricsByServer,
};

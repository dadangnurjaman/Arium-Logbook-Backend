const axios = require('axios');
const ServerMetric = require('../models/ServerMetricModel');

const fetchAndStoreMetrics = async () => {
    try {
        const cpuResponse = await axios.get('http://prometheus-server/api/v1/query?query=avg(rate(node_cpu_seconds_total[1m])) by (instance)');
        const memoryResponse = await axios.get('http://prometheus-server/api/v1/query?query=node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes');
        const diskResponse = await axios.get('http://prometheus-server/api/v1/query?query=node_filesystem_free_bytes / node_filesystem_size_bytes');

        const metrics = cpuResponse.data.data.result.map((result, index) => {
            return {
                serverName: result.metric.instance,
                cpuUsage: parseFloat(result.value[1]) * 100,
                memoryUsage: parseFloat(memoryResponse.data.data.result[index].value[1]) * 100,
                diskUsage: parseFloat(diskResponse.data.data.result[index].value[1]) * 100,
            };
        });

        for (const metric of metrics) {
            await new ServerMetric(metric).save();
        }
    } catch (error) {
        console.error('Error fetching or storing metrics:', error);
    }
};

const getMetricsByServer = async (serverName) => {
    return await ServerMetric.find({ serverName }).sort({ timestamp: -1 });
};

module.exports = {
    fetchAndStoreMetrics,
    getMetricsByServer,
};

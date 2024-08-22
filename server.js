const http = require('http');
const app = require('./app');
const { initSocket } = require('./services/SocketService');
const logger = require('./config/logger');

console.log("Starting server...");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

console.log("Before creating server...");

// Initialize Socket.io
initSocket(server);

server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
});

server.on('error', (error) => {
    console.error('Server error:', error); // Catch and log server errors
    if (error.syscall !== 'listen') {
        throw error;
    }
    
    const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
    
    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`);
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

console.log("After creating server...");

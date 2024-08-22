// services/SocketService.js

const socketIO = require('socket.io');

let io;

function initSocket(server) {
    io = socketIO(server);
    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}

function sendRealTimeNotification(userId, message) {
    if (io) {
        io.to(userId).emit('notification', message);
    }
}

module.exports = {
    initSocket,
    sendRealTimeNotification,
};

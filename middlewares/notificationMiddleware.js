// middlewares/notificationMiddleware.js

const NotificationService = require('../services/NotificationService');

const notificationMiddleware = async (req, res, next) => {
    try {
        const { user } = req;
        if (user) {
            await NotificationService.notifyUser(user, 'You have a new notification.');
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = notificationMiddleware;

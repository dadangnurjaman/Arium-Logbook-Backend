// backend/routes/authRoutes.js

const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/AuthController');
const router = express.Router();

router.post(
    '/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    ],
    authController.register
);

router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    authController.login
);

router.post('/logout', authController.logout);

router.get('/user', authController.getUserFromToken);

router.get('/user-role', authController.getUserRole);

router.post('/refresh-token', authController.refreshToken);

module.exports = router;

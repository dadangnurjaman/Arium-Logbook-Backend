// backend/controllers/AuthController.js

const authService = require('../services/AuthService');
const { validationResult } = require('express-validator');
const { generateAccessToken } = require('../utils/tokenUtils');

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken(user._id);
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};

// Controller untuk registrasi pengguna baru
const register = async (req, res) => {
    // Validasi input dari request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password, role, assignedApp } = req.body;
        const { accessToken, refreshToken, user } = await authService.registerUser({
            username,
            email,
            password,
            role,
            assignedApp,
        });

        res.status(201).json({ accessToken, refreshToken, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk login pengguna
const login = async (req, res) => {
    // Validasi input dari request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await authService.loginUser(email, password);

        res.status(200).json({ accessToken, refreshToken, user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

// Controller untuk logout pengguna
const logout = async (req, res) => {
    try {
        const { userId } = req.body; // Atau ambil dari token jika sudah ada di req.user
        await authService.logoutUser(userId);

        // Setelah berhasil logout, kirimkan respons sukses
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk mendapatkan user dari token
const getUserFromToken = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const user = await authService.getUserFromToken(token);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserRole = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const user = await authService.getUserFromToken(token);

        res.status(200).json({ role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
    logout,
    getUserFromToken,
    refreshToken,
    getUserRole,
};

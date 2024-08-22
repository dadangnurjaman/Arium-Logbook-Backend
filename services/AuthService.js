const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/tokenUtils');

const registerUser = async (userData) => {
    const { username, email, password, role, assignedApp } = userData;

    try {
        // Cek apakah user sudah ada
        let user = await User.findOne({ email });
        if (user) {
            console.log('User already exists');
            throw new Error('User already exists');
        }

        // Buat user baru
        console.log('Registering user with data:', userData);
        user = new User({
            username,
            email,
            password, // Password akan di-hash oleh middleware di User model
            role,
            assignedApp: role === 'Developer' ? assignedApp : undefined, // Tambahkan assignedApp hanya jika role adalah Developer
        });

        await user.save();

        // Generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        return { accessToken, refreshToken, user };
    } catch (error) {
        console.error('Error during registration:', error.message);
        throw error;
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        return { accessToken, refreshToken, user };
    } catch (error) {
        throw error;
    }
};

const logoutUser = async (userId) => {
    // Implementasikan logika logout jika diperlukan, seperti blacklist token atau update database
    return true;
};

const getUserFromToken = async (token) => {
    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserFromToken,
};

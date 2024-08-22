// backend/controllers/UserController.js

const userService = require('../services/UserService');

// Controller untuk mendapatkan data pengguna berdasarkan ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk memperbarui profil pengguna
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updateData = req.body;
        const updatedUser = await userService.updateUserProfile(userId, updateData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk memperbarui role pengguna
const updateUserRole = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { role } = req.body;
        const updatedUser = await userService.updateUserRole(userId, role);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk mendapatkan pengguna berdasarkan email
const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller untuk menghapus pengguna
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await userService.deleteUser(userId);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUserById,
    updateUserProfile,
    updateUserRole,
    getUserByEmail,
    deleteUser,
};

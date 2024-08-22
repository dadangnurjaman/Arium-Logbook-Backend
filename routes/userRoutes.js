// backend/routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rute untuk mendapatkan pengguna berdasarkan ID
router.get('/:userId', authMiddleware, userController.getUserById);

// Rute untuk memperbarui profil pengguna
router.put('/:userId', authMiddleware, userController.updateUserProfile);

// Rute untuk memperbarui role pengguna
router.put('/:userId/role', authMiddleware, userController.updateUserRole);

// Rute untuk mendapatkan pengguna berdasarkan email
router.get('/email/:email', authMiddleware, userController.getUserByEmail);

// Rute untuk menghapus pengguna
router.delete('/:userId', authMiddleware, userController.deleteUser);

module.exports = router;

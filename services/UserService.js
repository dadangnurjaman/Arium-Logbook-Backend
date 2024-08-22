const User = require('../models/UserModel');
const AuditLog = require('../models/AuditLogModel'); // Untuk mencatat perubahan data
const bcrypt = require('bcryptjs');

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password'); // Jangan sertakan password
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

const updateUserProfile = async (userId, updateData) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Update data pengguna
        if (updateData.username) user.username = updateData.username;
        if (updateData.email) user.email = updateData.email;
        if (updateData.password) user.password = await bcrypt.hash(updateData.password, 10);
        if (updateData.notificationPreferences) {
            user.notificationPreferences = {
                ...user.notificationPreferences,
                ...updateData.notificationPreferences,
            };
        }

        await user.save();

        // Catat perubahan ke audit log
        const auditLog = new AuditLog({
            userId: user._id,
            action: 'update_profile',
            changes: updateData,
            timestamp: new Date(),
        });
        await auditLog.save();

        return user;
    } catch (error) {
        throw error;
    }
};

const updateUserRole = async (userId, newRole) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.role = newRole;
        await user.save();

        // Catat perubahan role ke audit log
        const auditLog = new AuditLog({
            userId: user._id,
            action: 'update_role',
            changes: { role: newRole },
            timestamp: new Date(),
        });
        await auditLog.save();

        return user;
    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Catat penghapusan ke audit log
        const auditLog = new AuditLog({
            userId: user._id,
            action: 'delete_user',
            timestamp: new Date(),
        });
        await auditLog.save();

        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getUserById,
    updateUserProfile,
    updateUserRole,
    getUserByEmail,
    deleteUser,
};

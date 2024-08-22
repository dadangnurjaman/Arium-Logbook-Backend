const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Support', 'Developer', 'User'], required: true }, // Peran pengguna
    notificationPreferences: {
        email: { type: Boolean, default: true },
        realTime: { type: Boolean, default: true }
    },
    assignedApp: { type: String, enum: ['Core Banking System', 'Banking Integration Service', 'Reporting Services'], required: function() { return this.role === 'Developer'; } }, // Aplikasi yang di-assign untuk Developer
    createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', UserSchema);

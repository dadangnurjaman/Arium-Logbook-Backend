require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const Notification = require('../models/NotificationModel'); // Pastikan path ini benar
const User = require('../models/UserModel'); // Pastikan path ini benar

// Koneksi ke database MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

// Fungsi untuk seed notifikasi
const seedNotifications = async () => {
    try {
        // Dapatkan user yang ingin Anda tambahkan notifikasinya
        const user = await User.findOne(); // Mengambil user pertama yang ditemukan

        if (!user) {
            console.error('No user found to associate notifications with');
            process.exit(1);
        }

        const notifications = [
            {
                userId: user._id,
                title: 'Information 1',
                message: 'This is an informational message.',
                type: 'info',
                channel: 'web',
            },
            {
                userId: user._id,
                title: 'Information 2',
                message: 'Another informational message.',
                type: 'info',
                channel: 'web',
            },
            {
                userId: user._id,
                title: 'Warning 1',
                message: 'This is a warning message.',
                type: 'warning',
                channel: 'web',
            },
            {
                userId: user._id,
                title: 'Error',
                message: 'This is an error message.',
                type: 'error',
                channel: 'web',
            },
            {
                userId: user._id,
                title: 'Success',
                message: 'This is a success message.',
                type: 'success',
                channel: 'web',
            },
        ];

        // Hapus semua notifikasi yang ada sebelum menambahkan yang baru (opsional)
        await Notification.deleteMany();

        // Tambahkan notifikasi ke database
        await Notification.insertMany(notifications);

        console.log('Notifications seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding notifications:', error.message);
        process.exit(1);
    }
};

// Jalankan fungsi koneksi dan seed
connectDB().then(seedNotifications);

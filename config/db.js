const mongoose = require('mongoose');

mongoose.set('strictQuery', true); // Bisa diubah ke false jika Anda lebih suka.

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB with URI:", process.env.DB_URI);
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const { initSocket } = require('./services/SocketService');

dotenv.config();
console.log('Environment Variables Loaded:', process.env.DB_URI);

// Import routes
const auditLogRoutes = require('./routes/auditLogRoutes');
const authRoutes = require('./routes/authRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const logbookRoutes = require('./routes/logbookRoutes');
const logRoutes = require('./routes/logRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const reportRoutes = require('./routes/reportRoutes');
const serverMetricsRoutes = require('./routes/serverMetricsRoutes');
const slaRoutes = require('./routes/slaRoutes');
const socketRoutes = require('./routes/socketRoutes');
const solutionRoutes = require('./routes/solutionRoutes');
const userReportRoutes = require('./routes/userReportRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Connect to database
// connectDB();

console.log("Connecting to database...");
connectDB();
console.log("Database connection attempted...");


// Middleware setup
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/audit-logs', auditLogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/logbook', logbookRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/server-metrics', serverMetricsRoutes);
app.use('/api/sla', slaRoutes);
app.use('/api/socket', socketRoutes);
app.use('/api/solutions', solutionRoutes);
app.use('/api/user-reports', userReportRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboards', dashboardRoutes);

// Error handling middleware
app.use(errorHandler); 

module.exports = app;

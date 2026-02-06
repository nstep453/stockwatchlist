/**
 * Stock Watchlist API Server
 * 
 * Entry point for Express.js API server
 * Handles stock data, reports, alerts, and job scheduling
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Import routes
const stockRoutes = require('./routes/stocks');
const reportRoutes = require('./routes/reports');
const alertRoutes = require('./routes/alerts');

// Import services
const { initializeJobScheduler } = require('./services/job-scheduler');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/stocks', stockRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/alerts', alertRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Stock Watchlist API',
    version: '0.1.0',
    endpoints: {
      stocks: '/api/stocks',
      reports: '/api/reports',
      alerts: '/api/alerts',
      health: '/api/health',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Stock Watchlist API running on http://localhost:${PORT}`);
  console.log(`📊 Base URL: http://localhost:${PORT}/api\n`);
  
  // Initialize periodic job scheduler
  initializeJobScheduler();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;

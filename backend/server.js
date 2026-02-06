/**
 * Stock Watchlist API Server
 * 
 * Main Express server providing REST endpoints for:
 * - Watchlist management
 * - Report queue operations
 * - Alert settings
 * 
 * INTEGRATION POINTS:
 * - Replace mock data functions with real API calls in services/
 * - Add authentication middleware when needed
 * - Connect to real database instead of mock JSON
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const watchlistRoutes = require('./routes/watchlist');
const reportRoutes = require('./routes/reports');
const alertRoutes = require('./routes/alerts');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/alerts', alertRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path
  });
});

app.listen(PORT, () => {
  console.log(`✓ Stock Watchlist API running on http://localhost:${PORT}`);
  console.log(`✓ Use GET /api/health to verify server status`);
  console.log('\nEndpoints:');
  console.log('  GET  /api/watchlist');
  console.log('  POST /api/watchlist');
  console.log('  GET  /api/reports/queue');
  console.log('  POST /api/reports/generate');
  console.log('  GET  /api/alerts');
  console.log('  POST /api/alerts');
});

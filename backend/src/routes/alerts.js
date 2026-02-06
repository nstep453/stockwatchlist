/**
 * Alert Routes
 * 
 * Endpoints for managing pattern-detection alerts
 */

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const mockData = require('../../data/mock-data');

const router = express.Router();

/**
 * GET /api/alerts/patterns
 * Returns all available alert patterns
 */
router.get('/patterns', (req, res) => {
  try {
    const patterns = mockData.getAlertPatterns();
    
    res.json({
      success: true,
      data: patterns,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/alerts
 * Returns all active alerts
 */
router.get('/', (req, res) => {
  try {
    const alerts = mockData.getActiveAlerts();
    
    res.json({
      success: true,
      data: alerts,
      total: alerts.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/alerts
 * Create a new alert
 * 
 * Request body:
 *   {
 *     symbol: "AAPL",
 *     pattern: "EARNINGS",  // Must match pattern ID from /patterns
 *     threshold: 5,         // Alert triggers when condition meets this value
 *     enabled: true
 *   }
 * 
 * FUTURE: Add validation for pattern-specific threshold ranges
 * FUTURE: Store in database with user association
 * FUTURE: Add webhook/email notification on trigger
 */
router.post('/', (req, res) => {
  try {
    const { symbol, pattern, threshold = 5, enabled = true } = req.body;
    
    // Validate input
    if (!symbol || !pattern) {
      return res.status(400).json({
        success: false,
        error: 'symbol and pattern are required',
      });
    }
    
    // Validate symbol exists
    const stock = mockData.getStockBySymbol(symbol.toUpperCase());
    if (!stock) {
      return res.status(404).json({
        success: false,
        error: `Stock ${symbol} not found`,
      });
    }
    
    // Validate pattern exists
    const patterns = mockData.getAlertPatterns();
    if (!patterns[pattern]) {
      return res.status(400).json({
        success: false,
        error: `Pattern ${pattern} not found. Available: ${Object.keys(patterns).join(', ')}`,
      });
    }
    
    // Create alert
    const alert = {
      id: `alert-${uuidv4().slice(0, 8)}`,
      symbol: symbol.toUpperCase(),
      pattern,
      enabled,
      threshold,
      createdAt: new Date().toISOString(),
    };
    
    mockData.addAlert(alert);
    
    res.status(201).json({
      success: true,
      message: 'Alert created successfully',
      data: alert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * PUT /api/alerts/:id
 * Update an alert
 */
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const alert = mockData.updateAlert(id, updates);
    
    if (!alert) {
      return res.status(404).json({
        success: false,
        error: `Alert ${id} not found`,
      });
    }
    
    res.json({
      success: true,
      message: 'Alert updated successfully',
      data: alert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * DELETE /api/alerts/:id
 * Remove an alert
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const alert = mockData.getActiveAlerts().find(a => a.id === id);
    
    if (!alert) {
      return res.status(404).json({
        success: false,
        error: `Alert ${id} not found`,
      });
    }
    
    mockData.removeAlert(id);
    
    res.json({
      success: true,
      message: 'Alert deleted successfully',
      data: { id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;

/**
 * Alerts API Routes
 * 
 * Endpoints for managing pattern-detection alerts:
 * - Price targets
 * - Momentum shifts (RSI, MACD)
 * - Reversal signals (patterns, support/resistance)
 * - Earnings impact alerts
 */

const express = require('express');
const router = express.Router();
const mockData = require('../models/mockData');

/**
 * GET /api/alerts
 * Fetch all alert settings
 */
router.get('/', (req, res) => {
  try {
    const alerts = mockData.getAlertSettings();
    
    // Optional: filter by symbol if query param provided
    const { symbol } = req.query;
    const filtered = symbol 
      ? alerts.filter(a => a.symbol === symbol.toUpperCase())
      : alerts;

    res.json({
      success: true,
      data: filtered,
      count: filtered.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/alerts
 * Create a new alert setting
 * 
 * Body: {
 *   symbol: string,
 *   type: 'price_target' | 'momentum_shift' | 'reversal_signal' | 'earnings_impact',
 *   parameters: object (varies by type),
 *   description: string
 * }
 * 
 * PARAMETER EXAMPLES:
 * 
 * Price Target:
 * {
 *   "type": "price_target",
 *   "parameters": { "upperBound": 200, "lowerBound": 160 },
 *   "description": "Alert at resistance/support"
 * }
 * 
 * Momentum Shift (RSI/MACD):
 * {
 *   "type": "momentum_shift",
 *   "parameters": { "rsiThreshold": 70, "macdCrossover": true },
 *   "description": "Alert on overbought or divergence"
 * }
 * 
 * Reversal Signal:
 * {
 *   "type": "reversal_signal",
 *   "parameters": { "hammerPatternDetection": true, "supportResistanceBreak": true },
 *   "description": "Alert on pattern reversals"
 * }
 * 
 * Earnings Impact:
 * {
 *   "type": "earnings_impact",
 *   "parameters": { "daysBeforeEarnings": 3, "volatilityThreshold": 0.05 },
 *   "description": "Alert before earnings if volatile"
 * }
 * 
 * INTEGRATION NOTES:
 * - Store these in database
 * - Implement actual pattern detection in background job (jobs/scheduler.js)
 * - Use technical analysis library like talib or custom implementation
 * - Hook into real-time data stream (WebSocket) to trigger alerts
 */
router.post('/', (req, res) => {
  try {
    const { symbol, type, parameters, description } = req.body;

    // Validation
    if (!symbol || !type || !parameters) {
      return res.status(400).json({
        error: 'symbol, type, and parameters are required'
      });
    }

    const validTypes = ['price_target', 'momentum_shift', 'reversal_signal', 'earnings_impact'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: `type must be one of: ${validTypes.join(', ')}`
      });
    }

    // Check stock exists
    const watchlist = mockData.getWatchlist();
    const stock = watchlist.find(s => s.symbol === symbol.toUpperCase());
    if (!stock) {
      return res.status(404).json({
        error: `Stock ${symbol} not found in watchlist`
      });
    }

    const alert = mockData.createAlertSetting(
      symbol.toUpperCase(),
      type,
      parameters,
      description || `${type} alert for ${symbol}`
    );

    res.status(201).json({
      success: true,
      message: 'Alert created successfully',
      data: alert
    });

    console.log(`🚨 Alert created: ${symbol} - ${type}`);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/alerts/:alertId
 * Update an alert setting
 * 
 * Body: { enabled?: boolean, parameters?: object, description?: string }
 */
router.patch('/:alertId', (req, res) => {
  try {
    const { enabled, parameters, description } = req.body;
    const updates = {};

    if (enabled !== undefined) updates.enabled = enabled;
    if (parameters !== undefined) updates.parameters = parameters;
    if (description !== undefined) updates.description = description;

    const alert = mockData.updateAlertSetting(req.params.alertId, updates);

    if (!alert) {
      return res.status(404).json({
        error: 'Alert not found'
      });
    }

    res.json({
      success: true,
      message: 'Alert updated',
      data: alert
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/alerts/types
 * Get available alert types and their parameter schemas
 */
router.get('/types', (req, res) => {
  res.json({
    success: true,
    data: {
      price_target: {
        label: 'Price Target',
        description: 'Alert when stock crosses specific price levels',
        parameters: {
          upperBound: 'number',
          lowerBound: 'number'
        }
      },
      momentum_shift: {
        label: 'Momentum Shift',
        description: 'Alert on RSI, MACD, or other momentum indicators',
        parameters: {
          rsiThreshold: 'number (30-70)',
          macdCrossover: 'boolean'
        }
      },
      reversal_signal: {
        label: 'Reversal Signal',
        description: 'Alert on chart patterns and key support/resistance breaks',
        parameters: {
          hammerPatternDetection: 'boolean',
          supportResistanceBreak: 'boolean'
        }
      },
      earnings_impact: {
        label: 'Earnings Impact',
        description: 'Alert around earnings announcements with volatility filters',
        parameters: {
          daysBeforeEarnings: 'number',
          volatilityThreshold: 'number (0-1)'
        }
      }
    }
  });
});

module.exports = router;

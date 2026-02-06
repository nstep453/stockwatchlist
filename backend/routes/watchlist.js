/**
 * Watchlist API Routes
 * 
 * Endpoints for managing the user's stock watchlist
 */

const express = require('express');
const router = express.Router();
const mockData = require('../models/mockData');

/**
 * GET /api/watchlist
 * Fetch all stocks in the watchlist
 */
router.get('/', (req, res) => {
  try {
    const watchlist = mockData.getWatchlist();
    res.json({
      success: true,
      data: watchlist,
      count: watchlist.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/watchlist
 * Add a stock to the watchlist
 * 
 * Body: { symbol: string, name: string }
 */
router.post('/', (req, res) => {
  try {
    const { symbol, name } = req.body;
    
    if (!symbol || !name) {
      return res.status(400).json({
        error: 'symbol and name are required'
      });
    }

    const newStock = mockData.addToWatchlist(symbol, name);
    res.status(201).json({
      success: true,
      data: newStock
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/watchlist/:symbol
 * Fetch a specific stock from the watchlist
 */
router.get('/:symbol', (req, res) => {
  try {
    const watchlist = mockData.getWatchlist();
    const stock = watchlist.find(s => s.symbol === req.params.symbol.toUpperCase());
    
    if (!stock) {
      return res.status(404).json({
        error: `Stock ${req.params.symbol} not found in watchlist`
      });
    }

    res.json({
      success: true,
      data: stock
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

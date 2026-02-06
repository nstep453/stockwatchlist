/**
 * Stock Routes
 * 
 * Endpoints for retrieving stock data and watchlist
 */

const express = require('express');
const mockData = require('../../data/mock-data');

const router = express.Router();

/**
 * GET /api/stocks
 * Returns all stocks in the watchlist
 * 
 * FUTURE: Add pagination, filtering, sorting
 * FUTURE: Replace mock data with real API calls with 15-min delays
 */
router.get('/', (req, res) => {
  try {
    const stocks = Object.values(mockData.getWatchlistStocks());
    
    // Simulate API latency
    setTimeout(() => {
      res.json({
        success: true,
        data: stocks,
        timestamp: new Date().toISOString(),
      });
    }, 100);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/stocks/:symbol
 * Returns detailed data for a single stock
 * 
 * FUTURE: Include historical data, technical indicators, news
 */
router.get('/:symbol', (req, res) => {
  try {
    const { symbol } = req.params;
    const stock = mockData.getStockBySymbol(symbol.toUpperCase());
    
    if (!stock) {
      return res.status(404).json({
        success: false,
        error: `Stock ${symbol} not found`,
      });
    }
    
    // Simulate API latency
    setTimeout(() => {
      res.json({
        success: true,
        data: stock,
        timestamp: new Date().toISOString(),
      });
    }, 100);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/stocks/:symbol/quote
 * Force a quote refresh (simulates real-time quote)
 * 
 * FUTURE: Integrate with live data provider
 */
router.post('/:symbol/quote', (req, res) => {
  try {
    const { symbol } = req.params;
    const stock = mockData.getStockBySymbol(symbol.toUpperCase());
    
    if (!stock) {
      return res.status(404).json({
        success: false,
        error: `Stock ${symbol} not found`,
      });
    }
    
    // Simulate quote refresh with slight variation
    const variance = 0.02;
    const change = (Math.random() - 0.5) * variance * stock.price;
    stock.price = parseFloat((stock.price + change).toFixed(2));
    stock.percentChange = parseFloat(((change / stock.price) * 100).toFixed(2));
    stock.timestamp = new Date().toISOString();
    
    res.json({
      success: true,
      data: stock,
      refreshedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;

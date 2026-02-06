/**
 * Reports API Routes
 * 
 * Endpoints for:
 * - Getting the report queue
 * - Generating new reports
 * - Retrieving completed reports
 */

const express = require('express');
const router = express.Router();
const mockData = require('../models/mockData');

/**
 * GET /api/reports/queue
 * Fetch all reports (pending and completed)
 */
router.get('/queue', (req, res) => {
  try {
    const queue = mockData.getReportQueue();
    const completed = mockData.getCompletedReports();
    
    res.json({
      success: true,
      data: {
        pending: queue.filter(r => r.status !== 'completed'),
        completed: queue.filter(r => r.status === 'completed').concat(completed),
        total: queue.length + completed.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/reports/completed
 * Fetch only completed reports
 */
router.get('/completed', (req, res) => {
  try {
    const completed = mockData.getCompletedReports();
    res.json({
      success: true,
      data: completed,
      count: completed.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/reports/generate
 * Request a new AI-generated report for a stock
 * 
 * Body: {
 *   symbol: string,
 *   type: 'technical_analysis' | 'fundamental_analysis' | 'earnings_impact' | 'custom'
 * }
 * 
 * INTEGRATION NOTES:
 * - In production, this would trigger a background job
 * - Job could use: Bull queue, Celery, or serverless function
 * - AI analysis could come from: OpenAI, Anthropic, Hugging Face, custom ML model
 * - Reports should be stored in database and cached
 */
router.post('/generate', (req, res) => {
  try {
    const { symbol, type } = req.body;

    if (!symbol) {
      return res.status(400).json({
        error: 'symbol is required'
      });
    }

    if (!type) {
      return res.status(400).json({
        error: 'type is required (technical_analysis, fundamental_analysis, earnings_impact, or custom)'
      });
    }

    // Check if stock is in watchlist
    const watchlist = mockData.getWatchlist();
    const stock = watchlist.find(s => s.symbol === symbol.toUpperCase());
    
    if (!stock) {
      return res.status(404).json({
        error: `Stock ${symbol} not found in watchlist`
      });
    }

    // Add report to queue
    const report = mockData.addReportToQueue(symbol.toUpperCase(), type);

    res.status(202).json({
      success: true,
      message: 'Report generation queued',
      data: report
    });

    // INTEGRATION: Trigger actual background job here
    // Example: await jobQueue.enqueue('generate_report', { symbol, type, reportId: report.id })
    console.log(`📊 Report queued: ${symbol} - ${type}`);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/reports/:reportId
 * Fetch a specific report by ID
 */
router.get('/:reportId', (req, res) => {
  try {
    const queue = mockData.getReportQueue();
    const completed = mockData.getCompletedReports();
    const allReports = [...queue, ...completed];
    
    const report = allReports.find(r => r.id === req.params.reportId);
    
    if (!report) {
      return res.status(404).json({
        error: 'Report not found'
      });
    }

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

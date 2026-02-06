/**
 * MOCK DATA - Stock Watchlist Application
 * 
 * This file contains all mock data for the MVP.
 * 
 * INTEGRATION NOTES:
 * - Replace these functions with real API calls to Alpha Vantage, IEX Cloud, etc.
 * - Add database persistence when scaling
 * - Real API calls should include error handling and rate-limiting
 */

const { v4: uuidv4 } = require('uuid');

/**
 * MOCK WATCHLIST DATA
 * 3 starter stocks with simulated real-time data
 */
const mockWatchlist = [
  {
    id: 'stock-1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 182.52,
    priceChange: 2.45,
    priceChangePercent: 1.36,
    volume: 52_234_100,
    marketCap: '2.85T',
    pe: 28.5,
    lastUpdate: new Date(Date.now() - 2 * 60000).toISOString(), // 2 min ago
    alerts: []
  },
  {
    id: 'stock-2',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 139.28,
    priceChange: -1.82,
    priceChangePercent: -1.29,
    volume: 28_456_700,
    marketCap: '1.42T',
    pe: 24.2,
    lastUpdate: new Date(Date.now() - 3 * 60000).toISOString(),
    alerts: []
  },
  {
    id: 'stock-3',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.75,
    priceChange: 5.12,
    priceChangePercent: 2.10,
    volume: 168_923_400,
    marketCap: '785B',
    pe: 68.3,
    lastUpdate: new Date(Date.now() - 5 * 60000).toISOString(),
    alerts: []
  }
];

/**
 * MOCK REPORT QUEUE
 * Simulates pending and completed AI analysis reports
 */
const mockReportQueue = [
  {
    id: uuidv4(),
    symbol: 'AAPL',
    status: 'in_progress',
    requestedAt: new Date(Date.now() - 8 * 60000).toISOString(),
    estimatedCompletion: new Date(Date.now() + 2 * 60000).toISOString(),
    type: 'technical_analysis',
    progress: 65
  },
  {
    id: uuidv4(),
    symbol: 'TSLA',
    status: 'queued',
    requestedAt: new Date(Date.now() - 2 * 60000).toISOString(),
    estimatedCompletion: new Date(Date.now() + 5 * 60000).toISOString(),
    type: 'fundamental_analysis',
    progress: 0
  },
  {
    id: uuidv4(),
    symbol: 'AAPL',
    status: 'completed',
    requestedAt: new Date(Date.now() - 60 * 60000).toISOString(),
    completedAt: new Date(Date.now() - 50 * 60000).toISOString(),
    type: 'earnings_impact',
    progress: 100,
    report: {
      title: 'AAPL Earnings Impact Analysis',
      summary: 'Strong earnings beat with revenue growth of 15% YoY. iPhone sales remain stable despite market saturation.',
      keyFindings: [
        'Revenue exceeded expectations by 8%',
        'Services segment showing 12% growth',
        'Operating margin improved to 28.8%'
      ],
      sentiment: 'bullish',
      confidence: 0.87
    }
  }
];

/**
 * MOCK ALERT SETTINGS
 * Pattern detection configurations
 */
const mockAlertSettings = [
  {
    id: uuidv4(),
    symbol: 'AAPL',
    type: 'price_target',
    enabled: true,
    parameters: {
      upperBound: 200,
      lowerBound: 160
    },
    description: 'Alert when AAPL crosses $200 or $160'
  },
  {
    id: uuidv4(),
    symbol: 'TSLA',
    type: 'momentum_shift',
    enabled: true,
    parameters: {
      rsiThreshold: 70,
      macdCrossover: true
    },
    description: 'Alert on RSI > 70 or MACD crossover'
  },
  {
    id: uuidv4(),
    symbol: 'GOOGL',
    type: 'reversal_signal',
    enabled: false,
    parameters: {
      hammerPatternDetection: true,
      supportResistanceBreak: true
    },
    description: 'Alert on hammer patterns or support/resistance breaks'
  },
  {
    id: uuidv4(),
    symbol: 'AAPL',
    type: 'earnings_impact',
    enabled: true,
    parameters: {
      daysBeforeEarnings: 3,
      volatilityThreshold: 0.05
    },
    description: 'Alert 3 days before earnings if volatility > 5%'
  }
];

/**
 * COMPLETED REPORTS (Archive)
 * Historical reports for reference
 */
const mockCompletedReports = [
  {
    id: uuidv4(),
    symbol: 'GOOGL',
    type: 'technical_analysis',
    completedAt: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
    title: 'GOOGL Technical Analysis - Daily',
    summary: 'Price consolidating near 50-day moving average. Breakout likely within 5 trading days.',
    sentiment: 'neutral',
    confidence: 0.72
  },
  {
    id: uuidv4(),
    symbol: 'TSLA',
    type: 'fundamental_analysis',
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
    title: 'TSLA Fundamental Analysis',
    summary: 'Solid fundamentals with strong free cash flow. Valuation appears fair at current levels.',
    sentiment: 'bullish',
    confidence: 0.78
  }
];

/**
 * DATA ACCESS FUNCTIONS
 * These are the interfaces external code should use
 */

function getWatchlist() {
  // INTEGRATION: Replace with real API call
  // const response = await fetch('https://api.example.com/stocks/watchlist')
  return JSON.parse(JSON.stringify(mockWatchlist)); // Deep copy to prevent mutations
}

function addToWatchlist(symbol, name) {
  // INTEGRATION: Make POST request to API
  const newStock = {
    id: `stock-${Date.now()}`,
    symbol,
    name,
    price: Math.random() * 300 + 50,
    priceChange: (Math.random() - 0.5) * 10,
    priceChangePercent: (Math.random() - 0.5) * 5,
    volume: Math.floor(Math.random() * 100_000_000),
    marketCap: Math.floor(Math.random() * 2000) + 'B',
    pe: Math.random() * 40 + 10,
    lastUpdate: new Date().toISOString(),
    alerts: []
  };
  mockWatchlist.push(newStock);
  return newStock;
}

function getReportQueue() {
  // INTEGRATION: Query database or real API
  return JSON.parse(JSON.stringify(mockReportQueue));
}

function addReportToQueue(symbol, type) {
  // INTEGRATION: POST to report generation service
  const newReport = {
    id: uuidv4(),
    symbol,
    status: 'queued',
    requestedAt: new Date().toISOString(),
    estimatedCompletion: new Date(Date.now() + 10 * 60000).toISOString(),
    type,
    progress: 0
  };
  mockReportQueue.push(newReport);
  return newReport;
}

function getCompletedReports() {
  // INTEGRATION: Query database
  return JSON.parse(JSON.stringify(mockCompletedReports));
}

function getAlertSettings() {
  // INTEGRATION: Fetch from database
  return JSON.parse(JSON.stringify(mockAlertSettings));
}

function updateAlertSetting(alertId, updates) {
  // INTEGRATION: UPDATE in database
  const alert = mockAlertSettings.find(a => a.id === alertId);
  if (alert) {
    Object.assign(alert, updates);
  }
  return alert;
}

function createAlertSetting(symbol, type, parameters, description) {
  // INTEGRATION: INSERT into database
  const newAlert = {
    id: uuidv4(),
    symbol,
    type,
    enabled: true,
    parameters,
    description
  };
  mockAlertSettings.push(newAlert);
  return newAlert;
}

module.exports = {
  getWatchlist,
  addToWatchlist,
  getReportQueue,
  addReportToQueue,
  getCompletedReports,
  getAlertSettings,
  updateAlertSetting,
  createAlertSetting
};

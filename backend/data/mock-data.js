/**
 * Mock Data for Stock Watchlist
 * 
 * This file contains realistic mock data for development/demo purposes.
 * FUTURE: Replace with real API integrations (Alpha Vantage, IEX Cloud, etc.)
 * with 15-minute delays as per SEC requirements.
 */

const generateStockQuote = (symbol, basePrice, variance = 0.02) => {
  const change = (Math.random() - 0.5) * variance * basePrice;
  const open = basePrice + change * (Math.random() - 0.5);
  const close = basePrice + change;
  
  return {
    symbol,
    price: parseFloat((basePrice + change).toFixed(2)),
    open: parseFloat(open.toFixed(2)),
    high: parseFloat(Math.max(open, close, basePrice) + Math.random() * 2).toFixed(2),
    low: parseFloat(Math.min(open, close, basePrice) - Math.random() * 2).toFixed(2),
    volume: Math.floor(Math.random() * 50000000 + 20000000),
    percentChange: parseFloat(((change / basePrice) * 100).toFixed(2)),
    timestamp: new Date().toISOString(),
  };
};

// Starting watchlist stocks
const STARTER_STOCKS = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    marketCap: '2.8T',
    pe: 28.5,
    dividend: 0.92,
    ...generateStockQuote('AAPL', 189.50, 0.03),
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    marketCap: '2.4T',
    pe: 32.1,
    dividend: 0.68,
    ...generateStockQuote('MSFT', 375.00, 0.025),
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    sector: 'Automotive/Energy',
    marketCap: '900B',
    pe: 65.3,
    dividend: 0,
    ...generateStockQuote('TSLA', 242.50, 0.05),
  },
};

// Mock alerts configuration
const ALERT_PATTERNS = {
  EARNINGS: {
    id: 'earnings',
    name: 'Earnings Impact',
    description: 'Alert when stock price changes >5% around earnings dates',
    category: 'fundamental',
  },
  REVERSAL: {
    id: 'reversal',
    name: 'Reversal Signal',
    description: 'Alert on potential trend reversal (5-day to 20-day crossover)',
    category: 'technical',
  },
  MOMENTUM: {
    id: 'momentum',
    name: 'Momentum Shift',
    description: 'Alert when RSI crosses overbought (>70) or oversold (<30)',
    category: 'momentum',
  },
  VOLUME_SPIKE: {
    id: 'volume_spike',
    name: 'Volume Spike',
    description: 'Alert when trading volume exceeds 2x average',
    category: 'volume',
  },
  SUPPORT_RESISTANCE: {
    id: 'support_resistance',
    name: 'Support/Resistance',
    description: 'Alert when price breaks key support or resistance levels',
    category: 'technical',
  },
};

// Sample active alerts (one per starter stock)
const ACTIVE_ALERTS = [
  {
    id: 'alert-1',
    symbol: 'AAPL',
    pattern: 'EARNINGS',
    enabled: true,
    threshold: 5,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    nextEarningsDate: '2024-01-26',
  },
  {
    id: 'alert-2',
    symbol: 'MSFT',
    pattern: 'MOMENTUM',
    enabled: true,
    threshold: 70,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'alert-3',
    symbol: 'TSLA',
    pattern: 'REVERSAL',
    enabled: true,
    threshold: 12,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Sample report queue
const REPORT_QUEUE = [
  {
    id: 'report-1',
    symbol: 'AAPL',
    status: 'completed',
    requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    report: {
      title: 'Apple Inc. - Technical & Fundamental Analysis',
      summary: 'AAPL shows strong uptrend with support at $185. Recent earnings beat expectations with 12% YoY revenue growth. AI integration announcements driving sentiment. Watch for potential consolidation before next breakout.',
      sections: [
        {
          title: 'Technical Analysis',
          points: [
            'Price above 20-day & 50-day moving averages (bullish)',
            '5-day RSI at 62 - not overbought, room to run',
            'Support at $185, resistance at $195',
          ],
        },
        {
          title: 'Fundamental',
          points: [
            'P/E ratio 28.5 - slightly above tech average',
            'Services revenue growing 15% YoY',
            'Apple Intelligence features launching Q1 2024',
          ],
        },
        {
          title: 'Catalysts',
          points: [
            'Earnings: Jan 26 (expected beat)',
            'AI features rollout through spring',
            'iPhone 16 Pro launch window',
          ],
        },
      ],
      confidence: 'high',
      recommendation: 'HOLD - Strong fundamentals, good entry points on dips below $185',
    },
  },
  {
    id: 'report-2',
    symbol: 'MSFT',
    status: 'processing',
    requestedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    completedAt: null,
    report: null,
    progress: 45,
  },
];

// In-memory store (will be replaced with database)
let reportQueue = JSON.parse(JSON.stringify(REPORT_QUEUE));
let activeAlerts = JSON.parse(JSON.stringify(ACTIVE_ALERTS));
let watchlistStocks = JSON.parse(JSON.stringify(STARTER_STOCKS));

module.exports = {
  STARTER_STOCKS,
  ALERT_PATTERNS,
  ACTIVE_ALERTS,
  REPORT_QUEUE,
  // Getters
  getWatchlistStocks: () => watchlistStocks,
  getStockBySymbol: (symbol) => watchlistStocks[symbol],
  getAlertPatterns: () => ALERT_PATTERNS,
  getActiveAlerts: () => activeAlerts,
  getReportQueue: () => reportQueue,
  getReportById: (id) => reportQueue.find(r => r.id === id),
  // Setters (for API mutations)
  addAlert: (alert) => {
    activeAlerts.push(alert);
    return alert;
  },
  removeAlert: (alertId) => {
    activeAlerts = activeAlerts.filter(a => a.id !== alertId);
  },
  updateAlert: (alertId, updates) => {
    const alert = activeAlerts.find(a => a.id === alertId);
    if (alert) {
      Object.assign(alert, updates);
    }
    return alert;
  },
  addReportToQueue: (report) => {
    reportQueue.unshift(report);
    return report;
  },
  updateReportStatus: (reportId, status, data = {}) => {
    const report = reportQueue.find(r => r.id === reportId);
    if (report) {
      report.status = status;
      if (status === 'completed') {
        report.completedAt = new Date().toISOString();
      }
      Object.assign(report, data);
    }
    return report;
  },
};

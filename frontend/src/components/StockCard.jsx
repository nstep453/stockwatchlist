/**
 * Stock Card Component
 * 
 * Individual stock display card with quote, performance, and action buttons
 */

import React, { useState } from 'react';
import '../styles/StockCard.css';

function StockCard({
  stock,
  alerts,
  alertPatterns,
  onGenerateReport,
  onManageAlerts,
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await onGenerateReport();
    } finally {
      setIsGenerating(false);
    }
  };

  const changeClass = stock.percentChange >= 0 ? 'positive' : 'negative';
  const changeIcon = stock.percentChange >= 0 ? '📈' : '📉';

  return (
    <div className="stock-card">
      <div className="card-header">
        <div className="stock-info">
          <h3 className="symbol">{stock.symbol}</h3>
          <p className="name">{stock.name}</p>
          <p className="sector">{stock.sector}</p>
        </div>
        <div className="quick-stats">
          <span className="market-cap">MC: {stock.marketCap}</span>
          <span className="pe-ratio">P/E: {stock.pe}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="quote-section">
          <div className="price-display">
            <h2 className="current-price">${stock.price.toFixed(2)}</h2>
            <div className={`price-change ${changeClass}`}>
              <span className="icon">{changeIcon}</span>
              <span className="value">{stock.percentChange > 0 ? '+' : ''}{stock.percentChange.toFixed(2)}%</span>
            </div>
          </div>

          <div className="ohlcv">
            <div className="stat">
              <span className="label">Open</span>
              <span className="value">${stock.open}</span>
            </div>
            <div className="stat">
              <span className="label">High</span>
              <span className="value">${stock.high}</span>
            </div>
            <div className="stat">
              <span className="label">Low</span>
              <span className="value">${stock.low}</span>
            </div>
            <div className="stat">
              <span className="label">Vol</span>
              <span className="value">{(stock.volume / 1000000).toFixed(1)}M</span>
            </div>
          </div>

          <div className="timestamp">
            Last updated: {new Date(stock.timestamp).toLocaleTimeString()}
          </div>
        </div>

        {/* Active Alerts */}
        {alerts.length > 0 && (
          <div className="alerts-section">
            <h4 className="alerts-title">🚨 Active Alerts ({alerts.length})</h4>
            <div className="alert-list">
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`alert-badge ${alert.enabled ? 'enabled' : 'disabled'}`}
                >
                  {alertPatterns[alert.pattern]?.name || alert.pattern}
                  {alert.enabled ? '✓' : '✗'}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card-actions">
        <button
          className="btn-report"
          onClick={handleGenerateReport}
          disabled={isGenerating}
          title="Generate AI analysis report"
        >
          {isGenerating ? '⏳ Generating...' : '🤖 Generate Report'}
        </button>
        <button
          className="btn-alerts"
          onClick={onManageAlerts}
          title="Configure price and pattern alerts"
        >
          🔔 Manage Alerts
        </button>
      </div>
    </div>
  );
}

export default StockCard;

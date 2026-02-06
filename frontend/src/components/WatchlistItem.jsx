/**
 * WatchlistItem Component
 * 
 * Displays a single stock in the watchlist
 * Shows: symbol, price, change, volume, PE ratio
 */

import React from 'react';
import '../styles/watchlist.css';

export default function WatchlistItem({ stock, onGenerateReport, onViewAlerts }) {
  const isPositive = stock.priceChange >= 0;
  const changeClass = isPositive ? 'positive' : 'negative';
  const changeSymbol = isPositive ? '▲' : '▼';

  return (
    <div className="watchlist-item">
      <div className="stock-header">
        <div className="stock-main">
          <h3 className="stock-symbol">{stock.symbol}</h3>
          <p className="stock-name">{stock.name}</p>
        </div>
        <div className="stock-price">
          <span className="price">${stock.price.toFixed(2)}</span>
          <span className={`change ${changeClass}`}>
            {changeSymbol} ${Math.abs(stock.priceChange).toFixed(2)} ({stock.priceChangePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="stock-details">
        <div className="detail">
          <span className="label">Volume:</span>
          <span className="value">{(stock.volume / 1_000_000).toFixed(1)}M</span>
        </div>
        <div className="detail">
          <span className="label">Market Cap:</span>
          <span className="value">{stock.marketCap}</span>
        </div>
        <div className="detail">
          <span className="label">P/E Ratio:</span>
          <span className="value">{stock.pe.toFixed(1)}</span>
        </div>
        <div className="detail">
          <span className="label">Last Update:</span>
          <span className="value">{new Date(stock.lastUpdate).toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="stock-actions">
        <button 
          className="btn btn-primary"
          onClick={() => onGenerateReport(stock.symbol)}
        >
          📊 Generate Report
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => onViewAlerts(stock.symbol)}
        >
          🚨 View Alerts
        </button>
      </div>

      {stock.alerts && stock.alerts.length > 0 && (
        <div className="stock-alerts">
          <p className="alerts-label">Active Alerts: {stock.alerts.length}</p>
        </div>
      )}
    </div>
  );
}

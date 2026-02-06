/**
 * Watchlist Component
 * 
 * Displays 3 starter stocks with quote data, performance metrics, and actions
 */

import React from 'react';
import '../styles/Watchlist.css';
import StockCard from './StockCard';

function Watchlist({
  stocks,
  alerts,
  alertPatterns,
  loading,
  onGenerateReport,
  onManageAlerts,
}) {
  if (loading) {
    return (
      <div className="watchlist">
        <div className="loading">Loading stocks...</div>
      </div>
    );
  }

  if (stocks.length === 0) {
    return (
      <div className="watchlist">
        <div className="empty-state">
          <p>No stocks in watchlist yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist">
      <div className="stocks-grid">
        {stocks.map(stock => {
          const stockAlerts = alerts.filter(a => a.symbol === stock.symbol);
          return (
            <StockCard
              key={stock.symbol}
              stock={stock}
              alerts={stockAlerts}
              alertPatterns={alertPatterns}
              onGenerateReport={() => onGenerateReport(stock.symbol)}
              onManageAlerts={() => onManageAlerts(stock)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Watchlist;

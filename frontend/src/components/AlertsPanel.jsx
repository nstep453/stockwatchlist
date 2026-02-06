/**
 * Alerts Panel Component
 * 
 * Modal/side panel for configuring price and pattern alerts
 * Allows creating new alerts and managing existing ones
 */

import React, { useState } from 'react';
import '../styles/AlertsPanel.css';

function AlertsPanel({
  stock,
  alerts,
  patterns,
  onClose,
  onCreateAlert,
  onDeleteAlert,
  onToggleAlert,
}) {
  const [selectedPattern, setSelectedPattern] = useState('');
  const [threshold, setThreshold] = useState('5');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    if (!selectedPattern) {
      alert('Please select an alert pattern');
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreateAlert({
        symbol: stock.symbol,
        pattern: selectedPattern,
        threshold: parseFloat(threshold),
        enabled: true,
      });
      setSelectedPattern('');
      setThreshold('5');
    } finally {
      setIsSubmitting(false);
    }
  };

  const patternList = Object.entries(patterns);

  return (
    <div className="alerts-panel-overlay">
      <div className="alerts-panel">
        <div className="panel-header">
          <h2>Alert Configuration</h2>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>

        <div className="panel-content">
          <div className="stock-context">
            <h3>{stock.symbol}</h3>
            <p>{stock.name}</p>
          </div>

          {/* Create New Alert */}
          <form className="create-alert-form" onSubmit={handleCreateAlert}>
            <h3>➕ Create New Alert</h3>

            <div className="form-group">
              <label htmlFor="pattern">Alert Pattern</label>
              <select
                id="pattern"
                value={selectedPattern}
                onChange={(e) => setSelectedPattern(e.target.value)}
              >
                <option value="">-- Select Pattern --</option>
                {patternList.map(([key, pattern]) => (
                  <option key={key} value={key}>
                    {pattern.name}
                  </option>
                ))}
              </select>
              {selectedPattern && patterns[selectedPattern] && (
                <p className="pattern-description">
                  {patterns[selectedPattern].description}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="threshold">Threshold Value</label>
              <div className="threshold-input">
                <input
                  id="threshold"
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  min="0"
                  step="0.1"
                />
                <span className="threshold-hint">
                  {selectedPattern === 'MOMENTUM'
                    ? '(RSI level: 0-100)'
                    : selectedPattern === 'EARNINGS'
                    ? '(% change)'
                    : selectedPattern === 'VOLUME_SPIKE'
                    ? '(multiplier of avg volume)'
                    : '(% movement)'}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn-create"
              disabled={isSubmitting || !selectedPattern}
            >
              {isSubmitting ? '⏳ Creating...' : '✓ Create Alert'}
            </button>
          </form>

          {/* Active Alerts List */}
          {alerts.length > 0 && (
            <div className="active-alerts">
              <h3>📋 Active Alerts</h3>
              <div className="alerts-list">
                {alerts.map(alert => (
                  <div key={alert.id} className="alert-item">
                    <div className="alert-info">
                      <h4>{patterns[alert.pattern]?.name || alert.pattern}</h4>
                      <p className="alert-details">
                        Threshold: {alert.threshold}
                        {alert.createdAt && (
                          <span className="created-date">
                            {' '}• Created {new Date(alert.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="alert-controls">
                      <button
                        className={`btn-toggle ${alert.enabled ? 'enabled' : 'disabled'}`}
                        onClick={() => onToggleAlert(alert.id, alert.enabled)}
                        title={alert.enabled ? 'Disable alert' : 'Enable alert'}
                      >
                        {alert.enabled ? '🔔' : '🔕'}
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          if (window.confirm('Delete this alert?')) {
                            onDeleteAlert(alert.id);
                          }
                        }}
                        title="Delete alert"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {alerts.length === 0 && (
            <div className="empty-alerts">
              <p>No alerts configured for {stock.symbol}</p>
            </div>
          )}
        </div>

        <div className="panel-footer">
          <p className="info-text">
            💡 Alerts check continuously. Enable notifications to get updates when conditions are met.
          </p>
          <button className="btn-close-footer" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AlertsPanel;

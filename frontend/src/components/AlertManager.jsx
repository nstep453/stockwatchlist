/**
 * AlertManager Component
 * 
 * UI for viewing and creating pattern-detection alerts
 * Allows configuration of:
 * - Price targets (upper/lower bounds)
 * - Momentum shifts (RSI, MACD)
 * - Reversal signals (patterns, S/R breaks)
 * - Earnings impact alerts
 */

import React, { useState, useEffect } from 'react';
import AlertEditor from './AlertEditor';
import ApiClient from '../services/api';
import '../styles/alerts.css';

export default function AlertManager({ symbol, onClose }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);

  useEffect(() => {
    loadAlerts();
  }, [symbol]);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const response = await ApiClient.getAlerts(symbol);
      if (response.success) {
        setAlerts(response.data);
        setError(null);
      }
    } catch (err) {
      setError('Failed to load alerts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlert = async (alertData) => {
    try {
      const response = await ApiClient.createAlert(
        symbol,
        alertData.type,
        alertData.parameters,
        alertData.description
      );
      if (response.success) {
        setAlerts([...alerts, response.data]);
        setShowEditor(false);
      } else {
        alert('Failed to create alert: ' + response.error);
      }
    } catch (err) {
      alert('Error creating alert: ' + err.message);
      console.error(err);
    }
  };

  const handleUpdateAlert = async (alertId, updates) => {
    try {
      const response = await ApiClient.updateAlert(alertId, updates);
      if (response.success) {
        setAlerts(alerts.map(a => a.id === alertId ? response.data : a));
        setEditingAlert(null);
      } else {
        alert('Failed to update alert: ' + response.error);
      }
    } catch (err) {
      alert('Error updating alert: ' + err.message);
      console.error(err);
    }
  };

  if (loading) {
    return <div className="modal-overlay"><div className="modal-content">Loading alerts...</div></div>;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content alerts-modal">
        <div className="modal-header">
          <h2>Alerts for {symbol}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}

          <div className="alerts-list">
            {alerts.length === 0 ? (
              <p className="empty-state">No alerts configured. Create one to get started!</p>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className={`alert-item ${alert.enabled ? 'enabled' : 'disabled'}`}>
                  <div className="alert-header">
                    <div>
                      <h3>{getAlertTypeLabel(alert.type)}</h3>
                      <p>{alert.description}</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={alert.enabled}
                        onChange={(e) => handleUpdateAlert(alert.id, { enabled: e.target.checked })}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="alert-parameters">
                    {Object.entries(alert.parameters).map(([key, value]) => (
                      <span key={key} className="parameter">
                        <strong>{key}:</strong> {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                      </span>
                    ))}
                  </div>
                  <button 
                    className="btn btn-small"
                    onClick={() => setEditingAlert(alert)}
                  >
                    Edit
                  </button>
                </div>
              ))
            )}
          </div>

          <button 
            className="btn btn-primary"
            onClick={() => setShowEditor(true)}
          >
            + Create New Alert
          </button>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

        {showEditor && (
          <AlertEditor
            symbol={symbol}
            alert={editingAlert}
            onSave={editingAlert ? 
              (data) => handleUpdateAlert(editingAlert.id, data) :
              handleCreateAlert
            }
            onCancel={() => {
              setShowEditor(false);
              setEditingAlert(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

function getAlertTypeLabel(type) {
  const labels = {
    'price_target': '💰 Price Target',
    'momentum_shift': '📊 Momentum Shift',
    'reversal_signal': '⚡ Reversal Signal',
    'earnings_impact': '📅 Earnings Impact'
  };
  return labels[type] || type;
}

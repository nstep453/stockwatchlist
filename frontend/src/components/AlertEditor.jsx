/**
 * AlertEditor Component
 * 
 * Form for creating or editing pattern-detection alerts
 * Provides UI for different alert types with appropriate parameter inputs
 */

import React, { useState, useEffect } from 'react';
import '../styles/alerts.css';

const ALERT_TEMPLATES = {
  'price_target': {
    label: '💰 Price Target',
    description: 'Alert when stock crosses specific price levels',
    parameters: {
      upperBound: {
        label: 'Upper Bound ($)',
        type: 'number',
        placeholder: '200',
        required: true
      },
      lowerBound: {
        label: 'Lower Bound ($)',
        type: 'number',
        placeholder: '150',
        required: true
      }
    }
  },
  'momentum_shift': {
    label: '📊 Momentum Shift',
    description: 'Alert on RSI overbought/oversold or MACD crossovers',
    parameters: {
      rsiThreshold: {
        label: 'RSI Threshold (30-70)',
        type: 'number',
        min: 30,
        max: 70,
        placeholder: '70',
        required: false
      },
      macdCrossover: {
        label: 'Alert on MACD Crossover',
        type: 'checkbox',
        required: false
      }
    }
  },
  'reversal_signal': {
    label: '⚡ Reversal Signal',
    description: 'Alert on candlestick patterns and key support/resistance breaks',
    parameters: {
      hammerPatternDetection: {
        label: 'Detect Hammer Patterns',
        type: 'checkbox',
        required: false
      },
      supportResistanceBreak: {
        label: 'Alert on Support/Resistance Breaks',
        type: 'checkbox',
        required: false
      }
    }
  },
  'earnings_impact': {
    label: '📅 Earnings Impact',
    description: 'Alert before earnings with volatility filters',
    parameters: {
      daysBeforeEarnings: {
        label: 'Days Before Earnings',
        type: 'number',
        min: 1,
        max: 7,
        placeholder: '3',
        required: true
      },
      volatilityThreshold: {
        label: 'Volatility Threshold (0-1)',
        type: 'number',
        min: 0,
        max: 1,
        step: 0.01,
        placeholder: '0.05',
        required: true
      }
    }
  }
};

export default function AlertEditor({ symbol, alert, onSave, onCancel }) {
  const [alertType, setAlertType] = useState(alert?.type || 'price_target');
  const [description, setDescription] = useState(alert?.description || '');
  const [parameters, setParameters] = useState(alert?.parameters || {});
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const template = ALERT_TEMPLATES[alertType];

  const handleParameterChange = (key, value) => {
    setParameters({
      ...parameters,
      [key]: value
    });
  };

  const handleSave = () => {
    // Validation
    for (const [key, config] of Object.entries(template.parameters)) {
      if (config.required && (parameters[key] === undefined || parameters[key] === '')) {
        setError(`${config.label} is required`);
        return;
      }
    }

    setSaving(true);
    try {
      onSave({
        type: alertType,
        parameters,
        description: description || `${template.label} for ${symbol}`
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="alert-editor-overlay">
      <div className="alert-editor">
        <h3>{alert ? 'Edit Alert' : 'Create Alert'} for {symbol}</h3>

        {error && <div className="error-message">{error}</div>}

        <div className="editor-section">
          <label htmlFor="alert-type">Alert Type</label>
          <select
            id="alert-type"
            value={alertType}
            onChange={(e) => {
              setAlertType(e.target.value);
              setParameters({});
            }}
          >
            {Object.entries(ALERT_TEMPLATES).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
          <p className="help-text">{template.description}</p>
        </div>

        <div className="editor-section">
          <label htmlFor="alert-description">Description (optional)</label>
          <input
            id="alert-description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`${template.label} for ${symbol}`}
          />
        </div>

        <div className="editor-section parameters">
          <h4>Parameters</h4>
          {Object.entries(template.parameters).map(([key, config]) => (
            <div key={key} className="parameter-field">
              <label htmlFor={key}>
                {config.label}
                {config.required && <span className="required">*</span>}
              </label>

              {config.type === 'checkbox' ? (
                <label className="checkbox-label">
                  <input
                    id={key}
                    type="checkbox"
                    checked={parameters[key] || false}
                    onChange={(e) => handleParameterChange(key, e.target.checked)}
                  />
                  {config.label}
                </label>
              ) : (
                <input
                  id={key}
                  type={config.type || 'text'}
                  value={parameters[key] || ''}
                  onChange={(e) => handleParameterChange(key, 
                    config.type === 'number' ? parseFloat(e.target.value) || '' : e.target.value
                  )}
                  placeholder={config.placeholder}
                  min={config.min}
                  max={config.max}
                  step={config.step}
                />
              )}
            </div>
          ))}
        </div>

        <div className="editor-footer">
          <button 
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Alert'}
          </button>
        </div>
      </div>
    </div>
  );
}

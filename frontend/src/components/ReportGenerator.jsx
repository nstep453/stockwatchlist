/**
 * ReportGenerator Component
 * 
 * UI for requesting new AI-generated reports
 * Modal overlay for report generation interface
 */

import React, { useState } from 'react';
import ApiClient from '../services/api';
import '../styles/modal.css';

const REPORT_TYPES = [
  {
    id: 'technical_analysis',
    label: '📈 Technical Analysis',
    description: 'Price patterns, support/resistance, moving averages, RSI, MACD'
  },
  {
    id: 'fundamental_analysis',
    label: '💰 Fundamental Analysis',
    description: 'P/E ratios, earnings, revenue growth, debt levels, ROE'
  },
  {
    id: 'earnings_impact',
    label: '📅 Earnings Impact',
    description: 'Upcoming earnings dates, historical surprises, volatility patterns'
  },
  {
    id: 'custom',
    label: '⚙️ Custom Analysis',
    description: 'Combine multiple indicators and metrics for a holistic view'
  }
];

export default function ReportGenerator({ symbol, onClose, onGenerate }) {
  const [selectedType, setSelectedType] = useState('technical_analysis');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!selectedType) {
      setError('Please select a report type');
      return;
    }

    try {
      setGenerating(true);
      setError(null);
      const response = await ApiClient.generateReport(symbol, selectedType);
      
      if (response.success || response.message === 'Report generation queued') {
        onGenerate?.(response.data);
        onClose();
      } else {
        setError(response.error || 'Failed to generate report');
      }
    } catch (err) {
      setError(err.message || 'Error generating report');
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Generate Report for {symbol}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            Select the type of analysis you'd like. Our AI system will generate a detailed report with insights and recommendations.
          </p>

          <div className="report-types-grid">
            {REPORT_TYPES.map(type => (
              <div
                key={type.id}
                className={`report-type-card ${selectedType === type.id ? 'selected' : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                <h3>{type.label}</h3>
                <p>{type.description}</p>
              </div>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-info">
            <p className="info-text">
              ℹ️ Reports are generated asynchronously and added to your queue. You can track progress from the Report Queue section above.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className="btn btn-secondary"
            onClick={onClose}
            disabled={generating}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>
    </div>
  );
}

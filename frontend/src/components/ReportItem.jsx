/**
 * ReportItem Component
 * 
 * Displays a single report in the queue
 * Shows progress bar for in-progress reports
 * Shows summary for completed reports
 */

import React from 'react';
import '../styles/reports.css';

export default function ReportItem({ report }) {
  const isCompleted = report.status === 'completed';
  const isInProgress = report.status === 'in_progress';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString();
  };

  const getTypeLabel = (type) => {
    const labels = {
      'technical_analysis': '📈 Technical Analysis',
      'fundamental_analysis': '💰 Fundamental Analysis',
      'earnings_impact': '📅 Earnings Impact',
      'custom': '⚙️ Custom Analysis'
    };
    return labels[type] || type;
  };

  const getSentimentClass = (sentiment) => {
    const classes = {
      'bullish': 'sentiment-bullish',
      'bearish': 'sentiment-bearish',
      'neutral': 'sentiment-neutral'
    };
    return classes[sentiment] || '';
  };

  return (
    <div className={`report-item ${report.status}`}>
      <div className="report-header">
        <div className="report-main">
          <span className="report-symbol">{report.symbol}</span>
          <span className="report-type">{getTypeLabel(report.type)}</span>
        </div>
        <span className={`report-status ${report.status}`}>
          {report.status === 'completed' ? '✓ Completed' : 
           report.status === 'in_progress' ? '⏳ In Progress' :
           '📋 Queued'}
        </span>
      </div>

      {isInProgress && (
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${report.progress}%` }}></div>
          </div>
          <span className="progress-text">{report.progress}%</span>
        </div>
      )}

      <div className="report-meta">
        <span className="meta-item">
          Requested: {formatDate(report.requestedAt)}
        </span>
        {isInProgress && (
          <span className="meta-item">
            Est. completion: {formatDate(report.estimatedCompletion)}
          </span>
        )}
        {isCompleted && report.completedAt && (
          <span className="meta-item">
            Completed: {formatDate(report.completedAt)}
          </span>
        )}
      </div>

      {isCompleted && report.report && (
        <div className="report-content">
          <h4>{report.report.title}</h4>
          <p className="report-summary">{report.report.summary}</p>
          
          {report.report.keyFindings && report.report.keyFindings.length > 0 && (
            <div className="key-findings">
              <p className="findings-label">Key Findings:</p>
              <ul>
                {report.report.keyFindings.map((finding, idx) => (
                  <li key={idx}>{finding}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="report-footer">
            <span className={`sentiment ${getSentimentClass(report.report.sentiment)}`}>
              {report.report.sentiment.toUpperCase()}
            </span>
            <span className="confidence">
              Confidence: {(report.report.confidence * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

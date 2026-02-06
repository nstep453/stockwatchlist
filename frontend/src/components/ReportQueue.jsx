/**
 * ReportQueue Component
 * 
 * Displays pending and completed AI analysis reports
 * Shows progress for in-progress reports
 * Displays completed report summaries
 */

import React, { useState, useEffect } from 'react';
import ReportItem from './ReportItem';
import ApiClient from '../services/api';
import '../styles/reports.css';

export default function ReportQueue() {
  const [queue, setQueue] = useState({ pending: [], completed: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadQueue();
    // Refresh queue every 10 seconds to show progress
    const interval = setInterval(loadQueue, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadQueue = async () => {
    try {
      setLoading(true);
      const response = await ApiClient.getReportQueue();
      if (response.success) {
        setQueue({
          pending: response.data.pending || [],
          completed: response.data.completed || []
        });
        setError(null);
      }
    } catch (err) {
      setError('Failed to load report queue');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPending = queue.pending.length;
  const totalCompleted = queue.completed.length;

  return (
    <section className="report-queue">
      <div className="queue-header">
        <h2>📊 Report Queue</h2>
        <div className="queue-stats">
          <span className="stat pending-badge">
            {totalPending} Pending
          </span>
          <span className="stat completed-badge">
            {totalCompleted} Completed
          </span>
        </div>
        <button className="btn-refresh" onClick={loadQueue}>
          🔄 Refresh
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Pending Reports */}
      <div className="queue-section pending">
        <h3>In Progress & Queued</h3>
        {totalPending === 0 ? (
          <p className="empty-state">No reports pending. Generate one to get started!</p>
        ) : (
          <div className="reports-list">
            {queue.pending.map(report => (
              <ReportItem key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>

      {/* Completed Reports */}
      {totalCompleted > 0 && (
        <div className="queue-section completed">
          <h3>Completed Reports</h3>
          <div className="reports-list">
            {queue.completed.slice(0, 5).map(report => (
              <ReportItem key={report.id} report={report} />
            ))}
          </div>
          {totalCompleted > 5 && (
            <p className="more-reports">
              +{totalCompleted - 5} more completed reports
            </p>
          )}
        </div>
      )}
    </section>
  );
}

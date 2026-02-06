# Stock Watchlist MVP - Architecture Document

## Overview

A modern, scalable web application for AI-powered stock monitoring with real-time alerts and detailed analysis reports.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                      │
│  ┌──────────┬──────────────┬──────────────┬────────────┐ │
│  │ Report   │ Watchlist    │ Report Gen   │ Alerts     │ │
│  │ Queue    │ Display      │ Modal        │ Manager    │ │
│  └──────────┴──────────────┴──────────────┴────────────┘ │
│                          ↓ HTTP/REST                      │
├─────────────────────────────────────────────────────────┤
│                    BACKEND (Express.js)                   │
│  ┌──────────┬──────────────┬──────────────┬────────────┐ │
│  │ Watchlist│ Reports      │ Alerts       │ Health     │ │
│  │ Routes   │ Routes       │ Routes       │ Check      │ │
│  └──────────┴──────────────┴──────────────┴────────────┘ │
│                          ↓                                 │
│  ┌──────────────────────────────────────────────────────┐ │
│  │         Mock Data Layer (Models)                      │ │
│  │  - Watchlist Data  - Report Queue  - Alert Settings  │ │
│  └──────────────────────────────────────────────────────┘ │
│                          ↓                                 │
│  ┌──────────────────────────────────────────────────────┐ │
│  │         Background Jobs (Scheduler)                   │ │
│  │  - Report Generation  - Alert Evaluation  - Refresh   │ │
│  └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Component Breakdown

### Frontend (React)

#### Key Components:
1. **ReportQueue** - Displays pending and completed reports
   - Shows progress bars for in-progress reports
   - Displays summary for completed reports
   - Auto-refreshes every 10 seconds

2. **Watchlist** - Main stock tracking interface
   - Lists 3+ stocks with real-time data
   - Shows price, change, volume, P/E ratio
   - Add new stocks form
   - Buttons to generate reports or view alerts

3. **WatchlistItem** - Individual stock display
   - Stock details and metrics
   - Action buttons for report/alert management

4. **ReportGenerator** - Modal for requesting new reports
   - Selection of report type (technical, fundamental, earnings, custom)
   - Confirmation and queueing

5. **AlertManager** - Modal for managing alerts
   - View existing alerts
   - Create new alerts
   - Toggle alert status
   - Edit alert parameters

6. **AlertEditor** - Form for alert configuration
   - Dynamic parameter fields based on alert type
   - Validation before save

#### Services:
- **api.js** - Centralized HTTP client for all backend calls
  - All endpoints wrapped with error handling
  - Easy to add authentication headers later

### Backend (Express.js)

#### Routes:
1. **GET /api/watchlist** - Fetch all watchlist stocks
2. **POST /api/watchlist** - Add stock to watchlist
3. **GET /api/watchlist/:symbol** - Get specific stock
4. **GET /api/reports/queue** - Fetch report queue
5. **POST /api/reports/generate** - Request new report
6. **GET /api/reports/:reportId** - Get specific report
7. **GET /api/alerts** - Fetch all alerts (with optional symbol filter)
8. **POST /api/alerts** - Create new alert
9. **PATCH /api/alerts/:alertId** - Update alert
10. **GET /api/alerts/types** - Get alert type schemas

#### Data Models:
- **Stock**: { id, symbol, name, price, priceChange, volume, marketCap, pe, lastUpdate, alerts }
- **Report**: { id, symbol, status, type, progress, requestedAt, completedAt, report }
- **Alert**: { id, symbol, type, enabled, parameters, description }

#### Services (Future):
- **stockService.js** - Integration with real stock APIs
- **reportService.js** - AI report generation
- **alertService.js** - Pattern detection logic

### Background Jobs

#### Current Job Scheduler:
- Runs every 30 seconds to check report queue
- Runs every 2 minutes to evaluate alerts
- Runs every 5 minutes to refresh stock data
- Daily jobs for earnings reminders and cleanup

#### Future Enhancements:
- Use Bull queue for distributed job processing
- Use node-cron for more sophisticated scheduling
- Add email/SMS notification sending

## Data Flow

### Report Generation Flow:
```
User clicks "Generate Report"
    ↓
ReportGenerator Modal opens with type selection
    ↓
User selects type and submits
    ↓
POST /api/reports/generate
    ↓
Backend adds to mock queue with "queued" status
    ↓
Background job picks it up
    ↓
(Future) Calls AI service with stock data
    ↓
Report marked "completed" with analysis
    ↓
Frontend polls /api/reports/queue
    ↓
Report appears in ReportQueue section
```

### Alert Creation Flow:
```
User clicks "View Alerts" on stock
    ↓
AlertManager Modal opens with existing alerts
    ↓
User clicks "Create New Alert"
    ↓
AlertEditor form with dynamic fields
    ↓
User configures parameters and saves
    ↓
POST /api/alerts
    ↓
Backend stores alert in mock data
    ↓
(Future) Background job evaluates alert continuously
    ↓
If condition met, send notification
```

## Current vs. Future Architecture

### MVP (Current)
- ✅ Mock data in memory
- ✅ RESTful API design
- ✅ Single-page React app
- ✅ Basic job scheduler framework
- ✅ No authentication
- ✅ No database

### Phase 2 (Next)
- [ ] PostgreSQL database
- [ ] Real stock API integration (Alpha Vantage, IEX)
- [ ] AI service integration (OpenAI, Anthropic)
- [ ] Redis for caching and job queue
- [ ] WebSocket for real-time updates
- [ ] Basic authentication

### Phase 3 (Scale)
- [ ] Multi-user support
- [ ] User accounts and preferences
- [ ] Advanced charting (TradingView)
- [ ] Email/SMS notifications
- [ ] Mobile app (React Native)
- [ ] Distributed job processing (Bull)

## Integration Points

All integration points are clearly marked with `// INTEGRATION:` comments.

### Stock Data Integration:
File: `backend/models/mockData.js` - `getWatchlist()` function
```javascript
// INTEGRATION: Replace with real API call
// const response = await fetch('https://api.example.com/stocks/watchlist')
```

### AI Report Generation:
File: `backend/routes/reports.js` - `POST /api/reports/generate`
```javascript
// INTEGRATION: Trigger actual background job here
// await jobQueue.enqueue('generate_report', { symbol, type, reportId })
```

### Alert Evaluation:
File: `backend/jobs/scheduler.js` - `evaluateAlerts()` function
```javascript
// INTEGRATION: Fetch current prices and evaluate each alert condition
// Call notification service if triggered
```

## Technology Decisions

### Frontend: React + Vanilla CSS
- **Why**: Easy to iterate on UI, no build complexity
- **Alternatives**: Vue (lighter), Angular (heavier)
- **CSS**: Vanilla + CSS Modules for maintainability
- **Alternatives**: Tailwind (faster dev), Styled Components (JS-in-CSS)

### Backend: Express.js + Node.js
- **Why**: JavaScript full-stack, good for MVP
- **Alternatives**: Python (better for ML), Go (faster)
- **Considerations**: Python would be better if heavy AI integration needed

### Job Scheduling: Simple interval-based
- **Why**: MVP simplicity, no external dependencies
- **Future**: Bull queue, Celery, or serverless functions

### Data: Mock in-memory
- **Why**: No database setup needed for MVP
- **Future**: PostgreSQL for reliability and scaling

## Performance Considerations

### Frontend:
- Report queue auto-refreshes every 10s (configurable)
- Watchlist auto-refreshes every 30s (configurable)
- Component-level state management only (no Redux needed yet)

### Backend:
- Mock data functions return deep copies to prevent mutations
- RESTful design allows easy caching headers later
- Job scheduler runs async tasks to avoid blocking

### Scaling Strategy:
1. Add database with proper indexing
2. Implement caching layer (Redis)
3. Move to microservices for different concerns
4. Use message queue for async jobs
5. Implement GraphQL for better data fetching

## Security Notes (MVP)

Currently unsecured (intentional for MVP):
- ✅ No authentication
- ✅ No HTTPS enforcement
- ✅ No rate limiting
- ✅ CORS enabled for all origins

**Before production:**
- [ ] Add authentication (JWT/OAuth)
- [ ] Implement rate limiting
- [ ] Add HTTPS
- [ ] Validate all inputs
- [ ] Sanitize database queries
- [ ] Add CORS restrictions
- [ ] Add logging and monitoring

## Testing Strategy

### Frontend Tests (Future):
- Unit tests for components
- Integration tests for API calls
- E2E tests with Cypress

### Backend Tests (Future):
- Unit tests for routes
- Integration tests for data models
- Job scheduler tests

Current: No tests (focus on functionality)

## Deployment

### Development:
```bash
# Terminal 1 - Backend
cd backend && npm install && npm start

# Terminal 2 - Frontend
cd frontend && npm install && npm start
```

### Production (Future):
- Backend: Heroku, Railway, or AWS Lambda
- Frontend: Vercel, Netlify, or AWS S3 + CloudFront
- Database: AWS RDS, DigitalOcean, or self-hosted
- Job Queue: Redis on DigitalOcean or AWS ElastiCache

## Monitoring & Analytics

Future additions:
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- User analytics (Mixpanel)
- Logging (ELK stack or LogRocket)

---

## Quick Reference

### File Structure
```
stock-watchlist/
├── backend/
│   ├── server.js           # Main Express app
│   ├── routes/             # API endpoints
│   ├── models/             # Mock data
│   └── jobs/               # Background tasks
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main component
│   │   ├── components/     # React components
│   │   ├── services/       # API client
│   │   └── styles/         # CSS modules
│   └── public/             # Static assets
└── docs/                   # Documentation
```

### Starting the Project
```bash
# Backend (terminal 1)
cd backend && npm install && npm start

# Frontend (terminal 2)
cd frontend && npm install && npm start
```

Backend: http://localhost:5000
Frontend: http://localhost:3000

---

For questions or improvements, refer to the code comments or update this document.

# Quick Start Guide

Get the Stock Watchlist up and running in 5 minutes.

## Prerequisites

- Node.js 16+ (check with `node --version`)
- npm 8+ (check with `npm --version`)

## Installation & Startup

### 1. Backend Setup

```bash
cd backend
npm install
npm start
```

The API will be available at **http://localhost:5000**

You should see:
```
🚀 Stock Watchlist API running on http://localhost:5000
📊 Base URL: http://localhost:5000/api
```

### 2. Frontend Setup (New Terminal)

```bash
cd frontend
npm install
npm start
```

The app will open at **http://localhost:3000**

## First Run

1. **See the Demo**
   - Report Queue at the top (shows sample completed report for AAPL)
   - Watchlist below with 3 stocks: AAPL, MSFT, TSLA
   - Each stock card shows current price, change %, and key stats

2. **Generate a Report**
   - Click "🤖 Generate Report" on any stock card
   - Report moves to "Generating..." with progress bar
   - Once complete (after ~3 seconds), click to expand and read analysis

3. **Create an Alert**
   - Click "🔔 Manage Alerts" on a stock
   - Select an alert pattern (Earnings Impact, Reversal Signal, Momentum Shift, etc.)
   - Set threshold value
   - Click "Create Alert"

4. **See Live Updates**
   - Quotes refresh every 15 seconds automatically
   - Watch prices and % changes update in real-time

## What You're Looking At

### Report Queue (Top Section)
- **Visually distinct** with cyan border
- Shows ongoing and completed AI analysis reports
- Click completed reports to expand and read full analysis
- Progress bars show generation status

### Watchlist (Main Section)
- 3 starter stocks with current quotes
- Price change indicator (🔴/🟢 with % change)
- OHLCV (Open, High, Low, Close, Volume) stats
- Active alerts list
- Two action buttons per card

### Alert Management Modal
- Configure pattern-based alerts
- Set threshold values
- Enable/disable existing alerts
- Delete alerts

## API Endpoints (Reference)

```bash
# Get all stocks
curl http://localhost:5000/api/stocks

# Get alert patterns
curl http://localhost:5000/api/alerts/patterns

# Get all alerts
curl http://localhost:5000/api/alerts

# Generate a report
curl -X POST http://localhost:5000/api/reports/generate \
  -H "Content-Type: application/json" \
  -d '{"symbol":"AAPL","analysisType":"full"}'
```

See [docs/API.md](./docs/API.md) for complete API reference.

## Project Structure

```
stock-watchlist/
├── backend/
│   ├── src/
│   │   ├── server.js              # Main Express app
│   │   ├── routes/                # API endpoints
│   │   │   ├── stocks.js
│   │   │   ├── reports.js
│   │   │   └── alerts.js
│   │   └── services/              # Business logic
│   │       ├── report-generator.js
│   │       └── job-scheduler.js
│   ├── data/
│   │   └── mock-data.js           # Mock stocks, reports, alerts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                # Main app component
│   │   ├── components/            # React components
│   │   ├── styles/                # CSS modules
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
│
├── docs/
│   ├── API.md                     # API documentation
│   └── ARCHITECTURE.md            # Design decisions
└── README.md
```

## Development Tips

### Hot Reload
- **Backend**: Install `nodemon` for auto-restart on file changes
  ```bash
  npm install --save-dev nodemon
  npm run dev
  ```

- **Frontend**: React Scripts auto-reloads on file changes (already enabled)

### Debugging
- **Backend**: Add `console.log()` statements, visible in terminal
- **Frontend**: Use browser DevTools (F12) for React component debugging

### Mock Data
- Edit `backend/data/mock-data.js` to modify starter stocks, reports, or alert patterns
- Changes are reflected after backend restart

### Custom Report Content
- Edit `backend/src/services/report-generator.js` to customize analysis reports
- Add new stock-specific reports in `TECHNICAL_ANALYSES` object

## Common Issues

### Port Already in Use
```bash
# Backend (5000) or Frontend (3000) port in use?

# Linux/Mac: Find and kill process
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9

# Windows: Use Task Manager or
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Errors
- Make sure backend is running on http://localhost:5000
- Frontend proxy is configured in `frontend/package.json`

### Dependencies Not Installing
```bash
# Clear npm cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Explore the Code**
   - Read `docs/ARCHITECTURE.md` for design decisions
   - Look for `// FUTURE:` comments for integration points

2. **Customize**
   - Add your own stocks to mock data
   - Create custom alert patterns
   - Modify report templates

3. **Extend**
   - Add database (PostgreSQL + Prisma)
   - Integrate real stock APIs
   - Connect Claude API for AI reports
   - Add user authentication

See [README.md](./README.md) for full project overview and [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for technical details.

## Troubleshooting

Check that:
- ✅ Node.js v16+ installed (`node --version`)
- ✅ npm v8+ installed (`npm --version`)
- ✅ Backend terminal shows "Stock Watchlist API running on http://localhost:5000"
- ✅ Frontend terminal shows "webpack compiled"
- ✅ No error messages in either terminal
- ✅ You can access http://localhost:3000 in browser

If issues persist, check the README.md and docs/ folder for additional guidance.

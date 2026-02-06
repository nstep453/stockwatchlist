# AI-Powered Stock Watchlist MVP

A modern web application for monitoring stocks with AI-generated reports and pattern-detection alerts.

## Project Structure

```
stock-watchlist/
├── backend/              # Express.js server
│   ├── server.js         # Main entry point
│   ├── routes/           # API endpoints
│   ├── models/           # Data models & mock data
│   ├── services/         # Business logic
│   ├── jobs/             # Periodic/scheduled tasks
│   └── package.json
├── frontend/             # React app
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API client
│   │   ├── styles/       # CSS modules
│   │   └── App.jsx
│   └── package.json
└── docs/                 # Documentation & architecture notes
```

## Features

- **Report Queue**: View and manage pending AI analysis reports
- **Watchlist**: Track 3+ starter stocks with real-time display
- **Report Generation**: UI for requesting detailed stock analysis
- **Alert Settings**: Configure pattern-detection alerts (earnings, reversals, momentum)
- **Mock Data**: All data is mocked for demonstration; ready to integrate real APIs

## Quick Start

### Backend
```bash
cd backend
npm install
npm start  # Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm start  # Runs on http://localhost:3000
```

## Tech Stack

- **Frontend**: React, CSS Modules
- **Backend**: Express.js, Node.js
- **Data**: Mock JSON (file-based, no DB required yet)
- **Architecture**: Clean separation of concerns, ready for scaling

## Next Steps

1. Integrate real stock APIs (Alpha Vantage, IEX, etc.) in `backend/services/stockService.js`
2. Replace mock reports with actual AI analysis (OpenAI, Anthropic, etc.)
3. Add database layer (PostgreSQL recommended)
4. Implement actual job scheduling (node-cron, Bull queues)
5. Add user authentication & multi-user support

## Development Notes

- All mock data is clearly marked with `// MOCK DATA` comments
- API endpoints are designed to be easily swappable
- Component structure allows for easy UI iteration
- Job system is stubbed for future enhancement

---

See `docs/ARCHITECTURE.md` for detailed technical decisions.

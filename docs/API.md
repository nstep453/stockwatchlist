# Stock Watchlist API Documentation

Base URL: `http://localhost:5000/api`

## Endpoints

### Health Check
- **GET** `/health` - Server health status

### Stocks

#### Get all stocks
```
GET /stocks
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "price": 189.50,
      "percentChange": 2.3,
      "open": 187.80,
      "high": 190.20,
      "low": 187.00,
      "volume": 45000000,
      "timestamp": "2024-01-15T14:30:00Z",
      "sector": "Technology",
      "marketCap": "2.8T",
      "pe": 28.5,
      "dividend": 0.92
    }
  ],
  "timestamp": "2024-01-15T14:30:00Z"
}
```

#### Get single stock
```
GET /stocks/{symbol}
```

#### Force quote refresh
```
POST /stocks/{symbol}/quote
```

### Reports

#### Get all reports
```
GET /reports
```

#### Get single report
```
GET /reports/{id}
```

#### Generate new report
```
POST /reports/generate
Content-Type: application/json

{
  "symbol": "AAPL",
  "analysisType": "full",  // "full" | "technical" | "fundamental"
  "includeHistoricalContext": true
}
```

Response (202 Accepted):
```json
{
  "success": true,
  "message": "Report generation queued",
  "data": {
    "id": "report-abc12345",
    "symbol": "AAPL",
    "status": "queued",
    "analysisType": "full",
    "requestedAt": "2024-01-15T14:30:00Z",
    "progress": 0
  }
}
```

#### Get report progress
```
GET /reports/{id}/progress
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "report-abc12345",
    "symbol": "AAPL",
    "status": "processing",
    "progress": 45,
    "requestedAt": "2024-01-15T14:30:00Z",
    "completedAt": null
  }
}
```

### Alerts

#### Get alert patterns
```
GET /alerts/patterns
```

Response:
```json
{
  "success": true,
  "data": {
    "EARNINGS": {
      "id": "earnings",
      "name": "Earnings Impact",
      "description": "Alert when stock price changes >5% around earnings dates",
      "category": "fundamental"
    },
    "REVERSAL": {
      "id": "reversal",
      "name": "Reversal Signal",
      "description": "Alert on potential trend reversal",
      "category": "technical"
    },
    // ... more patterns
  }
}
```

#### Get all alerts
```
GET /alerts
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "alert-abc123",
      "symbol": "AAPL",
      "pattern": "EARNINGS",
      "enabled": true,
      "threshold": 5,
      "createdAt": "2024-01-10T10:00:00Z"
    }
  ],
  "total": 3
}
```

#### Create alert
```
POST /alerts
Content-Type: application/json

{
  "symbol": "AAPL",
  "pattern": "EARNINGS",
  "threshold": 5,
  "enabled": true
}
```

Response (201 Created):
```json
{
  "success": true,
  "message": "Alert created successfully",
  "data": {
    "id": "alert-abc123",
    "symbol": "AAPL",
    "pattern": "EARNINGS",
    "enabled": true,
    "threshold": 5,
    "createdAt": "2024-01-15T14:30:00Z"
  }
}
```

#### Update alert
```
PUT /alerts/{id}
Content-Type: application/json

{
  "enabled": false,
  "threshold": 7
}
```

#### Delete alert
```
DELETE /alerts/{id}
```

Response:
```json
{
  "success": true,
  "message": "Alert deleted successfully",
  "data": {
    "id": "alert-abc123"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "symbol is required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Stock XYZ not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Error details (dev only)"
}
```

## Future Integration Points

### Real-time Quote Data
Replace mock data with real API:
- Alpha Vantage (free tier: 5/min, 500/day)
- IEX Cloud (free tier: 100/month)
- Finnhub (free tier: 60/min)
- Note: Implement 15-minute delayed data per SEC requirements

### AI Report Generation
Integrate with Claude API:
```javascript
const response = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 2000,
  messages: [{
    role: "user",
    content: `Analyze ${symbol} with this data: ${JSON.stringify(stockData)}`
  }]
});
```

### Pattern Detection Alerts
Add proper alert evaluation:
- Calculate technical indicators (RSI, MACD, Bollinger Bands)
- Implement earnings date tracking
- Add support/resistance level detection
- Create volume analysis engine

### Notifications
- Email alerts (SendGrid, AWS SES)
- Slack webhooks
- SMS (Twilio)
- In-app notifications

### Data Persistence
Replace in-memory store with database:
```javascript
// PostgreSQL with Prisma
const alert = await prisma.alert.create({
  data: {
    symbol, pattern, threshold, enabled
  }
});
```

### User Authentication
- JWT tokens
- OAuth2 (Google, GitHub)
- Multi-user watchlists
- Preferences & settings

# User Guide - Stock Watchlist

Complete walkthrough of features and UI.

---

## 🎬 First Time Setup

### Start the Application

**Terminal 1 (Backend API):**
```bash
cd backend
npm install
npm start
```
✅ You should see: `🚀 Stock Watchlist API running on http://localhost:5000`

**Terminal 2 (Frontend App):**
```bash
cd frontend
npm install
npm start
```
✅ Browser opens automatically to http://localhost:3000

---

## 👀 What You See

### Top Section: Header
```
┌────────────────────────────────────────────┐
│  📊 Stock Watchlist              Live ●    │
│  AI-Powered Stock Analysis & Alerts        │
│  API: Connected                            │
└────────────────────────────────────────────┘
```

**What it means:**
- App name and tagline
- "Live ●" = API is connected and working
- Green pulsing dot confirms connection

---

### Middle Section: Report Queue
```
┌────────────────────────────────────────────┐
│ 📋 Report Queue                    1 report│
├────────────────────────────────────────────┤
│                                            │
│ Completed                                  │
│ ┌──────────────────────────────────────────┐
│ │ ✅ AAPL - Technical & Fundamental Analysi│
│ │ Completed Jan 15, 2:25 PM          ▶    │
│ └──────────────────────────────────────────┘
│
│ Generating...                              │
│ ┌──────────────────────────────────────────┐
│ │ ⏳ MSFT                              45% │
│ │ Requested Jan 15, 2:20 PM          ▼    │
│ │ ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░  │
│ └──────────────────────────────────────────┘
│
└────────────────────────────────────────────┘
```

**What it means:**
- **Cyan border** = This is the report section (visually distinct)
- **Completed** = Reports you can read
- **Generating** = Reports in progress with % complete
- **Click arrow** = Expand to read full report

**Click on completed report:**
```
┌──────────────────────────────────────────┐
│ ✅ AAPL - Technical & Fundamental Analysi│
│ Completed Jan 15, 2:25 PM          ▼    │
├──────────────────────────────────────────┤
│ SUMMARY                                  │
│ AAPL shows strong uptrend with support at│
│ $185. Recent earnings beat expectations...│
│                                          │
│ RECOMMENDATION                           │
│ HOLD (confidence: high)                  │
│                                          │
│ TECHNICAL ANALYSIS      FUNDAMENTAL     │
│ • Price above 50-day MA │ • P/E ratio   │
│ • RSI at 62 (room to run) │ • Services  │
│ • Support at $185       │   growing 15% │
│                                          │
│ CATALYSTS               RISK FACTORS     │
│ • Earnings: Jan 26      │ • Macro       │
│ • AI features rollout   │   headwinds   │
└──────────────────────────────────────────┘
```

---

### Bottom Section: Watchlist

```
┌────────────────────────────────────────────┐
│ 📈 Watchlist                               │
│ Track and analyze your favorite stocks     │
│                                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │  AAPL    │ │  MSFT    │ │  TSLA    │  │
│  │ Apple Inc│ │Microsoft │ │Tesla Inc │  │
│  │Technology│ │Technology│ │Auto/Energy
│  │MC: 2.8T  │ │MC: 2.4T  │ │MC: 900B  │  │
│  │P/E: 28.5 │ │P/E: 32.1 │ │P/E: 65.3 │  │
│  └──────────┘ └──────────┘ └──────────┘  │
│   (Repeat for all 3 stocks)               │
└────────────────────────────────────────────┘
```

---

## 🎮 Interactive Features

### Feature #1: View Stock Quote

**What you see on each stock card:**

```
┌─────────────────────────────────┐
│ AAPL                            │
│ Apple Inc.                      │
│ Technology                      │
│ MC: 2.8T  P/E: 28.5            │
├─────────────────────────────────┤
│                                 │
│ Price Display                   │
│  $189.50                        │
│  📈 +2.30%                      │
│                                 │
│ OHLCV Stats                     │
│  Open: $187.80   High: $190.20 │
│  Low:  $187.00   Vol: 45.0M    │
│                                 │
│ Last updated: 2:30:45 PM       │
│                                 │
├─────────────────────────────────┤
│ ☑ 3 Active Alerts               │
│ 🏷 Earnings Impact ✓            │
│ 🏷 Momentum Shift ✓             │
│ 🏷 Reversal Signal ✓            │
├─────────────────────────────────┤
│ [🤖 Generate Report] [🔔 Alerts]│
└─────────────────────────────────┘
```

**Real-time updates:**
- Price updates every 15 seconds automatically
- Color coding: 📈 Green for up, 📉 Red for down
- Active alerts shown as badges

---

### Feature #2: Generate Report

**Step 1:** Click "🤖 Generate Report" button on any stock

**Step 2:** Report appears in queue (top section)
```
┌──────────────────────────────────┐
│ ⏳ AAPL                      0%   │
│ Requested Jan 15, 2:30 PM        │
│ ▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
└──────────────────────────────────┘
```

**Step 3:** Watch progress bar fill up
```
⏳ 25%  ▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░
⏳ 50%  ▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░
⏳ 75%  ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░
✅ 100% ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

**Step 4:** Report moves to "Completed" section
```
✅ AAPL - Technical & Fundamental Analysis
Completed Jan 15, 2:31 PM
```

**Step 5:** Click to expand and read full analysis

---

### Feature #3: Create Alert

**Step 1:** Click "🔔 Manage Alerts" on any stock

**Step 2:** Alert panel modal opens
```
╔════════════════════════════════════╗
║ Alert Configuration              ✕ ║
╠════════════════════════════════════╣
║ Stock: AAPL                        ║
║ Apple Inc.                         ║
╠════════════════════════════════════╣
║ ➕ Create New Alert                ║
║                                    ║
║ Alert Pattern                      ║
║ [▼ Select Pattern]                 ║
║                                    ║
║ 💡 Select a pattern to see details ║
║                                    ║
║ [✓ Create Alert] (disabled)        ║
╠════════════════════════════════════╣
║ ☑ 3 Active Alerts                  ║
║ ┌────────────────────────────────┐ ║
║ │ Earnings Impact                │ ║
║ │ Threshold: 5%  2024-01-10  [🔔]│ ║
║ └────────────────────────────────┘ ║
│ ┌────────────────────────────────┐ ║
║ │ Momentum Shift                 │ ║
║ │ Threshold: 70   2024-01-08  [🔔]│ ║
║ └────────────────────────────────┘ ║
║ ┌────────────────────────────────┐ ║
║ │ Reversal Signal                │ ║
║ │ Threshold: 12%  2024-01-10  [🔔]│ ║
║ └────────────────────────────────┘ ║
╠════════════════════════════════════╣
║ 💡 Alerts check continuously...    ║
║           [Close]                  ║
╚════════════════════════════════════╝
```

**Step 3:** Click dropdown to select pattern
```
[▼ Select Pattern]
├─ Earnings Impact (Alert when >5% change)
├─ Reversal Signal (Trend reversal signals)
├─ Momentum Shift (RSI overbought/oversold)
├─ Volume Spike (2x average volume)
└─ Support/Resistance (Level breaks)
```

**Step 4:** Select pattern (e.g., "Earnings Impact")
```
Alert Pattern
[▼ Earnings Impact]

💡 Alert when stock price changes >5% 
   around earnings dates

Threshold Value
[5] %
```

**Step 5:** Change threshold if needed, then click "Create Alert"

**Step 6:** New alert appears in list below
```
☑ 4 Active Alerts

┌────────────────────────────────┐
│ ✨ NEW! Earnings Impact        │
│ Threshold: 5%   TODAY      [🔔] [🗑]
└────────────────────────────────┘
```

---

### Feature #4: Manage Alerts

**In the alert panel, you can:**

**Enable/Disable Alert** - Click bell icon
```
[🔔] Alert is enabled (color: active)
[🔕] Alert is disabled (color: faded)
```

**Delete Alert** - Click trash icon
```
[🗑] Removes the alert (confirmation popup)
```

**View Alert Details**
- Pattern name
- Threshold value
- Date created
- Status (enabled/disabled)

---

## 📊 Understanding Alert Patterns

### 1. Earnings Impact
```
📋 Alert when stock price changes by set % around earnings

Configuration:
├─ Pattern: Earnings Impact
├─ Threshold: 5 (%)
└─ Status: Enabled/Disabled

Meaning:
  If AAPL swings ±5% on earnings announcement,
  you get an alert
```

### 2. Reversal Signal
```
📋 Alert on potential trend reversal

Configuration:
├─ Pattern: Reversal Signal
├─ Threshold: 12 (%)
└─ Status: Enabled/Disabled

Meaning:
  When 5-day average crosses 20-day average
  (technical indicator of trend change)
```

### 3. Momentum Shift
```
📋 Alert when RSI crosses overbought/oversold

Configuration:
├─ Pattern: Momentum Shift
├─ Threshold: 70 (RSI level)
└─ Status: Enabled/Disabled

Meaning:
  RSI > 70 = Overbought (could drop)
  RSI < 30 = Oversold (could bounce)
```

### 4. Volume Spike
```
📋 Alert on unusual trading volume

Configuration:
├─ Pattern: Volume Spike
├─ Threshold: 2 (multiplier)
└─ Status: Enabled/Disabled

Meaning:
  Volume is 2x the 20-day average
  (unusual activity, could signal move)
```

### 5. Support/Resistance
```
📋 Alert when price breaks key levels

Configuration:
├─ Pattern: Support/Resistance
├─ Threshold: 10 (% from key levels)
└─ Status: Enabled/Disabled

Meaning:
  Price breaks above resistance or
  below support level
```

---

## ⏱️ What Happens Automatically

### Every 15 Seconds
```
✓ Stock quotes refresh
  - Prices update slightly
  - % changes recalculate
  - Timestamps update
```

### Every 5 Minutes (Backend)
```
✓ Alert checking runs
  - Evaluates all active alerts
  - (Currently logging, not notifying)
  - FUTURE: Send notifications
```

### Every 6 Hours (Backend)
```
✓ Report cleanup
  - Archives old reports
  - Clears temporary files
  - Keeps data fresh
```

---

## 🎨 Color Coding Guide

### Price Changes
```
📈 Green (#00cc00) = Stock going up, positive % change
📉 Red   (#ff3333) = Stock going down, negative % change
```

### Sections
```
Cyan border   = Report Queue section (visually distinct)
Blue buttons  = Primary actions (generate report)
Cyan buttons  = Secondary actions (manage alerts)
Yellow background = Active alerts warning
Green badge  = Alert enabled
Faded badge  = Alert disabled
```

### Status Icons
```
✅ = Report completed
⏳ = Report generating
📋 = Report queued
❌ = Report failed
🔔 = Alert enabled
🔕 = Alert disabled
```

---

## 🔧 Customization Tips

### Change Stocks
Edit `backend/data/mock-data.js`:
```javascript
const STARTER_STOCKS = {
  AAPL: { /* ... */ },
  // Add your own here
  NVDA: { symbol: 'NVDA', name: 'NVIDIA', /* ... */ },
};
```
Restart backend with `npm start`

### Change Update Frequency
Edit `frontend/src/App.jsx`:
```javascript
// Change this line:
}, 15000);  // Currently 15 seconds

// To this (e.g., 5 seconds):
}, 5000);
```

### Add Custom Report Content
Edit `backend/src/services/report-generator.js`:
```javascript
const TECHNICAL_ANALYSES = {
  AAPL: {
    title: 'Your title',
    summary: 'Your summary',
    sections: [ /* ... */ ],
    // ...
  },
  // Add more stocks here
};
```

### Change Alert Patterns
Edit `backend/data/mock-data.js`:
```javascript
const ALERT_PATTERNS = {
  YOUR_PATTERN: {
    id: 'your_pattern',
    name: 'Your Pattern Name',
    description: 'What this alert does',
    category: 'category',
  },
  // ...
};
```

---

## 🐛 Troubleshooting

### Quotes Not Updating
- Check backend is running: `npm start` in backend folder
- Frontend should show "API: Connected" in header
- Wait 15 seconds for auto-refresh

### Report Takes Too Long
- Simulated report generation takes 2-3 seconds
- If longer, check browser console (F12) for errors
- Check backend terminal for error messages

### Alert Won't Create
- Make sure stock exists (only AAPL, MSFT, TSLA for now)
- Make sure alert pattern is selected
- Check browser console (F12) for errors

### Can't Connect to API
- Backend must be running on port 5000
- Frontend must be running on port 3000
- Check terminal where you ran `npm start` for errors
- Try: `npx kill-port 5000` then restart

---

## 📱 Mobile View

App is responsive! Try:
- Resize browser window to see responsive layout
- Watches work on mobile (responsive grid)
- Alert panel adapts to smaller screens

---

## ✨ Next Steps

1. **Explore more** - Try generating multiple reports
2. **Create various alerts** - Test different patterns
3. **Read the code** - Check comments for explanation
4. **Customize** - Add your own stocks/reports
5. **Plan upgrades** - Read ARCHITECTURE.md for integration points

---

## 💡 Pro Tips

1. **Generate multiple reports** - They queue up automatically
2. **Create overlapping alerts** - AAPL can have 5+ alerts
3. **Toggle alerts on/off** - Test without deleting
4. **Watch live updates** - Keep your eye on prices
5. **Read completed reports** - Click to expand for details

---

## 🎯 Summary

You now have a fully functional stock watchlist with:
- ✅ Live quote feeds (mock data)
- ✅ AI-style report generation (async queue)
- ✅ Pattern-based alerts (5 types)
- ✅ Clean, modern UI
- ✅ Real-time updates

**Everything is ready to extend with real data!**

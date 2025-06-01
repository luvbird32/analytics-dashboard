
# 🚀 Quick Start Guide

Get your Analytics Dashboard running in under 5 minutes!

## Prerequisites

- Node.js 18+ and npm
- Modern web browser with IndexedDB support
- Git

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/username/analytics-dashboard.git
cd analytics-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:8080
```

## First Run

On your first visit, the dashboard will:
1. Generate sample data for all charts
2. Initialize storage systems (localStorage, IndexedDB)
3. Set up default preferences and filters

## Key Features to Try

### Real-time Data
- Click the "Live Data" toggle in the header
- Watch charts update every 2 seconds
- Notifications appear for significant changes

### Storage Features
- Change filters - they persist on page reload
- Toggle dark/light theme - preference is saved
- Export data - formats are remembered

### Chart Interactions
- Hover over chart elements for tooltips
- Click legend items to toggle data series
- Use the responsive grid on mobile devices

## Configuration

Create a `.env` file for customization:

```env
# Optional configurations
VITE_ENABLE_REAL_TIME=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_EXPORTS=true
VITE_STORAGE_QUOTA_WARNING=0.8
```

## Next Steps

- [📊 Explore the Chart Gallery](./chart-gallery.md)
- [💾 Learn about Storage Features](./storage-features.md)
- [🏗️ Understand the Architecture](../ARCHITECTURE.md)
- [🚀 Deploy to Production](../DEPLOYMENT.md)

## Troubleshooting

### Common Issues

**Charts not loading?**
- Verify Node.js version (18+ required)
- Clear browser cache and localStorage
- Check browser console for errors

**Storage not working?**
- Ensure browser supports IndexedDB
- Check available storage quota
- Try incognito mode to rule out extensions

**Performance issues?**
- Disable real-time updates temporarily
- Clear stored cache data
- Check bundle size with `npm run build`

Need help? [Report an issue](https://github.com/username/analytics-dashboard/issues) or [join our Discord](https://discord.gg/your-discord).

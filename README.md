
# 📊 Enterprise Analytics Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3+-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646cff.svg)](https://vitejs.dev/)

A comprehensive, real-time analytics dashboard built with modern web technologies. Features 12+ chart types, real-time data streaming, advanced filtering, persistent storage, and enterprise-grade visualization capabilities.

[🚀 Live Demo](https://your-demo-url.com) | [📖 Documentation](./docs/README.md) | [🤝 Contributing](./CONTRIBUTING.md)

## ✨ Key Features

- **📈 12+ Chart Types**: Line, Bar, Area, Pie, Donut, Scatter, Radar, Treemap, Funnel, Gauge, Sankey, Candlestick
- **⚡ Real-time Updates**: Live data streaming with WebSocket support
- **💾 Persistent Storage**: localStorage, IndexedDB, and localforage integration
- **🎨 Modern UI**: Built with shadcn/ui and Tailwind CSS
- **📱 Responsive Design**: Perfect on desktop, tablet, and mobile
- **🌙 Dark/Light Themes**: Automatic theme switching
- **♿ Accessibility**: WCAG 2.1 compliant with keyboard navigation

## 🏁 Quick Start

```bash
# Clone and install
git clone https://github.com/username/analytics-dashboard.git
cd analytics-dashboard
npm install

# Start development
npm run dev
# Open http://localhost:8080

# Build for production
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Base UI components (shadcn/ui)
│   └── dashboard/          # Dashboard components
├── hooks/                  # Custom React hooks
├── services/               # Business logic and data services
├── types/                  # TypeScript definitions
└── utils/                  # Utility functions
```

## 🔧 Technology Stack

### Core
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling

### UI & Charts
- **shadcn/ui** component library
- **Recharts** for data visualization
- **Lucide React** for icons

### Storage & State
- **use-local-storage-state** for simple persistence
- **idb** for IndexedDB operations
- **localforage** for unified storage
- **React Query** for server state

## 📚 Documentation

- [📖 Complete Documentation](./docs/README.md)
- [🏗️ Architecture Guide](./ARCHITECTURE.md)
- [🚀 Deployment Guide](./DEPLOYMENT.md)
- [🔌 API Reference](./API.md)
- [🤝 Contributing Guide](./CONTRIBUTING.md)

## 🚀 Deployment

Deploy to your preferred platform:

- **Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/username/analytics-dashboard)
- **Netlify**: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/username/analytics-dashboard)
- **AWS**: [AWS Deployment Guide](./aws/README.md)
- **Azure**: [Azure Deployment Guide](./azure/README.md)
- **GCP**: [GCP Deployment Guide](./gcp/README.md)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🧪 Testing

```bash
npm test              # Run tests
npm run test:coverage # Test coverage
npm run test:a11y     # Accessibility tests
```

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: < 500KB gzipped
- **Load Time**: < 2s on 3G networks
- **Storage**: Offline-first with intelligent caching

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

<div align="center">
Made with ❤️ by the Analytics Dashboard Team
</div>

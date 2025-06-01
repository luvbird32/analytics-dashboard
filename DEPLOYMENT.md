
# Deployment Guide

This guide covers various deployment options for the Analytics Dashboard with storage capabilities.

## Prerequisites

- Node.js 18+ and npm
- Git
- A modern web browser with IndexedDB support

## Environment Variables

Create a `.env` file in the root directory:

```env
# Optional: Analytics and monitoring
VITE_ANALYTICS_ID=your_analytics_id
VITE_API_BASE_URL=https://your-api.com
VITE_APP_VERSION=1.0.0

# Optional: Feature flags
VITE_ENABLE_REAL_TIME=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_EXPORTS=true
VITE_ENABLE_STORAGE=true

# Optional: Storage configuration
VITE_STORAGE_QUOTA_WARNING=0.8
VITE_CACHE_TTL=86400000
VITE_ENABLE_SERVICE_WORKER=true
```

## Build for Production

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Preview the build locally
npm run preview
```

## Storage Considerations

### Browser Compatibility

The dashboard uses three storage technologies:

```javascript
// Feature detection for storage capabilities
const checkStorageSupport = () => {
  const support = {
    localStorage: typeof Storage !== 'undefined',
    indexedDB: 'indexedDB' in window,
    serviceWorker: 'serviceWorker' in navigator
  };
  
  console.log('Storage support:', support);
  return support;
};
```

### Storage Quotas

Monitor storage usage in production:

```javascript
// Check storage quota
const checkStorageQuota = async () => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    const usageInMB = (estimate.usage / 1024 / 1024).toFixed(2);
    const quotaInMB = (estimate.quota / 1024 / 1024).toFixed(2);
    
    console.log(`Storage usage: ${usageInMB}MB / ${quotaInMB}MB`);
    
    if (estimate.usage / estimate.quota > 0.8) {
      console.warn('Storage quota nearly exceeded');
    }
  }
};
```

## Deployment Options

### 1. Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/username/analytics-dashboard)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables (if needed)
vercel env add VITE_API_BASE_URL
vercel env add VITE_ENABLE_STORAGE
```

**Vercel Configuration (`vercel.json`):**
```json
{
  "build": {
    "env": {
      "VITE_ENABLE_STORAGE": "true"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/username/analytics-dashboard)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

**Netlify Configuration (`netlify.toml`):**
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  VITE_ENABLE_STORAGE = "true"
  VITE_ENABLE_SERVICE_WORKER = "true"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 3. GitHub Pages

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. The included workflow will automatically deploy on push to main

**GitHub Actions Workflow (`.github/workflows/deploy.yml`):**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_ENABLE_STORAGE: true
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4. Docker

```dockerfile
# Multi-stage Dockerfile
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Custom nginx configuration for SPA
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Custom nginx configuration (`nginx.conf`):**
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    # Enable gzip compression
    gzip on;
    gzip_types
        text/plain
        text/css
        text/js
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }
}
```

```bash
# Build and run
docker build -t analytics-dashboard .
docker run -p 80:80 analytics-dashboard
```

### 5. Traditional Web Server

After building, upload the `dist` folder to your web server:

```bash
npm run build
# Upload dist/ folder to your web server
```

**Apache Configuration (`.htaccess`):**
```apache
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
</FilesMatch>
```

## Performance Optimization

### Build Optimization

The project includes several performance optimizations:

- Code splitting with dynamic imports
- Tree shaking for unused code
- Asset optimization and minification
- Gzip compression support
- Service worker for caching (when enabled)

### Storage Optimization

```javascript
// Implement storage cleanup on app initialization
const initializeStorage = async () => {
  // Check storage quota
  await checkStorageQuota();
  
  // Clear expired cache entries
  await clearExpiredCache();
  
  // Optimize storage usage
  await optimizeStorage();
};

const clearExpiredCache = async () => {
  const keys = await localforage.keys();
  const now = Date.now();
  
  for (const key of keys) {
    if (key.startsWith('cache:')) {
      const item = await localforage.getItem(key);
      if (item?.timestamp && now - item.timestamp > item.ttl) {
        await localforage.removeItem(key);
      }
    }
  }
};
```

### Service Worker Integration

```javascript
// Register service worker for offline support
if ('serviceWorker' in navigator && import.meta.env.VITE_ENABLE_SERVICE_WORKER === 'true') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
```

## Monitoring and Analytics

### Storage Monitoring

```javascript
// Monitor storage usage in production
const monitorStorage = async () => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    
    // Send analytics data
    if (window.gtag) {
      window.gtag('event', 'storage_usage', {
        usage_mb: Math.round(estimate.usage / 1024 / 1024),
        quota_mb: Math.round(estimate.quota / 1024 / 1024),
        usage_percentage: Math.round((estimate.usage / estimate.quota) * 100)
      });
    }
  }
};
```

### Performance Monitoring

Consider adding these monitoring tools:

- Google Analytics or Plausible for usage analytics
- Sentry for error tracking
- Web Vitals for performance monitoring
- Custom storage usage tracking

## Security Considerations

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.example.com;
">
```

### Storage Security

- All environment variables starting with `VITE_` are public
- Implement proper CORS policies
- Use HTTPS in production
- Regular dependency updates
- Never store sensitive data in client-side storage

```javascript
// Sanitize data before storing
const sanitizeStorageData = (data) => {
  const { password, token, apiKey, ...safeData } = data;
  return safeData;
};
```

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version (18+ required)
2. **Charts not loading**: Verify recharts dependency
3. **Styles missing**: Ensure Tailwind CSS is properly configured
4. **Environment variables not working**: Check `VITE_` prefix
5. **Storage not working**: Verify browser compatibility and quotas

### Storage Issues

```javascript
// Debug storage issues
const debugStorage = async () => {
  console.log('Storage drivers available:', await localforage.supports(localforage.INDEXEDDB));
  console.log('Current driver:', localforage.driver());
  console.log('Storage config:', localforage.config());
  
  try {
    await localforage.setItem('test', 'value');
    const value = await localforage.getItem('test');
    console.log('Storage test:', value === 'value' ? 'PASS' : 'FAIL');
    await localforage.removeItem('test');
  } catch (error) {
    console.error('Storage test failed:', error);
  }
};
```

### Performance Issues

- Enable production mode
- Check bundle size with `npm run build -- --analyze`
- Implement lazy loading for large datasets
- Optimize chart rendering frequency
- Monitor storage quota usage
- Clear expired cache regularly

## Scaling

For high-traffic deployments:

- Use a CDN for static assets
- Implement server-side caching
- Consider micro-frontend architecture
- Monitor performance metrics
- Implement progressive loading
- Use efficient storage strategies
- Consider implementing data pagination for large datasets

## Progressive Web App (PWA)

To enable PWA features:

1. Ensure service worker is enabled
2. Add web app manifest
3. Implement offline functionality
4. Add installation prompts

```json
// manifest.json
{
  "name": "Analytics Dashboard",
  "short_name": "Analytics",
  "description": "Enterprise Analytics Dashboard",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

This comprehensive deployment guide ensures your analytics dashboard with storage capabilities runs optimally across all platforms.

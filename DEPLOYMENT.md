
# Deployment Guide

This guide covers various deployment options for the Analytics Dashboard.

## Prerequisites

- Node.js 18+ and npm
- Git
- A modern web browser

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

### 3. GitHub Pages

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. The included workflow will automatically deploy on push to main

### 4. Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
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

## Performance Optimization

### Build Optimization

The project includes several performance optimizations:

- Code splitting with dynamic imports
- Tree shaking for unused code
- Asset optimization
- Gzip compression
- Service worker for caching

### Monitoring

Consider adding these monitoring tools:

- Google Analytics or Plausible for usage analytics
- Sentry for error tracking
- Web Vitals for performance monitoring

## Security Considerations

- All environment variables starting with `VITE_` are public
- Implement proper CORS policies
- Use HTTPS in production
- Regular dependency updates
- Content Security Policy headers

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version (18+ required)
2. **Charts not loading**: Verify recharts dependency
3. **Styles missing**: Ensure Tailwind CSS is properly configured
4. **Environment variables not working**: Check `VITE_` prefix

### Performance Issues

- Enable production mode
- Check bundle size with `npm run build -- --analyze`
- Implement lazy loading for large datasets
- Optimize chart rendering frequency

## Scaling

For high-traffic deployments:

- Use a CDN for static assets
- Implement server-side caching
- Consider micro-frontend architecture
- Monitor performance metrics
- Implement progressive loading

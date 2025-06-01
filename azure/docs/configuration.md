
# Azure Configuration Guide

## Environment Variables

Set these in your deployment environment:

### Application Variables
```bash
# Application metadata
export VITE_APP_VERSION=1.0.0
export VITE_ENVIRONMENT=production
export VITE_DEPLOYMENT_TYPE=static

# Build configuration
export NODE_ENV=production
```

### Azure-Specific Variables
```bash
# Azure subscription and resources
export AZURE_SUBSCRIPTION_ID=your-subscription-id
export AZURE_RESOURCE_GROUP=analytics-dashboard-rg
export AZURE_LOCATION="East US 2"

# Container Registry (for container deployments)
export AZURE_CONTAINER_REGISTRY=analyticsdashboardacr
```

### Optional API Configuration
```bash
# External services
export VITE_API_BASE_URL=https://api.yourdomain.com
export VITE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Authentication (if needed)
export VITE_AUTH_DOMAIN=your-auth-domain
export VITE_AUTH_CLIENT_ID=your-client-id
```

## Static Web Apps Configuration

### staticwebapp.config.json
Create in your project root for advanced routing and security:

```json
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    },
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/images/*.{png,jpg,gif}", "/css/*"]
  },
  "responseOverrides": {
    "401": {
      "redirect": "/login",
      "statusCode": 302
    }
  },
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Content-Security-Policy": "default-src 'self'"
  }
}
```

## Container Instance Configuration

### Resource Specifications
```bash
# CPU and Memory allocation
CPU_CORES=1.0
MEMORY_GB=1.5

# For higher traffic
CPU_CORES=2.0
MEMORY_GB=3.5
```

### Docker Build Arguments
```dockerfile
# In azure/docker/Dockerfile
ARG NODE_ENV=production
ARG VITE_APP_VERSION
ARG VITE_ENVIRONMENT
```

## ARM Template Parameters

### Static Web App Parameters
```json
{
  "siteName": "analytics-dashboard",
  "location": "East US 2",
  "repositoryUrl": "https://github.com/yourusername/analytics-dashboard",
  "branch": "main",
  "appLocation": "/",
  "outputLocation": "dist"
}
```

### Container Instance Parameters
```json
{
  "containerGroupName": "analytics-dashboard-cg",
  "containerName": "analytics-dashboard",
  "image": "nginx:alpine",
  "port": 80,
  "cpuCores": "1.0",
  "memoryInGb": "1.5"
}
```

## CI/CD Configuration

### GitHub Actions for Static Web Apps
Static Web Apps automatically creates GitHub Actions workflow when connected.

### GitHub Actions for Container Instances
```yaml
name: Deploy to Azure Container Instances

on:
  push:
    branches: [main]

env:
  AZURE_RESOURCE_GROUP: analytics-dashboard-rg
  CONTAINER_NAME: analytics-dashboard
  REGISTRY_NAME: analyticsdashboardacr

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Login to Azure
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      
      - name: Deploy to Container Instance
        run: ./azure/scripts/deploy-container-instance.sh
```

## Performance Optimization

### Build Configuration
```bash
# Optimize for production
export NODE_ENV=production
export BUILD_OPTIMIZATION=true

# Enable source maps for debugging
export GENERATE_SOURCEMAP=true
```

### Nginx Configuration (for containers)
The nginx.conf includes:
- Gzip compression
- Static asset caching
- Security headers
- Health check endpoint

## Security Configuration

### Required Headers
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security: max-age=31536000`

### Environment-Specific Settings
```bash
# Development
export VITE_DEBUG_MODE=true
export VITE_LOG_LEVEL=debug

# Production
export VITE_DEBUG_MODE=false
export VITE_LOG_LEVEL=error
```

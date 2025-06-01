
# 🐳 Docker Setup Guide

Containerized deployment setup for the Analytics Dashboard.

## 📚 Docker Documentation

### Container Options
- [🅰️ AWS Docker Setup](../aws/docker/)
- [🔷 Azure Container Setup](../azure/docker/)
- [🟡 GCP Cloud Run](../gcp/cloud-run/)

## 🚀 Quick Docker Setup

### Basic Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  analytics-dashboard:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Build and Run

```bash
# Build image
docker build -t analytics-dashboard .

# Run container
docker run -p 80:80 analytics-dashboard

# Using docker-compose
docker-compose up -d
```

## 🔧 Nginx Configuration

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:3000;
    }
}
```

## 📊 Monitoring & Logging

```yaml
# docker-compose.yml with monitoring
version: '3.8'
services:
  analytics-dashboard:
    build: .
    ports:
      - "80:80"
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

For platform-specific Docker setups, see the respective cloud platform documentation.

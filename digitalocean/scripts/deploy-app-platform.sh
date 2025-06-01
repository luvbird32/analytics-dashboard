
#!/bin/bash

# DigitalOcean App Platform Deployment Script
# Usage: ./deploy-app-platform.sh [environment] [app-name]

set -e

ENVIRONMENT=${1:-production}
APP_NAME=${2:-analytics-dashboard}
SPEC_FILE="digitalocean/app-spec.yml"

echo "🚀 Starting DigitalOcean App Platform deployment..."
echo "Environment: $ENVIRONMENT"
echo "App Name: $APP_NAME"

# Check if doctl is installed
if ! command -v doctl &> /dev/null; then
    echo "❌ doctl CLI is not installed. Please install it first:"
    echo "curl -sL https://github.com/digitalocean/doctl/releases/download/v1.94.0/doctl-1.94.0-linux-amd64.tar.gz | tar -xzv"
    exit 1
fi

# Check if user is authenticated
if ! doctl auth list &> /dev/null; then
    echo "❌ DigitalOcean credentials not configured. Run 'doctl auth init' first."
    exit 1
fi

# Build the application
echo "📦 Building application..."
npm ci --only=production
npm run build

# Update app spec with environment
envsubst < "$SPEC_FILE.template" > "$SPEC_FILE"

# Check if app exists
APP_ID=$(doctl apps list --format ID,Spec.Name --no-header | grep "$APP_NAME" | awk '{print $1}' || true)

if [ -n "$APP_ID" ]; then
    echo "🔄 Updating existing app (ID: $APP_ID)..."
    doctl apps update "$APP_ID" --spec "$SPEC_FILE"
else
    echo "🆕 Creating new app..."
    doctl apps create --spec "$SPEC_FILE"
    APP_ID=$(doctl apps list --format ID,Spec.Name --no-header | grep "$APP_NAME" | awk '{print $1}')
fi

echo "⏳ Waiting for deployment to complete..."
doctl apps get "$APP_ID" --wait

# Get app URL
APP_URL=$(doctl apps get "$APP_ID" --format LiveURL --no-header)

echo "✅ Deployment completed successfully!"
echo "🌐 App URL: $APP_URL"
echo "📊 App ID: $APP_ID"
echo "📋 View logs: doctl apps logs $APP_ID --type=build,deploy,run"

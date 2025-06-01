
#!/bin/bash

# Google Cloud App Engine Deployment Script
# Usage: ./deploy-app-engine.sh [environment] [project-id]

set -e

ENVIRONMENT=${1:-production}
PROJECT_ID=${2:-$(gcloud config get-value project)}

echo "🚀 Starting Google Cloud App Engine deployment..."
echo "Environment: $ENVIRONMENT"
echo "Project ID: $PROJECT_ID"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud SDK is not installed. Please install it first:"
    echo "curl https://sdk.cloud.google.com | bash"
    exit 1
fi

# Check if user is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | head -n 1 &> /dev/null; then
    echo "❌ Not authenticated with Google Cloud. Run 'gcloud auth login' first."
    exit 1
fi

# Set the project
gcloud config set project "$PROJECT_ID"

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable appengine.googleapis.com --quiet

# Build the application
echo "📦 Building application..."
npm ci --only=production
npm run build

# Create app.yaml if it doesn't exist
if [ ! -f "gcp/app-engine/app.yaml" ]; then
    echo "📝 Creating app.yaml configuration..."
    mkdir -p gcp/app-engine
    cat > gcp/app-engine/app.yaml << EOF
runtime: nodejs18
service: default

env_variables:
  NODE_ENV: $ENVIRONMENT
  VITE_APP_VERSION: $(npm pkg get version | tr -d '"')
  VITE_DEPLOYMENT_TYPE: app-engine
  VITE_ENVIRONMENT: $ENVIRONMENT

handlers:
- url: /static
  static_dir: dist/assets
  secure: always

- url: /(.*\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot))$
  static_files: dist/\1
  upload: dist/(.*\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot))$
  secure: always

- url: /.*
  static_files: dist/index.html
  upload: dist/index.html
  secure: always

automatic_scaling:
  min_instances: 0
  max_instances: 10
  target_cpu_utilization: 0.6
EOF
fi

# Copy built files to deployment directory
cp -r dist/* gcp/app-engine/ 2>/dev/null || true

# Deploy to App Engine
echo "☁️ Deploying to App Engine..."
gcloud app deploy gcp/app-engine/app.yaml --quiet --no-promote

# Get the deployed URL
APP_URL=$(gcloud app browse --no-launch-browser)

echo "✅ Deployment completed successfully!"
echo "🌐 App URL: $APP_URL"
echo "📊 Project: $PROJECT_ID"
echo "📋 View logs: gcloud app logs tail -s default"

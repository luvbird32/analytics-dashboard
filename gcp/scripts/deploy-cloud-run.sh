
#!/bin/bash

# Google Cloud Run Deployment Script
# Usage: ./deploy-cloud-run.sh [environment] [service-name] [region]

set -e

ENVIRONMENT=${1:-production}
SERVICE_NAME=${2:-analytics-dashboard}
REGION=${3:-us-central1}
PROJECT_ID=$(gcloud config get-value project)
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME:latest"

echo "🚀 Starting Google Cloud Run deployment..."
echo "Environment: $ENVIRONMENT"
echo "Service: $SERVICE_NAME"
echo "Region: $REGION"
echo "Project: $PROJECT_ID"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud SDK is not installed."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed."
    exit 1
fi

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable run.googleapis.com --quiet
gcloud services enable cloudbuild.googleapis.com --quiet

# Configure Docker to use gcloud as a credential helper
gcloud auth configure-docker --quiet

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t "$IMAGE_NAME" -f gcp/cloud-run/Dockerfile .

# Push the image to Google Container Registry
echo "📤 Pushing image to Google Container Registry..."
docker push "$IMAGE_NAME"

# Deploy to Cloud Run
echo "☁️ Deploying to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
    --image "$IMAGE_NAME" \
    --platform managed \
    --region "$REGION" \
    --allow-unauthenticated \
    --set-env-vars "NODE_ENV=$ENVIRONMENT,VITE_ENVIRONMENT=$ENVIRONMENT" \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --quiet

# Get the service URL
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" --region="$REGION" --format="value(status.url)")

echo "✅ Deployment completed successfully!"
echo "🌐 Service URL: $SERVICE_URL"
echo "📊 Service: $SERVICE_NAME"
echo "🌍 Region: $REGION"
echo "📋 View logs: gcloud run logs tail --service=$SERVICE_NAME --region=$REGION"

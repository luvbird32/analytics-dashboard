
# Google Cloud Setup Guide

## Prerequisites

### 1. Install and Configure Google Cloud SDK

```bash
# Install Google Cloud SDK (Linux)
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Install Google Cloud SDK (Windows)
# Download from: https://cloud.google.com/sdk/docs/install

# Install Google Cloud SDK (macOS)
brew install google-cloud-sdk

# Initialize and login
gcloud init
gcloud auth login
```

### 2. Required Tools

Ensure these tools are installed:
- **Google Cloud SDK** - Command line interface for Google Cloud
- **Node.js 18+** and npm - For building the application
- **Docker** - For Cloud Run deployments
- **Git** - For version control

### 3. Google Cloud Project Setup

Create a new project or use an existing one:
```bash
# Create a new project
gcloud projects create analytics-dashboard-project --name="Analytics Dashboard"

# Set the active project
gcloud config set project analytics-dashboard-project

# Enable billing (required for most services)
# This must be done through the Google Cloud Console
```

### 4. Required APIs

Enable the necessary Google Cloud APIs:
```bash
# Core APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com

# App Engine
gcloud services enable appengine.googleapis.com

# Cloud Run
gcloud services enable run.googleapis.com

# Compute Engine
gcloud services enable compute.googleapis.com

# Cloud Storage (for build artifacts)
gcloud services enable storage.googleapis.com
```

### 5. IAM Permissions

Your Google Cloud account needs these roles:
- **App Engine Admin** (for App Engine deployments)
- **Cloud Run Admin** (for Cloud Run deployments)
- **Compute Admin** (for Compute Engine deployments)
- **Storage Admin** (for Cloud Storage)
- **Cloud Build Editor** (for container builds)

## Initial Setup Steps

### 1. Verify Google Cloud Connection
```bash
# Check current configuration
gcloud config list

# List available projects
gcloud projects list

# Check active account
gcloud auth list
```

### 2. Configure Default Settings
```bash
# Set default region and zone
gcloud config set compute/region us-central1
gcloud config set compute/zone us-central1-a

# Set default App Engine region (only needed once per project)
gcloud app create --region=us-central
```

### 3. Set Up Container Registry (for Cloud Run)
```bash
# Configure Docker to use gcloud as credential helper
gcloud auth configure-docker

# Test Docker access
docker pull gcr.io/google-containers/hello-app:1.0
```

### 4. Create Storage Buckets (optional)
```bash
# Create bucket for build artifacts
gsutil mb gs://analytics-dashboard-builds-$(gcloud config get-value project)

# Create bucket for static assets
gsutil mb gs://analytics-dashboard-assets-$(gcloud config get-value project)
```

## Environment-Specific Setup

### Development Environment
```bash
export GOOGLE_CLOUD_PROJECT=analytics-dashboard-dev
export GOOGLE_CLOUD_REGION=us-central1
export ENVIRONMENT=development

# Create separate project for development
gcloud projects create analytics-dashboard-dev --name="Analytics Dashboard Dev"
```

### Production Environment
```bash
export GOOGLE_CLOUD_PROJECT=analytics-dashboard-prod
export GOOGLE_CLOUD_REGION=us-central1
export ENVIRONMENT=production

# Create separate project for production
gcloud projects create analytics-dashboard-prod --name="Analytics Dashboard Prod"
```

## Application-Specific Setup

### App Engine Initialization
```bash
# Initialize App Engine (run once per project)
gcloud app create --region=us-central

# Create app.yaml if needed
cp gcp/app-engine/app.yaml.template gcp/app-engine/app.yaml
```

### Cloud Run Setup
```bash
# No additional setup required
# Cloud Run services are created during first deployment
```

### Compute Engine Setup
```bash
# Create firewall rules for HTTP traffic
gcloud compute firewall-rules create allow-http-8080 \
    --allow tcp:8080 \
    --source-ranges 0.0.0.0/0 \
    --description "Allow HTTP traffic for Analytics Dashboard"
```

## Validation

### Test Google Cloud SDK
```bash
# List all enabled services
gcloud services list --enabled

# Test authentication
gcloud auth application-default print-access-token

# Check quotas
gcloud compute project-info describe --format="table(quotas.metric,quotas.limit,quotas.usage)"
```

### Test Docker (for Cloud Run)
```bash
# Verify Docker installation
docker --version

# Test Google Container Registry access
docker pull gcr.io/google-containers/hello-app:1.0
```

### Build Test
```bash
# Install dependencies
npm ci

# Run tests
npm test

# Build application
npm run build
```

## Troubleshooting

### Common Issues

1. **Permission Denied**: Check IAM roles and API enablement
2. **Quota Exceeded**: Check project quotas in Cloud Console
3. **Docker Authentication**: Run `gcloud auth configure-docker`
4. **App Engine Region**: Can only be set once per project

### Useful Commands
```bash
# View logs
gcloud logging read "resource.type=gce_instance" --limit 50

# Check service status
gcloud services list --enabled

# Debug authentication
gcloud auth list --filter=status:ACTIVE

# Check project billing status
gcloud billing accounts list
```

If all tests pass, you're ready to proceed with deployment!

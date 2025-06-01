
# Google Cloud Platform Deployment Guide

Google Cloud Platform deployment configurations and scripts for the Analytics Dashboard.

## Quick Start

### App Engine (Recommended for Frontend)
```bash
./gcp/scripts/deploy-app-engine.sh production
```

### Cloud Run (Containerized)
```bash
./gcp/scripts/deploy-cloud-run.sh production analytics-dashboard us-central1
```

### Compute Engine (VM)
```bash
./gcp/scripts/deploy-compute-engine.sh analytics-dashboard-vm us-central1-a
```

### Comprehensive Deployment
```bash
./gcp/scripts/build-and-deploy.sh app-engine production
```

## File Structure

```
gcp/
├── app-engine/            # App Engine configurations
├── cloud-run/             # Cloud Run Docker configs
├── compute-engine/        # VM startup scripts
├── scripts/              # Deployment scripts
└── docs/                 # Documentation
```

## Documentation

- [📋 Deployment Options](docs/deployment-options.md) - Compare App Engine vs Cloud Run vs Compute Engine
- [⚙️ Setup Guide](docs/setup-guide.md) - Prerequisites and initial setup
- [🔧 Configuration](docs/configuration.md) - Environment variables and settings
- [📊 Monitoring](docs/monitoring.md) - Logging, monitoring, and troubleshooting
- [🔒 Security](docs/security.md) - Security best practices

## Prerequisites

- Google Cloud SDK (gcloud) installed and configured
- Google Cloud Project with billing enabled
- Node.js 18+ and npm
- Docker (for Cloud Run deployments)

## Quick Setup

```bash
# Install Google Cloud SDK
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Login and set project
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable appengine.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable compute.googleapis.com
```

## Support

For deployment issues:
1. Check gcloud command output
2. Review Google Cloud Console logs
3. Verify IAM permissions
4. Consult detailed documentation in `/docs`

## Additional Resources

- [Google Cloud App Engine Documentation](https://cloud.google.com/appengine/docs)
- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Google Cloud Compute Engine Documentation](https://cloud.google.com/compute/docs)

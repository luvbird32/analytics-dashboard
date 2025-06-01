
# Google Cloud Platform Deployment Documentation

This directory contains comprehensive GCP deployment documentation for the Analytics Dashboard.

## 📚 Documentation Index

- [📋 Deployment Options](./deployment-options.md) - Compare GCP services
- [⚙️ Setup Guide](./setup-guide.md) - Prerequisites and initial setup
- [🔧 Configuration](./configuration.md) - Environment variables and settings

## 🚀 Quick Deployment

### App Engine (Recommended)
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

## 📁 File Structure

```
gcp/
├── app-engine/            # App Engine configurations
├── cloud-run/             # Cloud Run Docker configs
├── compute-engine/        # VM startup scripts
├── scripts/              # Deployment scripts
└── docs/                 # This documentation directory
```

## 🛠️ Available Scripts

- **build-and-deploy.sh**: Complete deployment automation
- **deploy-app-engine.sh**: App Engine deployment
- **deploy-cloud-run.sh**: Cloud Run deployment
- **deploy-compute-engine.sh**: Compute Engine VM deployment

## 📖 Additional Resources

- [Google Cloud App Engine Documentation](https://cloud.google.com/appengine/docs)
- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Google Cloud Compute Engine Documentation](https://cloud.google.com/compute/docs)

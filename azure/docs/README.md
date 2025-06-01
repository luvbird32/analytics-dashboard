
# Azure Deployment Documentation

This directory contains comprehensive Azure deployment documentation for the Analytics Dashboard.

## 📚 Documentation Index

- [📋 Deployment Options](./deployment-options.md) - Compare Azure services
- [⚙️ Setup Guide](./setup-guide.md) - Prerequisites and initial setup
- [🔧 Configuration](./configuration.md) - Environment variables and settings
- [📊 Monitoring](./monitoring.md) - Logging and troubleshooting
- [🔒 Security](./security.md) - Security best practices

## 🚀 Quick Deployment

### Static Web Apps (Recommended)
```bash
./azure/scripts/deploy-static-web-app.sh analytics-dashboard-rg analytics-dashboard "East US 2"
```

### Container Instances
```bash
./azure/scripts/deploy-container-instance.sh analytics-dashboard-rg analytics-dashboard analyticsdashboardacr
```

## 📁 File Structure

```
azure/
├── arm-templates/          # ARM deployment templates
├── docker/                 # Docker configurations
├── scripts/               # Deployment scripts
└── docs/                  # This documentation directory
```

## 🛠️ Available Scripts

- **build-and-deploy.sh**: Complete deployment automation
- **deploy-static-web-app.sh**: Static Web Apps deployment
- **deploy-container-instance.sh**: Container instance deployment

## 📖 Additional Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Azure Container Instances Documentation](https://docs.microsoft.com/en-us/azure/container-instances/)
- [Azure CLI Reference](https://docs.microsoft.com/en-us/cli/azure/)


# Azure Deployment Guide

Microsoft Azure deployment configurations and scripts for the Analytics Dashboard.

## Quick Start

### Static Web Apps (Recommended)
```bash
./azure/scripts/deploy-static-web-app.sh analytics-dashboard-rg analytics-dashboard "East US 2"
```

### Container Instances
```bash
./azure/scripts/deploy-container-instance.sh analytics-dashboard-rg analytics-dashboard analyticsdashboardacr
```

### Comprehensive Deployment
```bash
./azure/scripts/build-and-deploy.sh static production
```

## File Structure

```
azure/
├── arm-templates/          # ARM deployment templates
├── docker/                 # Docker configurations
├── scripts/               # Deployment scripts
└── docs/                  # Documentation
```

## Documentation

- [📋 Deployment Options](docs/deployment-options.md) - Compare Static Web Apps vs Container Instances
- [⚙️ Setup Guide](docs/setup-guide.md) - Prerequisites and initial setup
- [🔧 Configuration](docs/configuration.md) - Environment variables and settings
- [📊 Monitoring](docs/monitoring.md) - Logging, monitoring, and troubleshooting
- [🔒 Security](docs/security.md) - Security best practices

## Prerequisites

- Azure CLI installed and configured
- Azure subscription with appropriate permissions
- Node.js 18+ and npm
- Docker (for container deployments)
- GitHub repository (for Static Web Apps)

## Support

For deployment issues:
1. Check Azure CLI command output
2. Review Azure Portal activity logs
3. Verify resource permissions
4. Consult detailed documentation in `/docs`

## Additional Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Azure Container Instances Documentation](https://docs.microsoft.com/en-us/azure/container-instances/)
- [Azure CLI Reference](https://docs.microsoft.com/en-us/cli/azure/)

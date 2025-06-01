
# Azure Deployment Guide

This directory contains Microsoft Azure deployment configurations and scripts for the Analytics Dashboard.

## Deployment Options

### 1. Static Web Apps (Recommended for Frontend-Only)

**Best for**: Static hosting with serverless APIs and global CDN

```bash
# Quick deployment
./azure/scripts/deploy-static-web-app.sh analytics-dashboard-rg analytics-dashboard "East US 2"

# Or use the comprehensive script
./azure/scripts/build-and-deploy.sh static production
```

**Features**:
- Global CDN distribution
- Automatic SSL certificates
- Built-in CI/CD with GitHub
- Serverless API support
- Custom domain support

### 2. Container Instances (For Containerized Deployment)

**Best for**: Containerized applications with full control

```bash
# Deploy container instance
./azure/scripts/deploy-container-instance.sh analytics-dashboard-rg analytics-dashboard analyticsdashboardacr

# Or use the comprehensive script
./azure/scripts/build-and-deploy.sh container production
```

**Features**:
- Serverless containers
- Azure Container Registry integration
- Public IP and DNS
- Custom configurations

## Prerequisites

1. **Azure CLI** installed and configured
2. **Azure subscription** with appropriate permissions
3. **Docker** installed (for container deployments)
4. **Node.js 18+** and npm
5. **GitHub repository** (for Static Web Apps)

## Setup Instructions

### 1. Install and Configure Azure CLI

```bash
# Install Azure CLI (Linux)
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Install Azure CLI (Windows)
# Download from: https://aka.ms/installazurecliwindows

# Install Azure CLI (macOS)
brew install azure-cli

# Login to Azure
az login
```

### 2. Set Required Permissions

Your Azure account needs these permissions:
- Contributor role on the subscription
- Static Web Apps Contributor (for Static Web Apps)
- Container Instance Contributor (for Container Instances)
- Azure Container Registry Contributor (for ACR)

### 3. Configure Repository

For Static Web Apps, update the repository URL in:
- `azure/arm-templates/static-web-app.json`

Replace `username/analytics-dashboard` with your actual repository.

## File Structure

```
azure/
├── arm-templates/
│   ├── static-web-app.json        # Static Web Apps ARM template
│   └── container-instance.json    # Container Instance ARM template
├── docker/
│   ├── Dockerfile                 # Multi-stage Docker build
│   └── nginx.conf                 # Nginx configuration
├── scripts/
│   ├── deploy-static-web-app.sh   # Static Web Apps deployment
│   ├── deploy-container-instance.sh # Container Instance deployment
│   └── build-and-deploy.sh        # Comprehensive deployment
└── README.md                      # This file
```

## Environment Variables

Set these in your deployment environment:

```bash
# Application
export VITE_APP_VERSION=1.0.0
export VITE_ENVIRONMENT=production

# Azure specific
export AZURE_SUBSCRIPTION_ID=your-subscription-id
export AZURE_RESOURCE_GROUP=analytics-dashboard-rg

# Optional: API endpoints
export VITE_API_BASE_URL=https://api.yourdomain.com
export VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

## Available Regions

Popular Azure regions:
- `East US`, `East US 2` - Eastern United States
- `West US 2`, `West US 3` - Western United States
- `Central US` - Central United States
- `North Europe` - Ireland
- `West Europe` - Netherlands
- `Southeast Asia` - Singapore
- `East Asia` - Hong Kong

## Pricing Estimation

### Static Web Apps
- **Free tier**: 100GB bandwidth, 0.5GB storage
- **Standard tier**: $9/month + usage-based pricing

### Container Instances
- **1 vCPU, 1.5GB RAM**: ~$30/month
- **2 vCPU, 3.5GB RAM**: ~$60/month
- **Storage**: $0.10/GB/month

### Azure Container Registry
- **Basic**: $5/month + $0.10/GB storage
- **Standard**: $20/month + $0.10/GB storage

## Custom Domain Setup

### For Static Web Apps

1. Deploy your app
2. Go to Azure Portal → Static Web Apps
3. Navigate to "Custom domains"
4. Add your custom domain
5. Configure DNS records as instructed

### For Container Instances

```bash
# Container instances get a public FQDN automatically
# Format: {dns-label}.{region}.azurecontainer.io

# For custom domains, use Azure Application Gateway or CDN
```

## Monitoring and Logs

### Static Web Apps
```bash
# View application insights (if configured)
az monitor app-insights component show --app analytics-dashboard --resource-group analytics-dashboard-rg

# View activity logs
az monitor activity-log list --resource-group analytics-dashboard-rg
```

### Container Instances
```bash
# View container logs
az container logs --resource-group analytics-dashboard-rg --name analytics-dashboard-cg

# Stream logs
az container logs --resource-group analytics-dashboard-rg --name analytics-dashboard-cg --follow

# Get container details
az container show --resource-group analytics-dashboard-rg --name analytics-dashboard-cg
```

## Security Best Practices

1. **Use managed identities** when possible
2. **Enable Azure Key Vault** for secrets
3. **Configure network security groups**
4. **Enable Azure Security Center**
5. **Regular security updates**
6. **Use Azure AD** for authentication

## Scaling Considerations

### Static Web Apps
- Automatically scales globally
- No infrastructure management
- Built-in CDN distribution

### Container Instances
```bash
# Scale by creating multiple instances behind a load balancer
az network application-gateway create \
    --name analytics-dashboard-appgw \
    --resource-group analytics-dashboard-rg \
    --location "East US"
```

## CI/CD Integration

### GitHub Actions for Static Web Apps

Static Web Apps automatically creates GitHub Actions workflow when connected.

### GitHub Actions for Container Instances

```yaml
# Example workflow file
name: Deploy to Azure Container Instances

on:
  push:
    branches: [main]

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

## Troubleshooting

### Common Issues

1. **Azure CLI not authenticated**
   ```bash
   az login
   az account set --subscription YOUR_SUBSCRIPTION_ID
   ```

2. **Resource group creation fails**
   ```bash
   # Check available locations
   az account list-locations --output table
   ```

3. **Container registry access denied**
   ```bash
   # Enable admin user
   az acr update --name YOUR_REGISTRY --admin-enabled true
   ```

4. **Static Web App build fails**
   ```bash
   # Check GitHub Actions logs in repository
   # Verify build configuration in staticwebapp.config.json
   ```

### Performance Issues

- Use Azure CDN for better global performance
- Enable compression in Static Web Apps
- Optimize Docker image size
- Use multi-region deployment for high availability

## Support

For issues with Azure deployment:
1. Check Azure CLI command output
2. Review Azure Portal activity logs
3. Verify resource permissions
4. Consult Azure documentation
5. Use Azure Support if needed

## Additional Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Azure Container Instances Documentation](https://docs.microsoft.com/en-us/azure/container-instances/)
- [Azure CLI Reference](https://docs.microsoft.com/en-us/cli/azure/)
- [Azure ARM Templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/)

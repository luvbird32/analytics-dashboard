
# Azure Deployment Options

## 1. Static Web Apps (Recommended for Frontend-Only)

**Best for**: Static hosting with serverless APIs and global CDN

### Features
- Global CDN distribution
- Automatic SSL certificates
- Built-in CI/CD with GitHub
- Serverless API support
- Custom domain support

### Deployment
```bash
# Quick deployment
./azure/scripts/deploy-static-web-app.sh analytics-dashboard-rg analytics-dashboard "East US 2"

# Using comprehensive script
./azure/scripts/build-and-deploy.sh static production
```

### Pricing
- **Free tier**: 100GB bandwidth, 0.5GB storage
- **Standard tier**: $9/month + usage-based pricing

### Custom Domain Setup
1. Deploy your app
2. Go to Azure Portal → Static Web Apps
3. Navigate to "Custom domains"
4. Add your custom domain
5. Configure DNS records as instructed

## 2. Container Instances (For Containerized Deployment)

**Best for**: Containerized applications with full control

### Features
- Serverless containers
- Azure Container Registry integration
- Public IP and DNS
- Custom configurations

### Deployment
```bash
# Deploy container instance
./azure/scripts/deploy-container-instance.sh analytics-dashboard-rg analytics-dashboard analyticsdashboardacr

# Using comprehensive script
./azure/scripts/build-and-deploy.sh container production
```

### Pricing
- **1 vCPU, 1.5GB RAM**: ~$30/month
- **2 vCPU, 3.5GB RAM**: ~$60/month
- **Storage**: $0.10/GB/month

### Custom Domain
Container instances get a public FQDN automatically:
- Format: `{dns-label}.{region}.azurecontainer.io`
- For custom domains, use Azure Application Gateway or CDN

## Azure Container Registry

### Pricing
- **Basic**: $5/month + $0.10/GB storage
- **Standard**: $20/month + $0.10/GB storage

## Available Regions

Popular Azure regions:
- `East US`, `East US 2` - Eastern United States
- `West US 2`, `West US 3` - Western United States
- `Central US` - Central United States
- `North Europe` - Ireland
- `West Europe` - Netherlands
- `Southeast Asia` - Singapore
- `East Asia` - Hong Kong

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

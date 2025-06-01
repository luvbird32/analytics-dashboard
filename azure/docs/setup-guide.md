
# Azure Setup Guide

## Prerequisites

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

### 2. Required Tools

Ensure these tools are installed:
- **Azure CLI** - Azure command line interface
- **Node.js 18+** and npm - For building the application
- **Docker** - For container deployments
- **Git** - For version control and GitHub integration

### 3. Azure Permissions

Your Azure account needs these permissions:
- Contributor role on the subscription
- Static Web Apps Contributor (for Static Web Apps)
- Container Instance Contributor (for Container Instances)
- Azure Container Registry Contributor (for ACR)

### 4. Repository Configuration

For Static Web Apps, update the repository URL in:
- `azure/arm-templates/static-web-app.json`

Replace `username/analytics-dashboard` with your actual repository.

## Initial Setup Steps

### 1. Verify Azure Connection
```bash
# Check if logged in
az account show

# List available subscriptions
az account list --output table

# Set active subscription
az account set --subscription YOUR_SUBSCRIPTION_ID
```

### 2. Create Resource Groups
```bash
# Development environment
az group create --name analytics-dashboard-dev-rg --location "East US 2"

# Production environment
az group create --name analytics-dashboard-prod-rg --location "East US 2"
```

### 3. Set Up Container Registry (if using containers)
```bash
# Create registry
az acr create \
    --resource-group analytics-dashboard-rg \
    --name analyticsdashboardacr \
    --sku Basic \
    --admin-enabled true
```

### 4. Configure GitHub Integration (for Static Web Apps)
1. Fork or create the repository
2. Update repository URL in ARM templates
3. Ensure GitHub Actions workflows are enabled

## Environment-Specific Setup

### Development Environment
```bash
export AZURE_RESOURCE_GROUP=analytics-dashboard-dev-rg
export AZURE_LOCATION="East US 2"
export ENVIRONMENT=development
```

### Production Environment
```bash
export AZURE_RESOURCE_GROUP=analytics-dashboard-prod-rg
export AZURE_LOCATION="East US 2"
export ENVIRONMENT=production
```

## Validation

### Test Azure CLI Connection
```bash
# List resource groups
az group list --output table

# Check available regions
az account list-locations --output table

# Verify permissions
az role assignment list --assignee $(az account show --query user.name --output tsv)
```

### Test Docker (if using containers)
```bash
# Verify Docker installation
docker --version

# Test Docker daemon
docker run hello-world
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

If all tests pass, you're ready to proceed with deployment!


#!/bin/bash

# Azure Static Web Apps Deployment Script
# Usage: ./deploy-static-web-app.sh [resource-group] [app-name] [location]

set -e

RESOURCE_GROUP=${1:-analytics-dashboard-rg}
APP_NAME=${2:-analytics-dashboard}
LOCATION=${3:-"East US 2"}
TEMPLATE_FILE="azure/arm-templates/static-web-app.json"

echo "🚀 Starting Azure Static Web Apps deployment..."
echo "Resource Group: $RESOURCE_GROUP"
echo "App Name: $APP_NAME"
echo "Location: $LOCATION"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed. Please install it first:"
    echo "https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Check if user is logged in
if ! az account show &> /dev/null; then
    echo "❌ Not logged in to Azure. Please run 'az login' first."
    exit 1
fi

# Get current subscription
SUBSCRIPTION=$(az account show --query id --output tsv)
echo "📋 Using subscription: $SUBSCRIPTION"

# Create resource group if it doesn't exist
echo "🏗️ Creating resource group..."
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --output table

# Build the application
echo "📦 Building application..."
npm ci
npm run build

# Deploy ARM template
echo "☁️ Deploying Static Web App..."
DEPLOYMENT_NAME="static-web-app-$(date +%Y%m%d-%H%M%S)"

az deployment group create \
    --resource-group "$RESOURCE_GROUP" \
    --template-file "$TEMPLATE_FILE" \
    --parameters \
        siteName="$APP_NAME" \
        location="$LOCATION" \
    --name "$DEPLOYMENT_NAME" \
    --output table

# Get deployment outputs
echo "📋 Getting deployment information..."
STATIC_WEB_APP_URL=$(az deployment group show \
    --resource-group "$RESOURCE_GROUP" \
    --name "$DEPLOYMENT_NAME" \
    --query 'properties.outputs.staticWebAppUrl.value' \
    --output tsv)

STATIC_WEB_APP_NAME=$(az deployment group show \
    --resource-group "$RESOURCE_GROUP" \
    --name "$DEPLOYMENT_NAME" \
    --query 'properties.outputs.staticWebAppName.value' \
    --output tsv)

echo "✅ Static Web App deployment completed!"
echo "🌐 App URL: https://$STATIC_WEB_APP_URL"
echo "📊 App Name: $STATIC_WEB_APP_NAME"
echo "📋 Resource Group: $RESOURCE_GROUP"
echo ""
echo "🔗 To connect your GitHub repository:"
echo "1. Go to Azure Portal"
echo "2. Navigate to your Static Web App"
echo "3. Configure GitHub integration in the 'Configuration' section"

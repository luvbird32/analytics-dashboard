
#!/bin/bash

# Azure Container Instance Deployment Script
# Usage: ./deploy-container-instance.sh [resource-group] [container-name] [registry-name]

set -e

RESOURCE_GROUP=${1:-analytics-dashboard-rg}
CONTAINER_NAME=${2:-analytics-dashboard}
REGISTRY_NAME=${3:-analyticsdashboardacr}
LOCATION=${4:-"East US"}
IMAGE_TAG=${5:-latest}

echo "🚀 Starting Azure Container Instance deployment..."
echo "Resource Group: $RESOURCE_GROUP"
echo "Container Name: $CONTAINER_NAME"
echo "Registry Name: $REGISTRY_NAME"
echo "Location: $LOCATION"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed. Please install it first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install it first."
    exit 1
fi

# Check if user is logged in
if ! az account show &> /dev/null; then
    echo "❌ Not logged in to Azure. Please run 'az login' first."
    exit 1
fi

# Create resource group if it doesn't exist
echo "🏗️ Creating resource group..."
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --output table

# Create Azure Container Registry
echo "🏗️ Creating Azure Container Registry..."
az acr create \
    --resource-group "$RESOURCE_GROUP" \
    --name "$REGISTRY_NAME" \
    --sku Basic \
    --admin-enabled true \
    --location "$LOCATION" \
    --output table || echo "Registry already exists"

# Get ACR login server
ACR_LOGIN_SERVER=$(az acr show --name "$REGISTRY_NAME" --query loginServer --output tsv)
echo "🔐 ACR Login Server: $ACR_LOGIN_SERVER"

# Login to ACR
echo "🔐 Logging into Azure Container Registry..."
az acr login --name "$REGISTRY_NAME"

# Build and push Docker image
echo "📦 Building Docker image..."
IMAGE_NAME="$ACR_LOGIN_SERVER/$CONTAINER_NAME:$IMAGE_TAG"
docker build -t "$IMAGE_NAME" -f azure/docker/Dockerfile .

echo "📤 Pushing image to ACR..."
docker push "$IMAGE_NAME"

# Get ACR credentials
ACR_USERNAME=$(az acr credential show --name "$REGISTRY_NAME" --query username --output tsv)
ACR_PASSWORD=$(az acr credential show --name "$REGISTRY_NAME" --query passwords[0].value --output tsv)

# Deploy container instance
echo "🐳 Deploying container instance..."
az deployment group create \
    --resource-group "$RESOURCE_GROUP" \
    --template-file azure/arm-templates/container-instance.json \
    --parameters \
        containerGroupName="$CONTAINER_NAME-cg" \
        containerName="$CONTAINER_NAME" \
        image="$IMAGE_NAME" \
        location="$LOCATION" \
    --output table

# Get container instance details
CONTAINER_IP=$(az container show \
    --resource-group "$RESOURCE_GROUP" \
    --name "$CONTAINER_NAME-cg" \
    --query ipAddress.ip \
    --output tsv)

CONTAINER_FQDN=$(az container show \
    --resource-group "$RESOURCE_GROUP" \
    --name "$CONTAINER_NAME-cg" \
    --query ipAddress.fqdn \
    --output tsv)

echo "✅ Container Instance deployment completed!"
echo "🌐 Container IP: $CONTAINER_IP"
echo "🔗 Container FQDN: http://$CONTAINER_FQDN"
echo "🐳 Image: $IMAGE_NAME"
echo "📊 Container Group: $CONTAINER_NAME-cg"

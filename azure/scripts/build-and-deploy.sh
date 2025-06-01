
#!/bin/bash

# Complete Azure deployment script with environment setup
# Usage: ./build-and-deploy.sh [static|container] [environment] [additional-params...]

set -e

DEPLOYMENT_TYPE=${1:-static}
ENVIRONMENT=${2:-production}

echo "🎯 Analytics Dashboard Azure Deployment"
echo "========================================"
echo "Deployment Type: $DEPLOYMENT_TYPE"
echo "Environment: $ENVIRONMENT"
echo ""

# Validate deployment type
if [[ "$DEPLOYMENT_TYPE" != "static" && "$DEPLOYMENT_TYPE" != "container" ]]; then
    echo "❌ Invalid deployment type. Use 'static' or 'container'"
    exit 1
fi

# Check prerequisites
echo "🔍 Checking prerequisites..."

# Check if required tools are installed
for tool in az npm; do
    if ! command -v $tool &> /dev/null; then
        echo "❌ $tool is not installed"
        exit 1
    fi
done

# Check Docker for container deployment
if [[ "$DEPLOYMENT_TYPE" == "container" ]] && ! command -v docker &> /dev/null; then
    echo "❌ Docker is required for container deployment"
    exit 1
fi

# Verify Azure credentials
if ! az account show &> /dev/null; then
    echo "❌ Azure credentials not configured. Run 'az login'"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Set environment variables
export NODE_ENV=production
export VITE_APP_VERSION=$(npm pkg get version | tr -d '"')
export VITE_DEPLOYMENT_TYPE=$DEPLOYMENT_TYPE
export VITE_ENVIRONMENT=$ENVIRONMENT

# Run tests before deployment
echo "🧪 Running tests..."
npm test -- --run --reporter=verbose

echo "✅ Tests passed"
echo ""

# Deploy based on type
case $DEPLOYMENT_TYPE in
    "static")
        echo "🌐 Deploying to Static Web Apps..."
        shift 2  # Remove first two arguments
        ./azure/scripts/deploy-static-web-app.sh \
            "analytics-dashboard-${ENVIRONMENT}-rg" \
            "analytics-dashboard-${ENVIRONMENT}" \
            "East US 2" \
            "$@"
        ;;
    "container")
        echo "🐳 Deploying to Container Instances..."
        shift 2  # Remove first two arguments
        ./azure/scripts/deploy-container-instance.sh \
            "analytics-dashboard-${ENVIRONMENT}-rg" \
            "analytics-dashboard-${ENVIRONMENT}" \
            "analyticsdashboard${ENVIRONMENT}acr" \
            "East US" \
            "$@"
        ;;
esac

echo ""
echo "🎉 Deployment completed successfully!"
echo "📅 Deployed at: $(date)"
echo "🏷️ Version: $VITE_APP_VERSION"

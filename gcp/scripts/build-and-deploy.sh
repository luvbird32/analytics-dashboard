
#!/bin/bash

# Complete Google Cloud deployment script with environment setup
# Usage: ./build-and-deploy.sh [app-engine|cloud-run|compute-engine] [environment] [additional-params...]

set -e

DEPLOYMENT_TYPE=${1:-app-engine}
ENVIRONMENT=${2:-production}

echo "🎯 Analytics Dashboard Google Cloud Deployment"
echo "=============================================="
echo "Deployment Type: $DEPLOYMENT_TYPE"
echo "Environment: $ENVIRONMENT"
echo ""

# Validate deployment type
if [[ "$DEPLOYMENT_TYPE" != "app-engine" && "$DEPLOYMENT_TYPE" != "cloud-run" && "$DEPLOYMENT_TYPE" != "compute-engine" ]]; then
    echo "❌ Invalid deployment type. Use 'app-engine', 'cloud-run', or 'compute-engine'"
    exit 1
fi

# Check prerequisites
echo "🔍 Checking prerequisites..."

# Check if required tools are installed
for tool in gcloud npm; do
    if ! command -v $tool &> /dev/null; then
        echo "❌ $tool is not installed"
        exit 1
    fi
done

# Check Docker for Cloud Run
if [[ "$DEPLOYMENT_TYPE" == "cloud-run" ]] && ! command -v docker &> /dev/null; then
    echo "❌ Docker is required for Cloud Run deployment"
    exit 1
fi

# Verify Google Cloud credentials
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | head -n 1 &> /dev/null; then
    echo "❌ Google Cloud credentials not configured"
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
    "app-engine")
        echo "🌐 Deploying to App Engine..."
        shift 2  # Remove first two arguments
        ./gcp/scripts/deploy-app-engine.sh "$ENVIRONMENT" "$@"
        ;;
    "cloud-run")
        echo "🐳 Deploying to Cloud Run..."
        shift 2  # Remove first two arguments
        ./gcp/scripts/deploy-cloud-run.sh "$ENVIRONMENT" "$@"
        ;;
    "compute-engine")
        echo "🖥️ Deploying to Compute Engine..."
        shift 2  # Remove first two arguments
        ./gcp/scripts/deploy-compute-engine.sh "$@"
        ;;
esac

echo ""
echo "🎉 Deployment completed successfully!"
echo "📅 Deployed at: $(date)"
echo "🏷️ Version: $VITE_APP_VERSION"

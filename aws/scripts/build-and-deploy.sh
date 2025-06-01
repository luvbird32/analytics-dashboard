
#!/bin/bash

# Complete AWS deployment script with environment setup
# Usage: ./build-and-deploy.sh [s3|ecs] [environment] [additional-params...]

set -e

DEPLOYMENT_TYPE=${1:-s3}
ENVIRONMENT=${2:-production}

echo "🎯 Analytics Dashboard AWS Deployment"
echo "======================================="
echo "Deployment Type: $DEPLOYMENT_TYPE"
echo "Environment: $ENVIRONMENT"
echo ""

# Validate deployment type
if [[ "$DEPLOYMENT_TYPE" != "s3" && "$DEPLOYMENT_TYPE" != "ecs" ]]; then
    echo "❌ Invalid deployment type. Use 's3' or 'ecs'"
    exit 1
fi

# Check prerequisites
echo "🔍 Checking prerequisites..."

# Check if required tools are installed
for tool in aws npm docker; do
    if ! command -v $tool &> /dev/null; then
        echo "❌ $tool is not installed"
        exit 1
    fi
done

# Verify AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured"
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
    "s3")
        echo "🌐 Deploying to S3 + CloudFront..."
        shift 2  # Remove first two arguments
        ./aws/scripts/deploy-s3.sh "$ENVIRONMENT" "$@"
        ;;
    "ecs")
        echo "🐳 Deploying to ECS Fargate..."
        shift 2  # Remove first two arguments
        ./aws/scripts/deploy-ecs.sh "$ENVIRONMENT" "$@"
        ;;
esac

echo ""
echo "🎉 Deployment completed successfully!"
echo "📅 Deployed at: $(date)"
echo "🏷️ Version: $VITE_APP_VERSION"

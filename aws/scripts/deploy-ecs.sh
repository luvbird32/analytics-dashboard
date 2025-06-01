
#!/bin/bash

# AWS ECS Fargate Deployment Script
# Usage: ./deploy-ecs.sh [environment] [image-tag]

set -e

ENVIRONMENT=${1:-production}
IMAGE_TAG=${2:-latest}
STACK_NAME="analytics-dashboard-ecs-${ENVIRONMENT}"
ECR_REPO="analytics-dashboard"

echo "🚀 Starting AWS ECS Fargate deployment..."
echo "Environment: $ENVIRONMENT"
echo "Image Tag: $IMAGE_TAG"
echo "Stack: $STACK_NAME"

# Get AWS account ID and region
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION=$(aws configure get region)
IMAGE_URI="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$ECR_REPO:$IMAGE_TAG"

echo "📦 Building Docker image..."
docker build -t "$ECR_REPO:$IMAGE_TAG" -f aws/docker/Dockerfile .

# Create ECR repository if it doesn't exist
echo "🏗️ Ensuring ECR repository exists..."
aws ecr describe-repositories --repository-names "$ECR_REPO" 2>/dev/null || \
aws ecr create-repository --repository-name "$ECR_REPO"

# Login to ECR
echo "🔐 Logging into ECR..."
aws ecr get-login-password --region "$REGION" | \
docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"

# Tag and push image
echo "📤 Pushing image to ECR..."
docker tag "$ECR_REPO:$IMAGE_TAG" "$IMAGE_URI"
docker push "$IMAGE_URI"

# Deploy CloudFormation stack
echo "☁️ Deploying ECS stack..."
aws cloudformation deploy \
    --template-file aws/cloudformation/ecs-fargate.yml \
    --stack-name "$STACK_NAME" \
    --parameter-overrides \
        Environment="$ENVIRONMENT" \
        ImageUri="$IMAGE_URI" \
    --capabilities CAPABILITY_IAM \
    --no-fail-on-empty-changeset

echo "✅ ECS deployment completed successfully!"
echo "🐳 Image: $IMAGE_URI"
echo "📊 Stack: $STACK_NAME"


#!/bin/bash

# AWS S3 + CloudFront Deployment Script
# Usage: ./deploy-s3.sh [environment] [domain-name]

set -e

ENVIRONMENT=${1:-production}
DOMAIN_NAME=${2:-analytics-dashboard.example.com}
STACK_NAME="analytics-dashboard-${ENVIRONMENT}"
BUCKET_PREFIX="analytics-dashboard-static"

echo "🚀 Starting AWS S3 + CloudFront deployment..."
echo "Environment: $ENVIRONMENT"
echo "Domain: $DOMAIN_NAME"
echo "Stack: $STACK_NAME"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if user is authenticated
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Run 'aws configure' first."
    exit 1
fi

# Build the application
echo "📦 Building application..."
npm run build

# Deploy CloudFormation stack
echo "☁️ Deploying CloudFormation stack..."
aws cloudformation deploy \
    --template-file aws/cloudformation/s3-cloudfront.yml \
    --stack-name "$STACK_NAME" \
    --parameter-overrides \
        Environment="$ENVIRONMENT" \
        DomainName="$DOMAIN_NAME" \
        BucketName="$BUCKET_PREFIX" \
    --capabilities CAPABILITY_IAM \
    --no-fail-on-empty-changeset

# Get stack outputs
echo "📋 Getting stack outputs..."
BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
    --output text)

DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
    --output text)

CLOUDFRONT_DOMAIN=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDomainName`].OutputValue' \
    --output text)

echo "📤 Uploading files to S3..."
aws s3 sync dist/ "s3://$BUCKET_NAME" --delete --cache-control "max-age=31536000"

# Upload index.html with no-cache
aws s3 cp dist/index.html "s3://$BUCKET_NAME/index.html" --cache-control "no-cache"

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/*" > /dev/null

echo "✅ Deployment completed successfully!"
echo "🌐 CloudFront URL: https://$CLOUDFRONT_DOMAIN"
echo "🏠 Custom Domain: https://$DOMAIN_NAME (if DNS is configured)"
echo "📊 Stack: $STACK_NAME"

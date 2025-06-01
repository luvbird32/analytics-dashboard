
# AWS Deployment Guide

This directory contains AWS deployment configurations and scripts for the Analytics Dashboard.

## Deployment Options

### 1. S3 + CloudFront (Recommended for Static Hosting)

**Best for**: Static hosting with global CDN distribution

```bash
# Quick deployment
./aws/scripts/deploy-s3.sh production analytics-dashboard.yourdomain.com

# Or use the comprehensive script
./aws/scripts/build-and-deploy.sh s3 production analytics-dashboard.yourdomain.com
```

**Features**:
- Global CDN with CloudFront
- Automatic SSL/TLS certificates
- High availability and scalability
- Cost-effective for static content

### 2. ECS Fargate (For Containerized Deployment)

**Best for**: Containerized deployments with advanced features

```bash
# Deploy to ECS
./aws/scripts/deploy-ecs.sh production latest

# Or use the comprehensive script
./aws/scripts/build-and-deploy.sh ecs production latest
```

**Features**:
- Fully managed containers
- Auto-scaling capabilities
- Load balancing
- Blue/green deployments

## Prerequisites

1. **AWS CLI** configured with appropriate permissions
2. **Docker** installed (for ECS deployments)
3. **Node.js 18+** and npm
4. **Domain name** configured in Route 53 (optional)

## Setup Instructions

### 1. Configure AWS Credentials

```bash
aws configure
# Enter your AWS Access Key ID, Secret, Region, and output format
```

### 2. Set Required Permissions

Your AWS user/role needs these permissions:
- CloudFormation (full access)
- S3 (full access)
- CloudFront (full access)
- ECS (full access for container deployments)
- ECR (full access for container deployments)
- IAM (role creation for services)

### 3. Customize Configuration

Edit the CloudFormation parameters in the deployment scripts:

```bash
# For S3 deployment
vim aws/scripts/deploy-s3.sh

# For ECS deployment
vim aws/scripts/deploy-ecs.sh
```

## File Structure

```
aws/
├── cloudformation/
│   ├── s3-cloudfront.yml      # S3 + CloudFront infrastructure
│   └── ecs-fargate.yml        # ECS Fargate infrastructure
├── docker/
│   ├── Dockerfile             # Multi-stage Docker build
│   └── nginx.conf             # Nginx configuration
├── scripts/
│   ├── deploy-s3.sh           # S3 deployment script
│   ├── deploy-ecs.sh          # ECS deployment script
│   └── build-and-deploy.sh    # Comprehensive deployment
└── README.md                  # This file
```

## Environment Variables

Set these in your deployment environment:

```bash
# Application
export VITE_APP_VERSION=1.0.0
export VITE_ENVIRONMENT=production

# AWS specific
export AWS_REGION=us-east-1
export AWS_ACCOUNT_ID=123456789012

# Optional: API endpoints
export VITE_API_BASE_URL=https://api.yourdomain.com
export VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

## Monitoring and Logs

### CloudWatch Logs
- S3 access logs automatically configured
- ECS container logs in CloudWatch
- CloudFront distribution logs

### Health Checks
- ECS: Built-in health check endpoint at `/health`
- CloudFront: Automatic health monitoring

## Costs Estimation

### S3 + CloudFront
- **S3 Storage**: ~$0.023/GB/month
- **CloudFront**: ~$0.085/GB for first 10TB
- **Route 53**: ~$0.50/hosted zone/month

### ECS Fargate
- **Fargate**: ~$0.04048/vCPU/hour + $0.004445/GB/hour
- **Load Balancer**: ~$16.20/month
- **ECR**: ~$0.10/GB/month

## Troubleshooting

### Common Issues

1. **CloudFormation Stack Exists**
   ```bash
   aws cloudformation delete-stack --stack-name analytics-dashboard-production
   ```

2. **Docker Build Fails**
   ```bash
   docker system prune -f
   docker build --no-cache -t analytics-dashboard .
   ```

3. **Permission Denied**
   ```bash
   chmod +x aws/scripts/*.sh
   ```

4. **ECR Login Issues**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
   ```

## Security Best Practices

1. **Use IAM roles** instead of access keys when possible
2. **Enable CloudTrail** for audit logging
3. **Configure WAF** for web application firewall
4. **Use Secrets Manager** for sensitive configuration
5. **Enable GuardDuty** for threat detection

## Scaling Considerations

### S3 + CloudFront
- Automatically scales to global demand
- No infrastructure management required
- Pay-as-you-go pricing

### ECS Fargate
- Configure auto-scaling policies
- Use Application Load Balancer for high availability
- Consider multiple AZ deployment

## Support

For issues with AWS deployment:
1. Check CloudFormation events in AWS Console
2. Review CloudWatch logs
3. Validate IAM permissions
4. Consult AWS documentation

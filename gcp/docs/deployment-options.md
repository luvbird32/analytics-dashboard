
# Google Cloud Deployment Options

## 1. App Engine (Recommended for Static Sites)

**Best for**: Static hosting with automatic scaling and global CDN

### Features
- Fully managed serverless platform
- Automatic scaling from 0 to thousands of instances
- Built-in load balancing and health monitoring
- Custom domains and SSL certificates
- Version management and traffic splitting

### Deployment
```bash
# Quick deployment
./gcp/scripts/deploy-app-engine.sh production

# Using comprehensive script
./gcp/scripts/build-and-deploy.sh app-engine production
```

### Pricing
- **Free tier**: 28 instance hours/day, 5GB storage, 1GB egress/day
- **Standard**: $0.05-0.10/hour per instance depending on class

### Custom Domain Setup
1. Deploy your app
2. Go to Google Cloud Console → App Engine → Settings
3. Navigate to "Custom domains"
4. Add your custom domain and verify ownership
5. Configure DNS records as instructed

## 2. Cloud Run (Containerized Serverless)

**Best for**: Containerized applications with full control and rapid scaling

### Features
- Fully managed serverless containers
- Pay-per-request pricing model
- Automatic scaling including scale-to-zero
- Container Registry integration
- Custom domains and SSL certificates

### Deployment
```bash
# Deploy container service
./gcp/scripts/deploy-cloud-run.sh production analytics-dashboard us-central1

# Using comprehensive script
./gcp/scripts/build-and-deploy.sh cloud-run production
```

### Pricing
- **CPU allocation**: $0.0000024/vCPU-second
- **Memory allocation**: $0.0000025/GiB-second
- **Requests**: $0.40/million requests
- **Free tier**: 2 million requests/month, 400,000 GiB-seconds

### Custom Domain
1. Deploy to Cloud Run
2. Go to Cloud Console → Cloud Run → Manage Custom Domains
3. Add domain mapping
4. Configure DNS records

## 3. Compute Engine (Virtual Machines)

**Best for**: Full control over infrastructure and custom configurations

### Features
- Custom machine configurations
- Persistent disks and local SSDs
- Load balancing and auto-scaling groups
- Multiple operating systems
- Live migration and preemptible instances

### Deployment
```bash
# Deploy VM instance
./gcp/scripts/deploy-compute-engine.sh analytics-dashboard-vm us-central1-a

# Using comprehensive script
./gcp/scripts/build-and-deploy.sh compute-engine production
```

### Pricing
- **e2-micro**: $5.83/month (always free tier eligible)
- **e2-medium**: $24.27/month (1 vCPU, 4GB RAM)
- **e2-standard-4**: $97.09/month (4 vCPU, 16GB RAM)

### Load Balancing
```bash
# Create load balancer for multiple instances
gcloud compute instance-groups managed create analytics-dashboard-group \
    --base-instance-name analytics-dashboard \
    --size 3 \
    --template analytics-dashboard-template
```

## Available Regions

Popular Google Cloud regions:
- `us-central1` - Iowa, USA
- `us-east1` - South Carolina, USA
- `us-west1` - Oregon, USA
- `europe-west1` - Belgium
- `asia-southeast1` - Singapore
- `asia-northeast1` - Tokyo, Japan

## Scaling Considerations

### App Engine
- Automatic scaling based on traffic
- Configurable scaling parameters in `app.yaml`
- No infrastructure management required

### Cloud Run
- Automatic scaling from 0 to 1000+ instances
- Configurable concurrency (1-1000 requests per instance)
- CPU allocation only during request processing

### Compute Engine
```bash
# Auto-scaling with managed instance groups
gcloud compute instance-groups managed set-autoscaling analytics-dashboard-group \
    --max-num-replicas 10 \
    --min-num-replicas 2 \
    --target-cpu-utilization 0.6
```

## Cost Optimization

### App Engine
- Use automatic scaling with `min_instances: 0`
- Configure appropriate instance classes
- Leverage free tier quotas

### Cloud Run
- Optimize container startup time
- Use appropriate CPU and memory allocation
- Implement efficient caching strategies

### Compute Engine
- Use preemptible instances for dev/test (60-91% discount)
- Right-size your instances
- Use committed use discounts for production

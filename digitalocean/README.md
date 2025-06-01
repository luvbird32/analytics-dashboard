
# DigitalOcean Deployment Guide

This directory contains DigitalOcean deployment configurations and scripts for the Analytics Dashboard.

## Deployment Options

### 1. App Platform (Recommended for Simplicity)

**Best for**: Quick deployment with managed infrastructure

```bash
# Deploy to App Platform
./digitalocean/scripts/deploy-app-platform.sh production analytics-dashboard

# Custom domain setup (if using custom domain)
# Configure DNS in your domain registrar to point to DO App Platform
```

**Features**:
- Fully managed platform
- Auto-scaling
- Built-in CI/CD
- SSL certificates
- Global CDN

### 2. Droplet (For Full Control)

**Best for**: Custom configurations and full server control

```bash
# Create and deploy to Droplet
./digitalocean/scripts/deploy-droplet.sh analytics-dashboard-server s-2vcpu-2gb nyc3 my-ssh-key

# Setup custom domain and SSL
./digitalocean/scripts/setup-domain.sh analytics.yourdomain.com DROPLET_IP
```

**Features**:
- Full server control
- Custom configurations
- Cost-effective
- Direct SSH access

## Prerequisites

1. **DigitalOcean CLI (doctl)** installed and configured
2. **DigitalOcean account** with API token
3. **SSH key** uploaded to DigitalOcean (for Droplet deployment)
4. **Domain name** (optional, for custom domains)

## Setup Instructions

### 1. Install and Configure doctl

```bash
# Install doctl (Linux/macOS)
curl -sL https://github.com/digitalocean/doctl/releases/download/v1.94.0/doctl-1.94.0-linux-amd64.tar.gz | tar -xzv
sudo mv doctl /usr/local/bin

# Authenticate
doctl auth init
# Enter your DigitalOcean API token
```

### 2. Configure Repository

Update the repository URL in the configuration files:
- `digitalocean/app-spec.yml.template` 
- `digitalocean/scripts/user-data.sh`

Replace `username/analytics-dashboard` with your actual repository.

### 3. Set Environment Variables

```bash
export APP_NAME=analytics-dashboard
export ENVIRONMENT=production
export DROPLET_REGION=nyc3
```

## File Structure

```
digitalocean/
├── scripts/
│   ├── deploy-app-platform.sh    # App Platform deployment
│   ├── deploy-droplet.sh          # Droplet creation and setup
│   ├── setup-domain.sh            # Domain and SSL configuration
│   └── user-data.sh               # Droplet initialization script
├── app-spec.yml.template          # App Platform specification
└── README.md                      # This file
```

## Pricing Comparison

### App Platform
- **Basic**: $5/month (512MB RAM, 1 vCPU)
- **Professional**: $12/month (1GB RAM, 1 vCPU)
- **Pro**: $25/month (2GB RAM, 2 vCPU)

### Droplets
- **Basic**: $4/month (512MB RAM, 1 vCPU)
- **Regular**: $6/month (1GB RAM, 1 vCPU)
- **CPU-Optimized**: $12/month (2GB RAM, 2 vCPU)

## Available Regions

- `nyc1`, `nyc3` - New York
- `sfo2`, `sfo3` - San Francisco  
- `tor1` - Toronto
- `lon1` - London
- `fra1` - Frankfurt
- `ams2`, `ams3` - Amsterdam
- `sgp1` - Singapore
- `blr1` - Bangalore

## Custom Domain Setup

### For App Platform

1. Deploy your app
2. Get the App Platform URL
3. Create CNAME record: `your-domain.com` → `app-platform-url`
4. Add domain in App Platform console

### For Droplets

```bash
# Automatic setup
./digitalocean/scripts/setup-domain.sh your-domain.com DROPLET_IP

# Manual setup
doctl compute domain create yourdomain.com
doctl compute domain records create yourdomain.com --record-type A --record-name @ --record-data DROPLET_IP
```

## Monitoring and Logs

### App Platform
```bash
# View logs
doctl apps logs APP_ID --type=build,deploy,run

# Get app info
doctl apps get APP_ID

# List all apps
doctl apps list
```

### Droplets
```bash
# SSH into droplet
ssh root@DROPLET_IP

# View application logs
tail -f /var/log/nginx/access.log

# Check deployment status
tail -f /var/log/cloud-init-output.log

# Update application
cd /var/www/analytics-dashboard && ./update.sh
```

## Security Best Practices

1. **Use SSH keys** instead of passwords
2. **Enable UFW firewall** on droplets
3. **Regular security updates**
4. **SSL certificates** for all domains
5. **Strong passwords** for database access

## Scaling

### App Platform
- Automatic scaling based on traffic
- Configure in App Platform console
- No manual intervention required

### Droplets
```bash
# Create load balancer
doctl compute load-balancer create \
    --name analytics-lb \
    --forwarding-rules entry_protocol:http,entry_port:80,target_protocol:http,target_port:80 \
    --health-check protocol:http,port:80,path:/health \
    --region nyc3

# Add droplets to load balancer
doctl compute load-balancer add-droplets LOAD_BALANCER_ID --droplet-ids DROPLET_ID1,DROPLET_ID2
```

## Troubleshooting

### Common Issues

1. **Authentication failed**
   ```bash
   doctl auth init
   ```

2. **Build fails**
   ```bash
   # Check build logs in App Platform console
   doctl apps logs APP_ID --type=build
   ```

3. **Droplet not accessible**
   ```bash
   # Check droplet status
   doctl compute droplet get DROPLET_ID
   
   # Check firewall rules
   doctl compute firewall list
   ```

4. **SSL certificate issues**
   ```bash
   # Renew certificate manually
   ssh root@DROPLET_IP 'certbot renew'
   ```

## Support

For issues with DigitalOcean deployment:
1. Check doctl command output
2. Review DigitalOcean console logs
3. Verify DNS configuration
4. Consult DigitalOcean documentation

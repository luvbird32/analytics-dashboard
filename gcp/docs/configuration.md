
# Google Cloud Configuration Guide

## Environment Variables

Configure these environment variables for your deployment:

### Application Variables
```bash
# Application metadata
export VITE_APP_VERSION=1.0.0
export VITE_ENVIRONMENT=production
export VITE_DEPLOYMENT_TYPE=app-engine

# Build configuration
export NODE_ENV=production
```

### Google Cloud Variables
```bash
# Project configuration
export GOOGLE_CLOUD_PROJECT=your-project-id
export GOOGLE_CLOUD_REGION=us-central1
export GOOGLE_CLOUD_ZONE=us-central1-a

# Service-specific settings
export GAE_SERVICE=default
export CLOUD_RUN_SERVICE=analytics-dashboard
export COMPUTE_INSTANCE=analytics-dashboard-vm
```

### Optional API Configuration
```bash
# External services
export VITE_API_BASE_URL=https://api.yourdomain.com
export VITE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Authentication (if needed)
export VITE_AUTH_DOMAIN=your-auth-domain
export VITE_AUTH_CLIENT_ID=your-client-id
```

## App Engine Configuration

### app.yaml
```yaml
runtime: nodejs18
service: default

env_variables:
  NODE_ENV: production
  VITE_APP_VERSION: 1.0.0
  VITE_DEPLOYMENT_TYPE: app-engine
  VITE_ENVIRONMENT: production

handlers:
- url: /assets/(.*\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot))$
  static_files: dist/assets/\1
  upload: dist/assets/(.*\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot))$
  secure: always
  expiration: "30d"

- url: /.*
  static_files: dist/index.html
  upload: dist/index.html
  secure: always

automatic_scaling:
  min_instances: 0
  max_instances: 10
  target_cpu_utilization: 0.6
  target_throughput_utilization: 0.6

# Optional: VPC connector for private services
# vpc_access_connector:
#   name: projects/PROJECT_ID/locations/REGION/connectors/CONNECTOR_NAME
```

### Advanced App.yaml Features
```yaml
# Custom headers
handlers:
- url: /.*
  static_files: dist/index.html
  upload: dist/index.html
  secure: always
  http_headers:
    X-Frame-Options: SAMEORIGIN
    X-XSS-Protection: "1; mode=block"
    Strict-Transport-Security: "max-age=31536000"

# Error pages
error_handlers:
- file: dist/404.html
  error_code: over_quota
- file: dist/404.html
  error_code: dos_api_denial
- file: dist/404.html
  error_code: timeout
```

## Cloud Run Configuration

### Service Configuration
```bash
# CPU and Memory allocation
CPU_LIMIT=1
MEMORY_LIMIT=512Mi

# Concurrency and scaling
MAX_INSTANCES=100
MIN_INSTANCES=0
CONCURRENCY=80

# Deploy with configuration
gcloud run deploy analytics-dashboard \
    --image gcr.io/PROJECT_ID/analytics-dashboard \
    --cpu $CPU_LIMIT \
    --memory $MEMORY_LIMIT \
    --concurrency $CONCURRENCY \
    --min-instances $MIN_INSTANCES \
    --max-instances $MAX_INSTANCES
```

### Cloud Run YAML
```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: analytics-dashboard
  annotations:
    run.googleapis.com/ingress: all
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/maxScale: "100"
        autoscaling.knative.dev/minScale: "0"
        run.googleapis.com/cpu-throttling: "true"
    spec:
      containerConcurrency: 80
      containers:
      - image: gcr.io/PROJECT_ID/analytics-dashboard
        ports:
        - containerPort: 8080
        env:
        - name: NODE_ENV
          value: production
        resources:
          limits:
            cpu: "1"
            memory: "512Mi"
```

## Compute Engine Configuration

### Instance Template
```bash
# Create instance template
gcloud compute instance-templates create analytics-dashboard-template \
    --machine-type=e2-medium \
    --network-tier=PREMIUM \
    --image-family=ubuntu-2204-lts \
    --image-project=ubuntu-os-cloud \
    --boot-disk-size=20GB \
    --boot-disk-type=pd-standard \
    --tags=http-server \
    --metadata-from-file startup-script=gcp/compute-engine/startup-script.sh
```

### Managed Instance Group
```bash
# Create managed instance group
gcloud compute instance-groups managed create analytics-dashboard-group \
    --base-instance-name=analytics-dashboard \
    --template=analytics-dashboard-template \
    --size=3 \
    --zone=us-central1-a

# Set up auto-scaling
gcloud compute instance-groups managed set-autoscaling analytics-dashboard-group \
    --max-num-replicas=10 \
    --min-num-replicas=2 \
    --target-cpu-utilization=0.6 \
    --zone=us-central1-a
```

## Load Balancer Configuration

### HTTP(S) Load Balancer
```bash
# Create health check
gcloud compute health-checks create http analytics-dashboard-health-check \
    --port 8080 \
    --request-path /health

# Create backend service
gcloud compute backend-services create analytics-dashboard-backend \
    --protocol HTTP \
    --health-checks analytics-dashboard-health-check \
    --global

# Add instance group to backend
gcloud compute backend-services add-backend analytics-dashboard-backend \
    --instance-group analytics-dashboard-group \
    --instance-group-zone us-central1-a \
    --global

# Create URL map
gcloud compute url-maps create analytics-dashboard-map \
    --default-service analytics-dashboard-backend

# Create HTTP proxy
gcloud compute target-http-proxies create analytics-dashboard-proxy \
    --url-map analytics-dashboard-map

# Create forwarding rule
gcloud compute forwarding-rules create analytics-dashboard-forwarding-rule \
    --global \
    --target-http-proxy analytics-dashboard-proxy \
    --ports 80
```

## Monitoring and Logging

### Cloud Monitoring
```bash
# Create alerting policy
gcloud alpha monitoring policies create --policy-from-file=monitoring-policy.yaml
```

### Cloud Logging
```bash
# Configure log-based metrics
gcloud logging metrics create error_rate \
    --description="Application error rate" \
    --log-filter='resource.type="gae_app" AND severity="ERROR"'
```

## Security Configuration

### IAM Service Accounts
```bash
# Create service account for the application
gcloud iam service-accounts create analytics-dashboard-sa \
    --description="Analytics Dashboard Service Account" \
    --display-name="Analytics Dashboard"

# Grant necessary permissions
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:analytics-dashboard-sa@PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.objectViewer"
```

### VPC and Firewall
```bash
# Create VPC network
gcloud compute networks create analytics-dashboard-vpc --subnet-mode regional

# Create subnet
gcloud compute networks subnets create analytics-dashboard-subnet \
    --network analytics-dashboard-vpc \
    --range 10.0.0.0/24 \
    --region us-central1

# Create firewall rule
gcloud compute firewall-rules create allow-analytics-dashboard \
    --network analytics-dashboard-vpc \
    --allow tcp:8080 \
    --source-ranges 0.0.0.0/0
```

## Performance Optimization

### CDN Configuration
```bash
# Enable Cloud CDN for load balancer
gcloud compute backend-services update analytics-dashboard-backend \
    --enable-cdn \
    --global
```

### Cloud Storage for Static Assets
```bash
# Create bucket for static assets
gsutil mb gs://analytics-dashboard-assets-PROJECT_ID

# Upload assets with proper cache headers
gsutil -m cp -r dist/assets gs://analytics-dashboard-assets-PROJECT_ID/ \
    -h "Cache-Control:public, max-age=31536000"
```

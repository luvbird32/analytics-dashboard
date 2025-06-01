
#!/bin/bash

# Google Cloud Compute Engine Deployment Script
# Usage: ./deploy-compute-engine.sh [instance-name] [zone] [machine-type]

set -e

INSTANCE_NAME=${1:-analytics-dashboard-vm}
ZONE=${2:-us-central1-a}
MACHINE_TYPE=${3:-e2-medium}
PROJECT_ID=$(gcloud config get-value project)

echo "🚀 Starting Google Cloud Compute Engine deployment..."
echo "Instance: $INSTANCE_NAME"
echo "Zone: $ZONE"
echo "Machine Type: $MACHINE_TYPE"
echo "Project: $PROJECT_ID"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud SDK is not installed."
    exit 1
fi

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable compute.googleapis.com --quiet

# Create firewall rule for HTTP traffic
echo "🔥 Creating firewall rules..."
gcloud compute firewall-rules create allow-http-8080 \
    --allow tcp:8080 \
    --source-ranges 0.0.0.0/0 \
    --description "Allow HTTP traffic on port 8080" \
    --quiet 2>/dev/null || echo "Firewall rule already exists"

# Create the VM instance
echo "🏗️ Creating Compute Engine instance..."
gcloud compute instances create "$INSTANCE_NAME" \
    --zone="$ZONE" \
    --machine-type="$MACHINE_TYPE" \
    --network-tier=PREMIUM \
    --maintenance-policy=MIGRATE \
    --image-family=ubuntu-2204-lts \
    --image-project=ubuntu-os-cloud \
    --boot-disk-size=20GB \
    --boot-disk-type=pd-standard \
    --boot-disk-device-name="$INSTANCE_NAME" \
    --tags=http-server \
    --metadata-from-file startup-script=gcp/compute-engine/startup-script.sh \
    --quiet

# Wait for the instance to be ready
echo "⏳ Waiting for instance to be ready..."
gcloud compute instances wait-until-running "$INSTANCE_NAME" --zone="$ZONE"

# Get the external IP
EXTERNAL_IP=$(gcloud compute instances describe "$INSTANCE_NAME" --zone="$ZONE" --format="value(networkInterfaces[0].accessConfigs[0].natIP)")

echo "✅ Deployment completed successfully!"
echo "🌐 External IP: $EXTERNAL_IP"
echo "🔗 Access: http://$EXTERNAL_IP:8080"
echo "📋 Instance: $INSTANCE_NAME"
echo "🌍 Zone: $ZONE"
echo ""
echo "⏳ Application deployment is in progress..."
echo "📝 Check deployment status:"
echo "   gcloud compute ssh $INSTANCE_NAME --zone=$ZONE --command='tail -f /var/log/startup-script.log'"

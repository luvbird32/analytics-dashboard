
#!/bin/bash

# DigitalOcean Droplet Deployment Script
# Usage: ./deploy-droplet.sh [droplet-name] [size] [region]

set -e

DROPLET_NAME=${1:-analytics-dashboard-server}
DROPLET_SIZE=${2:-s-2vcpu-2gb}
DROPLET_REGION=${3:-nyc3}
SSH_KEY_NAME=${4:-""}

echo "🚀 Starting DigitalOcean Droplet deployment..."
echo "Droplet Name: $DROPLET_NAME"
echo "Size: $DROPLET_SIZE"
echo "Region: $DROPLET_REGION"

# Check if doctl is installed
if ! command -v doctl &> /dev/null; then
    echo "❌ doctl CLI is not installed. Please install it first."
    exit 1
fi

# Check if user is authenticated
if ! doctl auth list &> /dev/null; then
    echo "❌ DigitalOcean credentials not configured. Run 'doctl auth init' first."
    exit 1
fi

# Get SSH key ID if name provided
SSH_KEY_ARGS=""
if [ -n "$SSH_KEY_NAME" ]; then
    SSH_KEY_ID=$(doctl compute ssh-key list --format ID,Name --no-header | grep "$SSH_KEY_NAME" | awk '{print $1}')
    if [ -n "$SSH_KEY_ID" ]; then
        SSH_KEY_ARGS="--ssh-keys $SSH_KEY_ID"
        echo "🔑 Using SSH key: $SSH_KEY_NAME (ID: $SSH_KEY_ID)"
    else
        echo "⚠️ SSH key '$SSH_KEY_NAME' not found. Creating droplet without SSH key."
    fi
fi

# Create droplet with user data
echo "🏗️ Creating droplet..."
DROPLET_ID=$(doctl compute droplet create "$DROPLET_NAME" \
    --size "$DROPLET_SIZE" \
    --image ubuntu-22-04-x64 \
    --region "$DROPLET_REGION" \
    --user-data-file digitalocean/scripts/user-data.sh \
    $SSH_KEY_ARGS \
    --format ID --no-header)

echo "⏳ Waiting for droplet to be ready..."
doctl compute droplet get "$DROPLET_ID" --wait

# Get droplet IP
DROPLET_IP=$(doctl compute droplet get "$DROPLET_ID" --format PublicIPv4 --no-header)

echo "✅ Droplet created successfully!"
echo "🌐 IP Address: $DROPLET_IP"
echo "🔗 Access: http://$DROPLET_IP"
echo "📋 Droplet ID: $DROPLET_ID"
echo ""
echo "⏳ Application deployment is in progress..."
echo "📝 Check deployment status: ssh root@$DROPLET_IP 'tail -f /var/log/cloud-init-output.log'"

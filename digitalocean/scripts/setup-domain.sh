
#!/bin/bash

# DigitalOcean Domain and SSL Setup Script
# Usage: ./setup-domain.sh [domain-name] [droplet-ip]

set -e

DOMAIN_NAME=${1}
DROPLET_IP=${2}

if [ -z "$DOMAIN_NAME" ] || [ -z "$DROPLET_IP" ]; then
    echo "Usage: $0 <domain-name> <droplet-ip>"
    echo "Example: $0 analytics.yourdomain.com 192.168.1.100"
    exit 1
fi

echo "🌐 Setting up domain and SSL for $DOMAIN_NAME..."

# Check if doctl is installed
if ! command -v doctl &> /dev/null; then
    echo "❌ doctl CLI is not installed"
    exit 1
fi

# Extract base domain
BASE_DOMAIN=$(echo "$DOMAIN_NAME" | awk -F. '{print $(NF-1)"."$NF}')

# Create domain if it doesn't exist
echo "📋 Creating domain record..."
doctl compute domain create "$BASE_DOMAIN" 2>/dev/null || echo "Domain already exists"

# Create A record
echo "📍 Creating A record..."
doctl compute domain records create "$BASE_DOMAIN" \
    --record-type A \
    --record-name "$(echo "$DOMAIN_NAME" | sed "s/\.$BASE_DOMAIN$//")" \
    --record-data "$DROPLET_IP" \
    --record-ttl 300

echo "🔒 Setting up SSL certificate..."

# SSH into droplet and setup SSL
ssh -o StrictHostKeyChecking=no root@"$DROPLET_IP" << EOF
# Update Nginx configuration with domain
sed -i 's/server_name _;/server_name $DOMAIN_NAME;/' /etc/nginx/sites-available/analytics-dashboard
nginx -t
systemctl reload nginx

# Get SSL certificate
certbot --nginx -d $DOMAIN_NAME --non-interactive --agree-tos --email admin@$BASE_DOMAIN

# Setup auto-renewal
echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -

echo "SSL certificate installed successfully!"
EOF

echo "✅ Domain and SSL setup completed!"
echo "🌐 Your site is now available at: https://$DOMAIN_NAME"
echo "🔒 SSL certificate is automatically renewed"

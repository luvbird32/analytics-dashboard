
#!/bin/bash

# DigitalOcean Droplet User Data Script
# This script runs when the droplet is first created

set -e

# Update system
apt-get update -y
apt-get upgrade -y

# Install required packages
apt-get install -y \
    nginx \
    nodejs \
    npm \
    git \
    curl \
    unzip \
    certbot \
    python3-certbot-nginx

# Install PM2 for process management
npm install -g pm2

# Create application directory
mkdir -p /var/www/analytics-dashboard
cd /var/www/analytics-dashboard

# Clone repository (replace with your repo URL)
git clone https://github.com/username/analytics-dashboard.git .

# Install dependencies and build
npm ci --only=production
npm run build

# Configure Nginx
cat > /etc/nginx/sites-available/analytics-dashboard << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/analytics-dashboard/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Health check
    location /health {
        access_log off;
        return 200 '{"status":"healthy","service":"analytics-dashboard"}';
        add_header Content-Type application/json;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/analytics-dashboard /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx
systemctl enable nginx

# Create deployment script for updates
cat > /var/www/analytics-dashboard/update.sh << 'EOF'
#!/bin/bash
cd /var/www/analytics-dashboard
git pull origin main
npm ci --only=production
npm run build
systemctl reload nginx
echo "Deployment updated successfully!"
EOF

chmod +x /var/www/analytics-dashboard/update.sh

# Set proper permissions
chown -R www-data:www-data /var/www/analytics-dashboard

echo "Analytics Dashboard deployed successfully!"
echo "Access your application at: http://$(curl -s http://checkip.amazonaws.com/)"

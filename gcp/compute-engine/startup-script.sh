
#!/bin/bash

# Google Compute Engine startup script for Analytics Dashboard
# This script runs when the VM starts up

set -e

LOG_FILE="/var/log/startup-script.log"
exec > >(tee -a $LOG_FILE)
exec 2>&1

echo "🚀 Starting Analytics Dashboard setup on Compute Engine..."
echo "Timestamp: $(date)"

# Update system packages
echo "📦 Updating system packages..."
apt-get update
apt-get upgrade -y

# Install Node.js 18
echo "📦 Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install nginx
echo "📦 Installing nginx..."
apt-get install -y nginx

# Install Git
echo "📦 Installing Git..."
apt-get install -y git

# Create application directory
APP_DIR="/opt/analytics-dashboard"
mkdir -p $APP_DIR
cd $APP_DIR

# Clone repository (replace with your actual repository)
echo "📥 Cloning repository..."
git clone https://github.com/username/analytics-dashboard.git .

# Install dependencies and build
echo "📦 Installing dependencies..."
npm ci --only=production

echo "🏗️ Building application..."
npm run build

# Configure nginx
echo "⚙️ Configuring nginx..."
cat > /etc/nginx/sites-available/analytics-dashboard << 'EOF'
server {
    listen 8080;
    server_name _;
    root /opt/analytics-dashboard/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Health check
    location /health {
        access_log off;
        return 200 "OK\n";
        add_header Content-Type text/plain;
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/analytics-dashboard /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

# Start and enable nginx
systemctl start nginx
systemctl enable nginx

# Create systemd service for auto-updates (optional)
cat > /etc/systemd/system/analytics-dashboard-update.service << 'EOF'
[Unit]
Description=Analytics Dashboard Update Service
After=network.target

[Service]
Type=oneshot
WorkingDirectory=/opt/analytics-dashboard
ExecStart=/bin/bash -c 'git pull && npm ci --only=production && npm run build && systemctl reload nginx'
User=root

[Install]
WantedBy=multi-user.target
EOF

# Create timer for daily updates (optional)
cat > /etc/systemd/system/analytics-dashboard-update.timer << 'EOF'
[Unit]
Description=Analytics Dashboard Update Timer
Requires=analytics-dashboard-update.service

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
EOF

# Enable the update timer
systemctl enable analytics-dashboard-update.timer
systemctl start analytics-dashboard-update.timer

echo "✅ Analytics Dashboard setup completed!"
echo "🌐 Application is available on port 8080"
echo "📊 Status: systemctl status nginx"
echo "📋 Logs: tail -f /var/log/nginx/access.log"
echo "🔄 Updates: systemctl status analytics-dashboard-update.timer"

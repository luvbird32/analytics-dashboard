
# Azure Monitoring and Troubleshooting

## Monitoring

### Static Web Apps Monitoring
```bash
# View application insights (if configured)
az monitor app-insights component show \
    --app analytics-dashboard \
    --resource-group analytics-dashboard-rg

# View activity logs
az monitor activity-log list \
    --resource-group analytics-dashboard-rg \
    --max-events 50
```

### Container Instances Monitoring
```bash
# View container logs
az container logs \
    --resource-group analytics-dashboard-rg \
    --name analytics-dashboard-cg

# Stream logs in real-time
az container logs \
    --resource-group analytics-dashboard-rg \
    --name analytics-dashboard-cg \
    --follow

# Get container details and status
az container show \
    --resource-group analytics-dashboard-rg \
    --name analytics-dashboard-cg
```

### Health Checks

#### Static Web Apps
- Automatic health monitoring
- Built-in availability monitoring
- Performance insights in Azure Portal

#### Container Instances
```bash
# Check container health
az container show \
    --resource-group analytics-dashboard-rg \
    --name analytics-dashboard-cg \
    --query instanceView.state

# Health check endpoint (configured in nginx)
curl http://your-container-fqdn/health
```

## Logging

### Application Logs
```bash
# Enable application logging for Static Web Apps
az staticwebapp appsettings set \
    --name your-static-app-name \
    --setting-names "APPINSIGHTS_INSTRUMENTATIONKEY=your-key"

# Container instance logs with timestamps
az container logs \
    --resource-group analytics-dashboard-rg \
    --name analytics-dashboard-cg \
    --timestamps
```

### Azure Activity Logs
```bash
# Filter by resource group
az monitor activity-log list \
    --resource-group analytics-dashboard-rg \
    --start-time 2023-01-01T00:00:00Z \
    --end-time 2023-12-31T23:59:59Z

# Filter by specific operations
az monitor activity-log list \
    --resource-group analytics-dashboard-rg \
    --operation-name "Microsoft.Web/sites/deployments/write"
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Azure CLI Not Authenticated
```bash
# Problem: Command fails with authentication error
# Solution:
az login
az account set --subscription YOUR_SUBSCRIPTION_ID
```

#### 2. Resource Group Creation Fails
```bash
# Problem: Invalid location or permissions
# Solution: Check available locations
az account list-locations --output table

# Verify permissions
az role assignment list --assignee $(az account show --query user.name --output tsv)
```

#### 3. Container Registry Access Denied
```bash
# Problem: Cannot push to registry
# Solution: Enable admin user and get credentials
az acr update --name YOUR_REGISTRY --admin-enabled true
az acr credential show --name YOUR_REGISTRY
```

#### 4. Static Web App Build Fails
```bash
# Problem: GitHub Actions build failure
# Solution: Check build configuration
# 1. Verify package.json scripts
# 2. Check environment variables in GitHub
# 3. Review GitHub Actions logs
# 4. Validate staticwebapp.config.json
```

#### 5. Container Instance Won't Start
```bash
# Problem: Container in waiting state
# Solution: Check container logs
az container logs --resource-group analytics-dashboard-rg --name analytics-dashboard-cg

# Check container events
az container show \
    --resource-group analytics-dashboard-rg \
    --name analytics-dashboard-cg \
    --query instanceView.events
```

### Performance Issues

#### Static Web Apps
- Check CDN distribution settings
- Verify build optimization
- Review bundle sizes
- Monitor Core Web Vitals

#### Container Instances
```bash
# Check resource utilization
az container show \
    --resource-group analytics-dashboard-rg \
    --name analytics-dashboard-cg \
    --query containers[0].instanceView.currentState

# Scale up resources if needed
# Update ARM template with higher CPU/memory values
```

### Debugging Commands

#### Get Resource Information
```bash
# List all resources in group
az resource list --resource-group analytics-dashboard-rg --output table

# Get specific resource details
az resource show \
    --resource-group analytics-dashboard-rg \
    --name analytics-dashboard \
    --resource-type Microsoft.Web/staticSites
```

#### Check Deployment Status
```bash
# List deployments
az deployment group list \
    --resource-group analytics-dashboard-rg \
    --output table

# Get deployment details
az deployment group show \
    --resource-group analytics-dashboard-rg \
    --name your-deployment-name
```

### Performance Monitoring

#### Enable Application Insights
```bash
# Create Application Insights instance
az monitor app-insights component create \
    --app analytics-dashboard-insights \
    --location "East US 2" \
    --resource-group analytics-dashboard-rg

# Get instrumentation key
az monitor app-insights component show \
    --app analytics-dashboard-insights \
    --resource-group analytics-dashboard-rg \
    --query instrumentationKey
```

#### Custom Metrics
```bash
# Send custom telemetry (example)
az monitor metrics list \
    --resource-group analytics-dashboard-rg \
    --resource-name analytics-dashboard-cg \
    --resource-type Microsoft.ContainerInstance/containerGroups \
    --metric CpuUsage
```

## Alerting

### Set Up Alerts
```bash
# Create action group for notifications
az monitor action-group create \
    --name analytics-dashboard-alerts \
    --resource-group analytics-dashboard-rg \
    --action email admin admin@yourdomain.com

# Create alert rule for high CPU usage
az monitor metrics alert create \
    --name high-cpu-alert \
    --resource-group analytics-dashboard-rg \
    --scopes /subscriptions/SUBSCRIPTION_ID/resourceGroups/analytics-dashboard-rg/providers/Microsoft.ContainerInstance/containerGroups/analytics-dashboard-cg \
    --condition "avg Percentage CPU > 80" \
    --action analytics-dashboard-alerts
```

When issues persist, check Azure Service Health and consider opening a support ticket through the Azure Portal.

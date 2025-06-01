
# Azure Security Best Practices

## Authentication and Authorization

### Azure Active Directory Integration
```bash
# Register application in Azure AD
az ad app create \
    --display-name "Analytics Dashboard" \
    --homepage "https://your-domain.com" \
    --identifier-uris "https://your-domain.com"

# Create service principal
az ad sp create-for-rbac \
    --name "analytics-dashboard-sp" \
    --role contributor \
    --scopes /subscriptions/YOUR_SUBSCRIPTION_ID
```

### Managed Identities
For Container Instances, use managed identities to access other Azure services:

```bash
# Enable system-assigned managed identity
az container create \
    --resource-group analytics-dashboard-rg \
    --name analytics-dashboard-cg \
    --assign-identity \
    --image your-image
```

## Network Security

### Network Security Groups (NSGs)
```bash
# Create NSG for container instances
az network nsg create \
    --resource-group analytics-dashboard-rg \
    --name analytics-dashboard-nsg

# Allow HTTPS traffic
az network nsg rule create \
    --resource-group analytics-dashboard-rg \
    --nsg-name analytics-dashboard-nsg \
    --name AllowHTTPS \
    --protocol tcp \
    --priority 1000 \
    --destination-port-range 443 \
    --access allow
```

### Virtual Networks (VNets)
For enhanced security, deploy containers in VNets:

```bash
# Create virtual network
az network vnet create \
    --resource-group analytics-dashboard-rg \
    --name analytics-dashboard-vnet \
    --address-prefix 10.0.0.0/16 \
    --subnet-name default \
    --subnet-prefix 10.0.1.0/24
```

## Secrets Management

### Azure Key Vault
```bash
# Create Key Vault
az keyvault create \
    --name analytics-dashboard-kv \
    --resource-group analytics-dashboard-rg \
    --location "East US 2"

# Store secrets
az keyvault secret set \
    --vault-name analytics-dashboard-kv \
    --name "ApiKey" \
    --value "your-secret-api-key"

# Grant access to container identity
az keyvault set-policy \
    --name analytics-dashboard-kv \
    --object-id $(az container show --resource-group analytics-dashboard-rg --name analytics-dashboard-cg --query identity.principalId --output tsv) \
    --secret-permissions get
```

### Environment Variables Security
Never store secrets in plain text. Use Key Vault references:

```bash
# Reference Key Vault secret in container
az container create \
    --resource-group analytics-dashboard-rg \
    --name analytics-dashboard-cg \
    --environment-variables \
        "API_KEY"="@Microsoft.KeyVault(SecretUri=https://analytics-dashboard-kv.vault.azure.net/secrets/ApiKey/)"
```

## Data Security

### Encryption at Rest
- Static Web Apps: Automatic encryption
- Container Instances: Use encrypted storage volumes
- Container Registry: Enable encryption with customer-managed keys

### Encryption in Transit
- Enforce HTTPS/TLS 1.2+
- Use Azure Front Door for SSL termination
- Configure proper security headers

## Security Headers

### Nginx Configuration (for containers)
The included nginx.conf already implements security headers:

```nginx
# Security headers (already in azure/docker/nginx.conf)
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### Static Web Apps Headers
Configure in `staticwebapp.config.json`:

```json
{
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000; includeSubdomains",
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  }
}
```

## Access Control

### Role-Based Access Control (RBAC)
```bash
# Create custom role for dashboard management
az role definition create --role-definition '{
  "Name": "Dashboard Manager",
  "Description": "Can manage analytics dashboard resources",
  "Actions": [
    "Microsoft.Web/staticSites/*",
    "Microsoft.ContainerInstance/containerGroups/*",
    "Microsoft.ContainerRegistry/registries/pull/read"
  ],
  "AssignableScopes": ["/subscriptions/YOUR_SUBSCRIPTION_ID"]
}'

# Assign role to user/group
az role assignment create \
    --role "Dashboard Manager" \
    --assignee user@yourdomain.com \
    --scope /subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/analytics-dashboard-rg
```

### Resource Access Policies
```bash
# Restrict container registry access
az acr update \
    --name analyticsdashboardacr \
    --admin-enabled false

# Use managed identity instead
az acr scope-map create \
    --name dashboard-scope \
    --registry analyticsdashboardacr \
    --actions repositories/analytics-dashboard/content/read
```

## Monitoring and Auditing

### Azure Security Center
Enable Azure Security Center for continuous security assessment:

```bash
# Enable Security Center (if not already enabled)
az security pricing create \
    --name VirtualMachines \
    --tier Standard

# Get security recommendations
az security task list
```

### Activity Logging
```bash
# Enable diagnostic settings for activity logs
az monitor diagnostic-settings create \
    --name "audit-logs" \
    --resource "/subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/analytics-dashboard-rg" \
    --logs '[{
        "category": "Administrative",
        "enabled": true,
        "retentionPolicy": {"enabled": true, "days": 90}
    }]'
```

## Vulnerability Management

### Container Image Scanning
```bash
# Enable container scanning in ACR
az acr task create \
    --registry analyticsdashboardacr \
    --name security-scan \
    --context https://github.com/yourusername/analytics-dashboard.git \
    --file azure/docker/Dockerfile \
    --image analytics-dashboard:{{.Run.ID}}
```

### Regular Updates
- Keep base images updated
- Regular dependency updates
- Automated security patching
- Monitor security advisories

## Compliance

### Data Residency
- Choose appropriate Azure regions
- Understand data residency requirements
- Configure geo-replication if needed

### Compliance Frameworks
Azure supports various compliance frameworks:
- SOC 1, 2, 3
- ISO 27001
- GDPR
- HIPAA (where applicable)

## Incident Response

### Security Incident Handling
```bash
# Set up security alerts
az monitor action-group create \
    --name security-alerts \
    --resource-group analytics-dashboard-rg \
    --action email security-team security@yourdomain.com

# Create alert for suspicious activities
az monitor activity-log alert create \
    --name "suspicious-activity" \
    --resource-group analytics-dashboard-rg \
    --condition category=Security
```

### Backup and Recovery
```bash
# Backup container images
az acr import \
    --name backup-registry \
    --source analyticsdashboardacr.azurecr.io/analytics-dashboard:latest \
    --image analytics-dashboard:backup-$(date +%Y%m%d)
```

## Security Checklist

- [ ] Enable Azure AD authentication
- [ ] Use managed identities
- [ ] Store secrets in Key Vault
- [ ] Implement proper RBAC
- [ ] Enable security headers
- [ ] Configure network security groups
- [ ] Enable container image scanning
- [ ] Set up security monitoring
- [ ] Regular security updates
- [ ] Backup strategy in place
- [ ] Incident response plan documented
- [ ] Compliance requirements met

Regular security reviews and penetration testing are recommended to maintain a strong security posture.

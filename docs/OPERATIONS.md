# DBL Website Builder Operations Guide

## n8n Setup

### Starting n8n (Docker)
```bash
# From your n8n-stack directory
docker-compose up -d
```

Access n8n at: http://localhost:5678

### Environment Variables in n8n

Set these in your n8n environment (Docker Compose or UI):
- `MONGODB_URI` - Database connection
- `VERCEL_TOKEN` - For deployments  
- `GITHUB_TOKEN` - For repository creation
- `REGISTRAR_API_KEY` - For domain operations
- `ZOHO_SMTP_*` - For email notifications
- `GHL_API_KEY` and `GHL_LOCATION_ID` - For CRM integration

### Importing Workflows

```bash
./scripts/import-n8n.sh
```

Or manually through n8n UI: Settings → Import → Select JSON files from `agents/n8n/workflows/`

### Testing Webhooks

Test the domain sherpa workflow:
```bash
curl -X POST http://localhost:5678/webhook/domain-sherpa \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test Company",
    "businessType": "Consulting",
    "email": "test@example.com"
  }'
```

## Web Application

### Local Development

```bash
./scripts/dev-web.sh
```

### Environment Setup

1. Copy `apps/dbl-web/env.example` to `apps/dbl-web/.env.local`
2. Configure all required environment variables
3. Ensure MongoDB is accessible
4. Verify n8n webhook URLs are correct

### Deployment to Vercel

```bash
cd apps/dbl-web
vercel --prod
```

Set environment variables in Vercel dashboard:
- Project Settings → Environment Variables
- Add all variables from `env.example`

### API Routes

- `/api/intake` - Form submission endpoint
- Connects to n8n via webhook for processing

## Workflow Management

### Agent Workflow Files
- `domain-sherpa.json` - Domain research and availability
- `logo-brandsmith.json` - Brand identity and logo creation  
- `site-builder.json` - Website generation and development
- `vercel-deployer.json` - Deployment and domain setup

### Updating Prompts
Edit files in `prompts/` directory and update corresponding n8n workflows to use new prompts.

## Troubleshooting

### n8n Issues
- Check Docker container logs: `docker logs n8n-stack-n8n-1`
- Verify port 5678 is accessible
- Check environment variable configuration

### Web App Issues  
- Verify MongoDB connection
- Check n8n webhook URLs are reachable
- Review Vercel deployment logs

### Integration Issues
- Test API endpoints individually
- Verify webhook payloads match expected format
- Check service API keys and permissions

## Monitoring

- n8n execution logs via UI
- Vercel deployment and function logs
- MongoDB connection and query performance
- Third-party service API rate limits and usage
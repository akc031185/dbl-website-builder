# DBL Website Builder

A comprehensive system for automated website creation using Next.js 14 and n8n workflow automation.

## Architecture

```
├── apps/dbl-web/          # Next.js 14 web application (intake UI + API)
├── agents/n8n/workflows/  # Modular n8n workflow definitions (JSON)
├── prompts/               # AI prompts for each agent
├── scripts/               # Development and deployment scripts
├── docs/                  # Operations and deployment documentation
└── env/                   # Environment variable templates
```

## Quick Start

1. **Start n8n (Docker)**:
   ```bash
   # From your n8n-stack directory
   docker-compose up -d
   ```

2. **Run the web app**:
   ```bash
   ./scripts/dev-web.sh
   ```

3. **Import n8n workflows**:
   ```bash
   ./scripts/import-n8n.sh
   ```

## Environment Setup

1. Copy `env/web.example` to `apps/dbl-web/.env.local`
2. Configure your MongoDB, n8n webhooks, and API keys
3. See `docs/OPERATIONS.md` for detailed setup instructions

## Development

- Web app: `apps/dbl-web/` (Next.js 14 with TypeScript)
- Workflows: `agents/n8n/workflows/` (Import into n8n)
- Prompts: `prompts/` (System prompts for AI agents)

## Deployment

See `docs/OPERATIONS.md` for Vercel deployment and n8n configuration.

## License

MIT - see LICENSE file.
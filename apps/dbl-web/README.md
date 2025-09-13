# DBL Web Application

Next.js 14 application with TypeScript and Tailwind CSS for the DadBuildingLegacy.com website builder intake system.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Copy `env.example` to `.env.local` and configure:

- `MONGODB_URI` - MongoDB connection string
- `N8N_INTAKE_WEBHOOK_URL` - n8n webhook URL for intake processing
- API keys for various services

## Deployment

This app is designed to deploy to Vercel:

```bash
vercel --prod
```

Configure environment variables in the Vercel dashboard.
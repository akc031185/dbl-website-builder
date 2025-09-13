#!/bin/bash
set -e

echo "Starting DBL Web Development Server..."
cd "$(dirname "$0")/../apps/dbl-web"

if [ ! -f "package.json" ]; then
    echo "Installing Next.js dependencies..."
    npm init -y
    npm install next@14.2.0 react react-dom
    npm install -D typescript @types/node @types/react @types/react-dom
    npm install -D tailwindcss postcss autoprefixer
    npm install -D eslint eslint-config-next
    npx tailwindcss init -p
fi

if [ ! -f ".env.local" ]; then
    echo "Warning: No .env.local found. Copy from env.example and configure."
fi

echo "Starting development server at http://localhost:3000"
npm run dev
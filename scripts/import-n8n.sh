#!/bin/bash
set -e

N8N_BASE_URL=${N8N_BASE_URL:-"http://localhost:5678"}

echo "Importing n8n workflows..."

for workflow in agents/n8n/workflows/*.json; do
    workflow_name=$(basename "$workflow" .json)
    echo "Importing $workflow_name..."
    
    curl -X POST \
        "$N8N_BASE_URL/api/v1/workflows/import" \
        -H "Content-Type: application/json" \
        -d @"$workflow" \
        --fail \
        --silent \
        --show-error
        
    echo "✓ Imported $workflow_name"
done

echo "All workflows imported successfully!"
echo "Access n8n at: $N8N_BASE_URL"
# Exporting n8n Workflows

## From n8n UI

1. Open n8n at http://localhost:5678
2. Go to the workflow you want to export
3. Click the "..." menu in the top right
4. Select "Export"
5. Choose "Download as JSON file"
6. Save to `agents/n8n/workflows/[workflow-name].json`

## Bulk Export (Advanced)

You can also use the n8n CLI or API:

```bash
# Using n8n CLI (if installed globally)
n8n export:workflow --output=agents/n8n/workflows/ --all

# Using API (requires authentication)
curl -X GET "http://localhost:5678/api/v1/workflows" \
  -H "Content-Type: application/json"
```

## Important Notes

- Always export workflows after making changes
- Commit exported JSON files to git
- Use descriptive workflow names that match agent purposes
- Test workflows after importing to new n8n instances
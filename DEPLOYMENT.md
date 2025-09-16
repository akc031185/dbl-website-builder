# Deployment Guide for dadbuildinglegacy.com/website-builder

This guide explains how to deploy the website builder as a subdirectory under dadbuildinglegacy.com.

## Option 1: Vercel Subdirectory Deployment

### Environment Variables (Vercel)
Set these in your Vercel project settings:

```bash
NEXT_PUBLIC_BASE_PATH=/website-builder
NEXT_PUBLIC_SITE_URL=https://dadbuildinglegacy.com/website-builder
MONGODB_URI=mongodb+srv://akc031185:Get13work@dbl-website-builder.oqmk0dc.mongodb.net/dbl-website-builder?retryWrites=true&w=majority&appName=dbl-website-builder
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com
ADMIN_EMAIL=admin@dadbuildinglegacy.com
```

### Vercel Integration
1. Deploy this project to Vercel as usual
2. In your main dadbuildinglegacy.com project, add a rewrite rule:

```javascript
// In your main site's next.config.js or vercel.json
{
  "rewrites": [
    {
      "source": "/website-builder/:path*",
      "destination": "https://dbl-website-builder.vercel.app/:path*"
    }
  ]
}
```

## Option 2: Static Export for Manual Deployment

### Build for Subdirectory
```bash
npm run build:subdirectory
```

### Export Static Files
```bash
npm run export:subdirectory
```

### Deploy Static Files
1. The exported files will be in the `out/` directory
2. Upload the contents to your dadbuildinglegacy.com server under `/website-builder/`
3. Ensure your web server is configured to serve the files correctly

### Web Server Configuration (Apache)
Add to your `.htaccess` or Apache config:

```apache
# In /website-builder/.htaccess
RewriteEngine On
RewriteRule ^$ /website-builder/ [R=301,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /website-builder/index.html [L]
```

### Web Server Configuration (Nginx)
Add to your Nginx config:

```nginx
location /website-builder/ {
    try_files $uri $uri/ /website-builder/index.html;
}
```

## URLs After Deployment

- **Main Form**: https://dadbuildinglegacy.com/website-builder/
- **Alternative Form**: https://dadbuildinglegacy.com/website-builder/website-request/
- **Journal**: https://dadbuildinglegacy.com/website-builder/journal/
- **Legal**: https://dadbuildinglegacy.com/website-builder/legal/
- **API**: https://dadbuildinglegacy.com/website-builder/api/website-intake

## Testing

After deployment, test:
1. Form submission functionality
2. Domain selection interface
3. MongoDB data storage
4. Email notifications
5. All navigation links work correctly with the base path

## Notes

- The app is configured to work both standalone and as a subdirectory
- All internal links will automatically include the base path when `NEXT_PUBLIC_BASE_PATH` is set
- API routes will work correctly with the subdirectory configuration
- MongoDB and email functionality remain unchanged
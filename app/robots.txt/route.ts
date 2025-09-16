export function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /*.json$
Disallow: /test-email

# Allow search engines to crawl important pages
Allow: /journal
Allow: /legal

# Sitemap location
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://dadbuildinglegacy.com'}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1
  `.trim();

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
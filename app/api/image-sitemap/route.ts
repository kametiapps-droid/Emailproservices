import { blogPosts } from '@/lib/blogData';

export async function GET() {
  const baseUrl = 'https://www.mytempmail.pro';

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}</loc>
    <image:image>
      <image:loc>${baseUrl}/favicon.png</image:loc>
      <image:title>Temp Mail Pro - Temporary Email Service</image:title>
    </image:image>
  </url>
  ${blogPosts.map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    ${post.featuredImage ? `
    <image:image>
      <image:loc>${baseUrl}${post.featuredImage}</image:loc>
      <image:title>${post.title}</image:title>
      <image:caption>${post.imageAlt || post.excerpt}</image:caption>
    </image:image>
    ` : ''}
  </url>`).join('')}
</urlset>`;

  return new Response(xmlContent, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

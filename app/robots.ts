import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ['Googlebot', 'Bingbot', 'DuckDuckBot', 'YandexBot'],
        allow: '/',
        disallow: [
          '/api/',
          '/api-docs/',
          '/inbox/',
          '/mail/',
          '/webhook/',
          '/admin/',
          '/dashboard/',
          '/private/',
        ],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'CCBot',
          'Google-Extended',
          'Amazonbot',
          'Applebot-Extended',
        ],
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/api-docs/',
          '/inbox/',
          '/mail/',
          '/webhook/',
          '/admin/',
          '/dashboard/',
          '/private/',
        ],
      },
    ],
    sitemap: [
    'https://www.mytempmail.pro/sitemap.xml',
    'https://www.mytempmail.pro/api/image-sitemap',
  ],
    host: 'https://www.mytempmail.pro',
  };
}

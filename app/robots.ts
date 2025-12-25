import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*", // all crawlers
        allow: "/",
        disallow: [
          "/api/",
          "/webhook/",
          "/admin/",
          "/private/",
        ],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "CCBot",
          "Google-Extended",
        ],
        disallow: "/", // AI crawlers blocked
      },
    ],
    sitemap: "https://www.mytempmail.pro/sitemap.xml",
    host: "https://www.mytempmail.pro",
  };
}

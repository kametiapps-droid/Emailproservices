import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ✅ Allow real search engines (Blog + Pages)
      {
        userAgent: ["Googlebot", "Bingbot", "DuckDuckBot", "YandexBot"],
        allow: ["/"],
        disallow: [
          "/api/",
          "/api-docs",
          "/inbox/",
          "/mail/",
          "/webhook/",
          "/admin/",
          "/dashboard/",
        ],
      },

      // ❌ Block AI training & scraping bots
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "CCBot",
          "Google-Extended",
          "Amazonbot",
          "Applebot-Extended",
        ],
        disallow: ["/"],
      },

      // ❌ Default rule for unknown bots & scripts
      {
        userAgent: "*",
        disallow: [
          "/api/",
          "/api-docs",
          "/inbox/",
          "/mail/",
          "/webhook/",
          "/admin/",
          "/dashboard/",
          "/private/",
        ],
      },
    ],

    sitemap: "https://www.mytempmail.pro/sitemap.xml",
    host: "https://www.mytempmail.pro",
  };
}

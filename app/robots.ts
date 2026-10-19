import type { MetadataRoute } from "next";

// Search engines and AI assistants (ChatGPT, Perplexity, Claude, Google AI,
// Bing/Copilot) may read the public site; the admin and API stay private.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: AI_BOTS, allow: "/", disallow },
    ],
    sitemap: "https://www.rollerland.brussels/sitemap.xml",
    host: "https://www.rollerland.brussels",
  };
}

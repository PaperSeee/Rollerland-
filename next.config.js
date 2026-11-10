const createNextIntlPlugin = require("next-intl/plugin");

// Point the plugin at our request config (no src/ dir in this project).
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare (10/11/2026) : STATIC_EXPORT=1 → site public en fichiers (Cloudflare Pages, voir
  // cloudflare/preparer-statique.sh) ; sinon application complète avec l'admin (Worker rollerland-app).
  output: process.env.STATIC_EXPORT ? "export" : undefined,
  images: {
    unoptimized: true, // Cloudflare : pas d'optimiseur d'images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "retro.brussels",
        pathname: "/wp-content/uploads/**",
      },
      // Admin-provided image URLs (popup, events) can come from any https host.
      { protocol: "https", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      // "Services" was renamed to "Private Events" (EN default path, unprefixed).
      { source: "/services", destination: "/private-events", permanent: true },
      { source: "/fr/services", destination: "/fr/private-events", permanent: true },
      { source: "/nl/services", destination: "/nl/private-events", permanent: true },
    ];
  },
};

module.exports = withNextIntl(nextConfig);

const createNextIntlPlugin = require("next-intl/plugin");

// Point the plugin at our request config (no src/ dir in this project).
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "retro.brussels",
        pathname: "/wp-content/uploads/**",
      },
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

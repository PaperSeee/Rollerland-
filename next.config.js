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
      // "Services" was renamed to "Private Events".
      { source: "/services", destination: "/private-events", permanent: true },
    ];
  },
};

module.exports = nextConfig;

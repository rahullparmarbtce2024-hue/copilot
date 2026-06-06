/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.optimization.minimize = true;
    return config;
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'backend', 'project-network-production.up.railway.app'],
  },
};

module.exports = nextConfig;

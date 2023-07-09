/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'backend',
      'project-network-production.up.railway.app',
      'bucket-orkut.s3.amazonaws.com',
      'bucket-orkut.s3-sa-east-1.amazonaws.com',
      'bucket-orkut.s3.us-east-2.amazonaws.com',
      'bucket-orkut.s3.us-east-2.amazonaws.com/',
      'bucket-orkut.s3.us-east-3.amazonaws.com',
      'https://bucket-orkut.s3.us-east-2.amazonaws.com/',
      'https://bucket-orkut.s3.us-east-2.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const basePath = process.env.BASE_PATH ? process.env.BASE_PATH.replace(/\/+$/, '') : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined
};

export default nextConfig;

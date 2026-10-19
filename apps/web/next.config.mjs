/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.GITHUB_PAGES === 'true' ? 'export' : 'standalone',
  images: {
    unoptimized: process.env.GITHUB_PAGES === 'true',
  },
  basePath: process.env.GITHUB_PAGES === 'true' ? '/Hardik-Sankhla' : '',
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/Hardik-Sankhla/' : '',
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages compatibility
  output: 'export',
  // Disable image optimization for static hosting
  images: { unoptimized: true },
  reactStrictMode: true
};

export default nextConfig;


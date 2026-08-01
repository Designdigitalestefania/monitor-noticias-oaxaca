/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com'],
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "https://lh3.googleusercontent.com", 
      "https://images.pexels.com",
    ],
  },
  swcMinify: true,
}

module.exports = nextConfig

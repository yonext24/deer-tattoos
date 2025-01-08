/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'storage.googleapis.com' },
      { hostname: 'cdn.sanity.io' },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
}

module.exports = nextConfig

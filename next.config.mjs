/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/courseraplus',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/plus',
        destination: '/pricing',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

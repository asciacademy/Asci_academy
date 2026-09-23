/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'date-fns',
      'recharts',
      'cmdk',
    ],
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

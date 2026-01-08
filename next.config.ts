
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Use Cloudinary loader for automatic optimizations
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
    // Define device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow these remote patterns as fallback
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      }
    ],
    // Minimize image loading time
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Supported formats
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

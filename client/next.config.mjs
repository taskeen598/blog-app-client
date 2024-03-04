/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: '"daisyui.com"',
            port: '',
          },
        ],
      },
};

export default nextConfig;
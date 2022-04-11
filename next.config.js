/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'i.pravatar.cc', 'i.picsum.photos', 'cloudflare-ipfs.com', 'picsum.photos']
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.xiaomimimo.com" },
      { protocol: "https", hostname: "**.cdn.xiaomimimo.com" }
    ]
  }
};

export default nextConfig;

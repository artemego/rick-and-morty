/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["rickandmortyapi.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://rickandmortyapi.com/:path*",
      },
    ];
  },
};

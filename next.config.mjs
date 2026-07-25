/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Hosted as a GitHub Pages *user site* (rkavasseri.github.io), which serves
  // from the domain root — so no basePath/assetPrefix. If this ever moves to a
  // project repo, set both to '/<repo-name>' and '/<repo-name>/' in production.
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;

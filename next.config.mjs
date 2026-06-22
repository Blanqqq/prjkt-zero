import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: { removeConsole: process.env.NODE_ENV === "production" },
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      // /v3 retired — its composition was promoted to the site root. A true
      // 308 at the routing layer (cleaner for SEO than a client-side redirect).
      { source: "/v3", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;

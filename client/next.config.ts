import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[{
        protocol:'https',
        hostname:'res.cloudinary.com'
    }]
  }
};

// export default nextConfig;
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
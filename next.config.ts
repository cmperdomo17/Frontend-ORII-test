import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    basePath: "/orii-front",
    output: 'standalone',
    trailingSlash: true,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/orii-front',
                permanent: false,
                basePath: false,
            },
        ];
    },
};

export default nextConfig;
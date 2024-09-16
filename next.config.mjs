
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@node-rs/argon2"],
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    }

};

export default withNextIntl(nextConfig);


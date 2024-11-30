/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true // Disables TypeScript build errors
    },
    eslint: {
        ignoreDuringBuilds: true // Disables ESLint build errors
    }
};

module.exports = nextConfig;

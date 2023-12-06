/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
    // disable: process.env.NODE_ENV === 'development',
    register: false,
    // scope: '/app',
    // sw: 'service-worker.js',
    //...
});

const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
            }
        ],
        loader: 'custom',
        loaderFile: './src/components/contentfulImage.js',
        deviceSizes: [400, 800, 1280, 1920, 2048, 3840]
    },
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'en',
        localeDetection: false,
    },
    pwa: {
        dest: 'public',
    
    }
};

module.exports = withPWA(nextConfig);

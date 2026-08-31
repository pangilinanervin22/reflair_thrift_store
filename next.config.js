/** @type {import('next').NextConfig} */

const securityHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig = {
    poweredByHeader: false,
    images: {
        qualities: [75, 100],
        remotePatterns: [
            // Legacy UploadThing host — existing product images live here
            { protocol: 'https', hostname: 'utfs.io', pathname: '/f/**' },
            // UploadThing v7 serves new uploads from <appId>.ufs.sh
            { protocol: 'https', hostname: '*.ufs.sh', pathname: '/f/**' },
        ],
    },
    async headers() {
        return [{ source: '/:path*', headers: securityHeaders }];
    },
}

module.exports = nextConfig

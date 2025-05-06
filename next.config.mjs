/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.dicebear.com",
            },
        ],
    },
    async redirects() {
        return [
            {
                source: "/crm",
                destination: "/crm/mtech",
                permanent: false,
            },
        ]
    }
};

export default nextConfig;

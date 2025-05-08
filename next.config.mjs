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
                source: "/dashboard/todos/todo",
                destination: "/dashboard/todos",
                permanent: true,
            },
        ]
    },
    devIndicators: false,
};

export default nextConfig;

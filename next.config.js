

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'dawid-food-ordering.s3.amazonaws.com', //for amazon s3
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            }
        ]
    }
}

module.exports = nextConfig
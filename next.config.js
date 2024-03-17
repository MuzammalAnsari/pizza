const path = require('path');

module.exports = {
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, './src');
        return config;
    },
};

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: '*.googleusercontent.com',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'dawid-food-ordering.s3.amazonaws.com',
//             },
//         ]
//     }
// }

// module.exports = nextConfig
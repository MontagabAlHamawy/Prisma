/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'montagab.vercel.app',

            }
        ]
    }
};

export default nextConfig;

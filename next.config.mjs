

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['cdn.pixabay.com'],
    },
    productionBrowserSourceMaps:true,
    webpack:(config) => {
        config.optimization.minimize = false;
        return config
    }
};

export default nextConfig;

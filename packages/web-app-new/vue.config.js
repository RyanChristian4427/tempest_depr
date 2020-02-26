module.exports = {
    devServer: {
        // https: {
        //     key: require('fs').readFileSync('./certs/localhost-key.pem'),
        //     cert: require('fs').readFileSync('./certs/localhost.pem'),
        // },
        proxy: {
            '/api': {
                target: 'https://localhost:8000',
                secure: false,
            },
        },
    },
    chainWebpack: (config) => {
        config.resolve.modules.add('./src');
    },
};

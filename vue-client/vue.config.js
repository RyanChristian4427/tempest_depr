const fs = require('fs');

module.exports = {
    devServer: {
        https: {
            key: fs.readFileSync('./certs/localhost-key.pem'),
            cert: fs.readFileSync('./certs/localhost.pem'),
        },
        proxy: {
            '/api': {
                target: 'https://localhost:8000',
                secure: false
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/styles/_tempest.scss";
                `
            }
        }
    }
};

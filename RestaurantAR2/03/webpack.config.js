const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
    entry: './script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new WebpackObfuscator({
            rotateStringArray: true
        }, [])
    ]
};

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
module.exports = {
    entry: {
        vendor: ['vue', 'vue-router']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '[name]-manifest.json'),
            name: '[name]',
            context: __dirname,
        }),
        new AssetsPlugin({
            filename: 'bundle-config.json',
            path: __dirname
        })
    ]
}
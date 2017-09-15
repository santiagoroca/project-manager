var path = require('path');
var webpack = require('webpack');

module.exports = {

    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'test.min.js',
            library: 'test',
        publicPath: 'http://localhost:8080/dist/'
    },

    devServer: {
        contentBase: './dist',
        host: '0.0.0.0',
        port: 8080,
        allowedHosts: [
            'localhost'
        ]
    },

    resolve: {
        modules: [
            path.resolve('./src')
        ]
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    stats: {
        colors: true
    },

};
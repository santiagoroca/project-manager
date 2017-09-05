var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {

    target: 'node',

    externals: [
        nodeExternals(),
        function(context, request, callback) {
            if (/^\.\/Config$/.test(request)){
                return callback(null, 'commonjs ' + request);
            }

            callback();
        }
    ],

    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'my-project.js'
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
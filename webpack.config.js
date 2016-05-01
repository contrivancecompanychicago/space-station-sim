var path = require('path');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_js = path.resolve(__dirname, 'src');
var dir_html = path.resolve(__dirname, 'html');
var dir_build = path.resolve(__dirname, 'dist');

module.exports = {
    entry: path.resolve(dir_js, 'main.js'),
    output: {
        path: dir_build,
        filename: 'bundle.js'
    },
    // devServer: {
    //     contentBase: dir_build,
    // },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: dir_js,
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {   test: /\.png$/,
                loader: "img-element!url"
            }
        ]
    },
    plugins: [
        // Simply copies the files over
        new CopyWebpackPlugin([
            { from: dir_html } // to: output.path
        ]),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    resolve:{
      root: process.cwd(),
      extensions: [
        '',
        '.js'
      ]
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map'
};

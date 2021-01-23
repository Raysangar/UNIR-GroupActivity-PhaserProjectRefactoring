const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
    CANVAS_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
});

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, 'src/main.js'),
        ],
        vendor: ['phaser'],
    },
    devtool: 'cheap-source-map',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dev'),
        publicPath: './dev/',
        library: '[name]',
        libraryTarget: 'umd',
        filename: '[name].js',
    },
    watch: true,
    plugins: [
        definePlugin,
        // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */ }),
        new HtmlWebpackPlugin({
            filename: '../generated.html',
            template: './src/index.html',
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            minify: {
                removeAttributeQuotes: false,
                collapseWhitespace: false,
                html5: false,
                minifyCSS: false,
                minifyJS: false,
                minifyURLs: false,
                removeComments: false,
                removeEmptyAttributes: false,
            },
            hash: false,
        }),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: ['./', './dev'],
                index: 'generated.html',
            },
        }),
    ],
    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' },
        ],
    },
};
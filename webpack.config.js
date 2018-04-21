//import WebpackHtmlPlugin from 'html-webpack-plugin';
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

module.exports = {
    entry: "./app/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index-bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.(css)$/, use: ['style-loader', 'css-loader']},
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./app/index.html"
    }),
        new webpack.DefinePlugin({
            'RAIL_KEY': JSON.stringify(process.env.RAIL_KEY),
            'RAIL_URL': JSON.stringify(process.env.RAIL_URL),
        })],
    devServer: {
        historyApiFallback: true
    }

}



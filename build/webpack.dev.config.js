'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                {from: /.*/, to: path.posix.join('/', 'index.html')},
            ],
        },
        hot: true,
        contentBase: false,
        compress: true,
        host: 'localhost',
        port: '9700',
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        publicPath: '/',
        quiet: true,
        watchOptions: {
            poll: false,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: 'static',
                ignore: ['.svn']
            }
        ]),
        new ExtractTextPlugin({
            filename: path.posix.join('static', 'css/[name].css'),
        }),
    ]
})
module.exports = new Promise((resolve, reject) => {
    devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
            messages: [`Your application is running here: http://localhost:9700`],
        }
    }))
    resolve(devWebpackConfig)
})

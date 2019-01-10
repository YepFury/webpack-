'use strict'
const path = require('path')
const config = require('../config')

exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
    options = options || {}
    function generateLoaders(loader, loaderOptions) {
        const loaders = [
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                loader: 'less-loader',
                options: {
                    sourceMap: true
                }
            }
        ]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
    }

    return {
        css: generateLoaders(),
        less: generateLoaders('less')
    }
}

exports.styleLoaders = function (options) {
    const output = []
    const loaders = [
        {
            css: {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            }
        },
        {
            less: {
                loader: 'less-loader',
                options: {
                    sourceMap: true
                }
            }
        }
    ]

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
    }
}

let path = require("path"),

    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    postCssConfig = require('./postcss.config.js'),
    //HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin'),
    ROOT = process.cwd(); //根目录

//const manifest = require("./vendor-manifest.json");

//const bundleConfig = require("./bundle-config.json");



module.exports = {
    entry: {
        main: './src/main.js',
        vendor: ['vue', "vue-router"]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js?v=[chunkhash:8]'
    },
    resolve: {
        extensions: ['*', '.js', 'json', '.vue'],
        //fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    devtool: 'inline-source-map',
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000'
        },
        contentBase: path.join(__dirname, "dist"),
        compress: true,
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: {
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            fallback: "style-loader",
                            use: [{
                                    loader: "css-loader",
                                    options: {
                                        importLoaders: 2,
                                        minimize: true
                                    }
                                },
                                {
                                    loader: "postcss-loader",
                                    options: {
                                        config: {
                                            path: "./postcss.config.js"
                                        }
                                    }
                                },
                                "sass-loader"
                            ]
                        })
                    }
                }
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                // exclude:'./node_modules/',
                options: {
                    presets: ['es2015']
                }
            }
        }, {
            test: /\.(png|jpg|jpeg|gif|woff)$/i,
            exclude: /node_modules/,
            use: {
                loader: 'url-loader',
                options: {
                    // path: path.resolve(__dirname, 'dist/img/'),

                    name: 'img/[name].[hash:8].[ext]',
                    limit: 70
                }
            }
        }, {
            test: /\.(htm|html)$/i,
            exclude: /node_modules/,
            loader: "html-withimg-loader?min=false"
        }, {
            test: /\.scss$/i,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        minimize: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: './postcss.config.js'
                        }
                    }
                }, 'sass-loader']
            })
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/'], {
            "root": __dirname, // An absolute path for the root. 
            "verbose": true, // Write logs to console. 
            "watch": false // If true, remove files on recompile. (Default: false) 

        }),
        new webpack.DefinePlugin({
            'isDev': true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            //bundleName: bundleConfig.vendor.js
            //chunks: ['vendor', 'main']
        }),
        // new HtmlWebpackIncludeAssetsPlugin({
        //     assets: bundleConfig.vendor.js,
        //     append: false,
        //     jsExtensions: ['.js']
        // }),
        new ExtractTextPlugin({
            filename: 'css/app.css?v=[contenthash:8]',
            allChunks: true
        }),
        //new webpack.optimize.UglifyJsPlugin({
        //compress: {
        //    warnings: false
        //  },
        // sourceMap: true
        //}),
        new webpack.ProvidePlugin({
            Vue: 'vue',
            vue: 'vue'

        }),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require("./vendor-manifest.json")
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['vendor'],
            minChunks: Infinity
        })
    ]

}
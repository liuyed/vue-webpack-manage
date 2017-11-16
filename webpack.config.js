let path = require("path"),

    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    postCssConfig = require('./postcss.config.js'),
    ROOT = process.cwd(); //根目录



module.exports = {
    entry: './src/main.js',
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
            loader: 'vue-loader'
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
        new webpack.DefinePlugin({
            'isDev': true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new ExtractTextPlugin({
            filename: 'css/app.css?v=[contenthash:8]',
            //allChunks: true
        }),
    ]

}
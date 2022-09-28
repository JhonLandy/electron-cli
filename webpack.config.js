const path = require('path')
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const PurifyCSS = require('purifycss-webpack')
// const glob = require('glob-all')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    target: "web",
    'mode': 'development',
    'devtool': 'source-map',
    'entry': './src/index.ts', // 单入口
    // entry: {
    //     main1:"./src/main1",
    //     main2:"./src/main2"
    // },//多入口
    'output': {
        'path': path.resolve(__dirname, 'app_dist'),
        'filename': './index.js', // 使用[name]打包出来的js文件会分别按照入口文件配置的属性来命名        publicPath: './',
    },
    'resolve': {
        'extensions': ['ts','tsx','.js', 'jsx','.vue', '.json', 'css','sass'],
        'alias': {
            '@': path.resolve('src')
        }
    },
    'module': {
        'rules': [
            {
                'test': /\.vue$/,
                loader: "vue-loader",
            },
            {
                'test': /\.(js|jsx|ts|tsx)$/,
                'use': 'babel-loader',
                'exclude': /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            // sass-loader version >= 8
                            sassOptions: {
                                indentedSyntax: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: [
                    {
                        'loader': 'url-loader',
                        'options': {
                            name: '[name].[ext]',
                            outputPath: 'assets/font',
                            limit: 3 * 1024,
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|jpeg|webp|gif)$/,
                use: [
                    {
                        'loader': 'url-loader',
                        'options': {
                            name: '[name].[ext]',
                            outputPath: 'assets/img',
                            limit: 3 * 1024, // 对小体积的资源图片进行管理，小图片转成base64,减少请求数量
                            esModule: false
                        }
                    }
                ]
            }
            // {有 url-loader 无需使用，但url-loader 依赖file-loader，file-loader必须下载
            //     "test": /\.(jpg)$/,
            //     "use": [
            //         {
            //             "loader": 'file-loader',
            //             "options": {
            //                 "name": '[name].[ext]',
            //                 "outputPath": './image',
            //                 "esModule": false,
            //             }
            //         }
            //     ]
            // },
        ]
    },
    // 'optimization': {
    //     sideEffects: true,
    //     splitChunks: {
    //         chunks: 'all',
    //         // minSize: 20000,//webpack4配置
    //         // maxSize: 0,
    //         // minChunks: 1,
    //         // maxAsyncRequests: 5,
    //         // maxInitialRequests: 3,
    //         // automaticNameDelimiter: '~',
    //         minSize: { // webpack5的变化
    //             javascript: 30000,
    //             webassembly: 50000
    //         },
    //         cacheGroups: {
    //             elementUI: {
    //                 name: 'chunk-elementUI', // split elementUI into a single package
    //                 priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
    //                 test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
    //             },
    //             styles: {
    //                 name: 'styles',
    //                 test: /\.css$/,
    //                 chunks: 'all',
    //                 enforce: true,
    //                 priority: 20
    //             },
    //             libs: {
    //                 name: 'chunk-libs',
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: 10,
    //                 chunks: 'initial' // only package third parties that are initially dependent
    //             }
    //         }
    //     },
    //     usedExports: true // Tree Shaking
    // },
    'plugins': [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'myWebPackDemo',
            // favicon: './public/favicon.ico',
            template: './public/index.html',
            filename: 'index.html',
            inject: true,
            minify: {
                // 压缩HTML⽂件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空⽩符与换⾏符
                minifyCSS: true // 压缩内联css
            }
        }),
        new MiniCssExtractPlugin({ // 放在HtmlWebpackPlugin后面
            'filename': 'css/[name].[hash].css',
            'chunkFilename': 'css/[id]-[contenthash].css'
        }),
        // new PurifyCSS({//无顺序要求,webpack5不支持
        //     paths: glob.sync([
        //         // 要做 CSS Tree Shaking 的路径⽂件
        //         path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对 html ⽂件进⾏ tree shaking
        //         path.resolve(__dirname, './src/*.js')
        //     ])
        // }),
        // new OptimizeCSSAssetsPlugin({ // 放在MiniCssExtractPlugin后面
        //     cssProcessor: require('cssnano'), // 引⼊cssnano配置压缩选项
        //     cssProcessorOptions: {
        //         discardComments: { removeAll: true }
        //     }
        // })
    ],
    // 'devServer': {
        // 生成的虚拟目录路径
        // contentBase: path.resolve(__dirname, "dist"),
        // 自动开启浏览器
        // host: "127.0.0.1",
        // 'open': true,
        // 端口
        // 'port': 8081,
        // 'historyApiFallback': true,
        // 'proxy': {
        //     '/ycl': {
        //         'target': 'http://127.0.0.1:4000',
        //         'changeOrigin': true,
        //         'pathRewrite': {
        //             '^/ycl': ''
        //         }
        //
        //     }
        // },
        // client: {progress: true},
        // 'hot': true,
    // }
}

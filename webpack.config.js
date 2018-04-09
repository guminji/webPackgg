/**
 * Created by guminji on 2018/4/3.
 */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        'build/app1/app1':'./assest/js/scence/index.js',
        'build/app2/app2':'./assest/js/bootstrap.js'
    },

    //['./assest/js/scence/index.js','./assest/js/bootstrap.js'], //入口文件
    //entry: ['./assest/js/bootstrap.js','./assest/js/modules/second.js'],//入口文件
    devtool: 'source-map',//调试工具 能够在源文件上面打断点 报错信息更加明确
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "This is the app1",
            filename: "./index.html",
            template: "./assest/html/index.html",
            inject: "body",
            favicon: "",
            minify: {
                caseSensitive: false,
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            },
            hash: true,
            cache: true,
            showErrors: true,
            chunks: ['build/app1/app1'],
            chunksSortMode: "auto",
            excludeChunks: "",
            xhtml: false
        }),
        new HtmlWebpackPlugin({
            title: "This is the app2",
            filename: "./index2.html",
            template: "./assest/html/index.html",
            inject: "body",
            favicon: "",
            minify: {
                caseSensitive: false,
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            },
            hash: true,
            cache: true,
            showErrors: true,
            chunks: ['build/app2/app2'],
            chunksSortMode: "auto",
            excludeChunks: "",
            xhtml: false
        }),

    ]
}

/**
 * Created by guminji on 2018/4/3.
 */
var path = require('path');
var webPackConfig = {
    mode: 'development',
        entry: {
        'build/app1/app1':'./assest/js/scence/index.js',
        'build/app2/app2':'./assest/js/bootstrap.js'
    },

    //['./assest/js/scence/index.js','./assest/js/bootstrap.js'], //入口文件
    //entry: ['./assest/js/bootstrap.js','./assest/js/modules/second.js'],//入口文件
    devtool: 'source-map',//调试工具 能够在源文件上面打断点 报错信息更加明确
    output: {
        path: path.resolve(__dirname, './build/js'),
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
        //new HtmlWebpackPlugin({
        //    title: "This is the app2",
        //    filename: "./index2.html",
        //    template: "./assest/html/index.html",
        //    inject: "body",
        //    favicon: "",
        //    minify: {
        //        caseSensitive: false,
        //        collapseBooleanAttributes: true,
        //        collapseWhitespace: true
        //    },
        //    hash: true,
        //    cache: true,
        //    showErrors: true,
        //    chunks: ['build/app2/app2'],
        //    chunksSortMode: "auto",
        //    excludeChunks: "",
        //    xhtml: false
        //}),

    ],
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        hot:true,
        port: 3000
    },
    //devServer:{
    //    watchOptions: {
    //        poll: true
    //    }
    //},
    //watchOptions:{
    //    aggregateTimeout: 300,//防止重复按键，500毫米内算按键一次
    //    poll: 1000,//监测修改的时间(ms)
    //}
}
var HtmlWebpackPlugin = require('html-webpack-plugin');
//**获取配置
var glob = require('glob');
//var webPackConfig = require('../webpack.config.js');
var webpack = require('webpack');
var entryFiles = glob.sync('./assest/js/scence/*.js');
var Entries = {

};
//检索入口文件 配置新的入口文件
entryFiles.forEach((filePath,index)=>{
    var filePaths = filePath.split('/');
    fileName = filePaths[filePaths.length-1];
    fileName = fileName.split('.js').join('');
    Entries[fileName] = filePath;
})
webPackConfig.entry = Entries;
//配置新的HtmlWebpackPlugin
entryFiles.forEach((filePath,index)=>{
    var filePaths = filePath.split('/');
    fileName = filePaths[filePaths.length-1];
    fileName = fileName.split('.js').join('');
    var webpackPlugins =new HtmlWebpackPlugin({
        title: fileName,
        filename: "../html/"+fileName+".html",
        template: "./assest/html/index.html",
        inject: "body",
        favicon: "",
        //minify: {  //压缩
        //    caseSensitive: false,
        //    collapseBooleanAttributes: true,
        //    collapseWhitespace: true
        //},
        hash: true,
        cache: true,
        showErrors: true,
        chunks: [fileName],
        chunksSortMode: "auto",
        excludeChunks: "",
        xhtml: false
    })
    webPackConfig.plugins.push(webpackPlugins);
})
module.exports = webPackConfig;

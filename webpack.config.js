/**
 * Created by guminji on 2018/4/3.
 */
var webpack = require('webpack');
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
        path: path.resolve(__dirname, './dist/js'),
        filename: '[name].bundle.js',
        //publicPath:'./dist'
        //publicPath:'http://localhost:3000/js'
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
        new webpack.HotModuleReplacementPlugin()

    ],
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        //host: 'localhost',
        port:3000,
        //disableHostCheck: true,
        //historyApiFallback: true,
        //noInfo: true,
        //overlay: true,
        publicPath:'http://localhost:3000/js',//指向dev webserver中内存中静态文件地址 html中的src在这里改变 要不指向的output中的生成的静态文件的地址 无法检测到更新
        //hot:true
    },
}
var HtmlWebpackPlugin = require('html-webpack-plugin');
//**获取配置
var glob = require('glob');
//var webPackConfig = require('../webpack.config.js');
var entryFiles = glob.sync('./assest/js/scence/*.js');
var Entries = {

};
//检索入口文件 配置新的入口文件
entryFiles.forEach((filePath,index)=>{
    var filePaths = filePath.split('/');
    fileName = filePaths[filePaths.length-1];
    fileName = fileName.split('.js').join('');
    Entries[fileName] = ['webpack-dev-server/client?http://localhost:3000',filePath];
})
webPackConfig.entry = Entries;
//配置新的HtmlWebpackPlugin
entryFiles.forEach((filePath,index)=>{
    var filePaths = filePath.split('/');
    fileName = filePaths[filePaths.length-1];
    fileName = fileName.split('.js').join('');
    var webpackPlugins =new HtmlWebpackPlugin({
        title: fileName,
        filename: '../html/'+fileName+".html",
        chunks: [fileName],
        template: "./assest/html/index.html",
        //inject: "body",
        //favicon: "",
        //minify: {  //压缩
        //    caseSensitive: false,
        //    collapseBooleanAttributes: true,
        //    collapseWhitespace: true
        //},
        //hash: true,
        //cache: false,
        //showErrors: true,
        //chunks: [fileName],
        //chunksSortMode: "auto",
        //excludeChunks: "",
        //xhtml: false
    })
    webPackConfig.plugins.push(webpackPlugins);
})
module.exports = webPackConfig;

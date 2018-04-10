/**
 * Created by guminji on 2018/4/10.
 */
var glob = require('glob');
var webPackConfig = require('../webpack.config.js');
var webpack = require('webpack');
var entryFiles = glob.sync('./assest/js/scence/*.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
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
console.log(Entries);
console.log(webPackConfig);
webpack(webPackConfig,(err, stats) => {
    if (err || stats.hasErrors()) {
        console.log('编译出错了'+err);
        // Handle errors here

    }
    // Done processing
});



/**
 * Created by guminji on 2018/4/3.
 */
var path = require('path');
module.exports = {
    mode:'development',
    entry:'./assest/js/bootstrap.js', //入口文件
    //entry: ['./assest/js/bootstrap.js','./assest/js/modules/second.js'],//入口文件
    devtool:'source-map',//调试工具 能够在源文件上面打断点 报错信息更加明确
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]
            }
        ]
    }
}

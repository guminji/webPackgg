/**
 * Created by guminji on 2018/4/3.
 */
//文件index.js
var a = 1; //全局变量a
console.log('a=',a);
//直接引用index.js a就是全局变量

//webpack打包作为entry文件的入口bootstroop.js 被import导入
//这个时候a的作用域就在自身的模块内 类似于node require的作用域内
//module.exports = {
//
//}
#! /usr/bin/env node
//如果不是默认安装位置这个地方可能就找不到，那么文件就是报错,所以有了另一种写法

// #!/usr/bin/node
// 调用系统环境变量中的解释器执行文件

const path = require("path");
const Compiler = require("../lib/Compiler.js");
// 1、需要找到当前执行命令的路径，拿到webpack.config.js

const config = require(path.resolve("webpack.config.js"));

//2、实例化编译对象
const compiler = new Compiler(config);

//3、开始编译
compiler.run();
console.log("测试d-webpack", process.cwd());

const path = require("path");

class Compiler {
	constructor(options) {
		//entry ouput
		this.options = options;
		//保存入口文件路径
		this.entryId; //src/index.js

		//保存所有模块的依赖
		this.modules = {};

		//入口文件路径
		this.entry = options.entry;

		//工作路径 C:\Users\1111\Desktop\d-webpack>
		this.root = process.cwd();
	}
	run() {
		//执行，创建模块的依赖关系
		this.buildModule(path.resolve(this.root, this.entry), true);

		//发射一个文件， 打包后的文件
		this.emitFile();

		console.log("run");
	}
}

module.exports = Compiler;

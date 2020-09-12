const path = require("path");
const fs = require("fs");
const babylon = require("babylon"); //将源码解析成ast，parse方法
const traverse = require("@babel/traverse").default; //遍历ast
const t = require("@babel/types"); //替换ast的节点
const generator = require("@babel/generator").default; // 生成代码
const ejs = require("ejs");

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
	/**
	 * 获取源码
	 * @param {string} modulePath 文件路径
	 *
	 * @returns {string} 源码
	 */
	getSource(modulePath) {
		let source = fs.readFileSync(modulePath, "utf-8");
		//拿到webpack.config.js中module.rules
		let rules = this.options.module.rules;

		for (let i = 0, length = rules.length; i < length; i++) {
			let rule = rules[i]; //{test:/.less$/,use:[loaders]}
			let { test, use } = rule;
			let len = use.length - 1;
			if (test.test(modulePath)) {
				//这个模块需要对应的loader来处理
				//loader获取对应的loader函数
				const normalLoader = () => {
					let loader = require(use[len--]);
					source = loader(source);
					if (len >= 0) {
						normalLoader();
					}
				};
				normalLoader();
			}
		}

		return source;
	}
	/**
	 * 解析AST
	 * @param {*} source 源码
	 * @param {*} parentPath 源码父路径
	 */
	parse(source, parentPath) {
		let ast = babylon.parse(source);
		let dependencies = []; //依赖的数组
		//百度astexplorer
		traverse(ast, {
			CallExpression(p) {
				//直接调用 a() require()
				let node = p.node; //对应的节点
				// console.log("node", node);
				if (node.callee.name === "require") {
					node.callee.name = "__webpack_require__";
					let moduleName = node.arguments[0].value; //取到的就是模块的引用名字 a
					moduleName = moduleName + (path.extname(moduleName) ? "" : ".js");
					moduleName = "./" + path.join(parentPath, moduleName); //   ./src/a.js
					console.log(moduleName);
					dependencies.push(moduleName);

					//替换node.arguments
					node.arguments = [t.stringLiteral(moduleName)];
				}
			},
		});

		let sourceCode = generator(ast).code;
		return {
			sourceCode,
			dependencies,
		};
	}
	/**
	 * 构建模块，创建模块依赖关系
	 * @param {*} modulePath 模块路径,绝对路径
	 * @param {*} isEntry 是否是入口文件
	 */
	buildModule(modulePath, isEntry) {
		//1、获取源码内容
		const source = this.getSource(modulePath);
		//2、模块id(./src/index.js) moduleName = modulePath - this.root    src/index.js
		let moduleName = "./" + path.relative(this.root, modulePath);
		// moduleName = moduleName.replace(/\\/g, "/");
		// console.log(moduleName, this.root, modulePath, path.dirname(moduleName), path.relative(this.root, modulePath));
		if (isEntry) {
			this.entryId = moduleName; //保存入口id
		}
		//3、解析需要把源码source进行改造，返回一个依赖表
		const { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));
		//4、把相对路径和模块中的内容对应起来
		this.modules[moduleName] = sourceCode;

		//5、递归依赖
		dependencies.forEach((dep) => {
			// ./src/a.js
			// dep = dep.replace(/\\/g, "/");
			this.buildModule(path.join(this.root, dep), false);
		});

		// console.log(">>>>>>>>>>", sourceCode, dependencies);
	}
	/**
	 * 拿到模板渲染打包出来的数据
	 */
	emitFile() {
		//1、拿到输出到哪个一个目录的路径
		let main = path.join(this.options.output.path, this.options.output.filename);
		//读取模板
		let templateStr = this.getSource(path.resolve(__dirname, "template.ejs"));
		//用ejs渲染
		let chunkCode = ejs.render(templateStr, { entryId: this.entryId, modules: this.modules });

		this.assets = {}; //存放资源
		this.assets[main] = chunkCode;

		//将模板内容以及数据渲染到输出目录
		fs.writeFileSync(main, this.assets[main]);
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

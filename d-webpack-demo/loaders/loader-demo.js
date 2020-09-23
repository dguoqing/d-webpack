//测试手写loader

const chalk = require("chalk");
function loader(source) {
	console.log(chalk.yellow(Object.keys(this), "loader-demo"));
	return source;
}

module.exports = loader;

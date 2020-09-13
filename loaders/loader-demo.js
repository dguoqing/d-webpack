//测试手写loader
function loader(source) {
	console.log("loader-demo");
	return source;
}

module.exports = loader;

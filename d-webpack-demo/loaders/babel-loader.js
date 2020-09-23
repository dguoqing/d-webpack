const babel = require("@babel/core");
const loaderUtils = require("loader-utils");

function loader(source) {
	//添加异步
	let cb = this.async();
	let options = loaderUtils.getOptions(this);
	babel.transform(
		source,
		{
			...options,
			sourceMaps: true,
			filename: this.resourcePath.split("\\").pop(),
		},
		function (err, res) {
			// console.log(err, res);
			cb(err, res.code, res.map);
		}
	);
	return source;
}
module.exports = loader;

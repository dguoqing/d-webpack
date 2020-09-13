const path = require("path");

class P {
	apply(compiler) {
		compiler.hooks.emit.tap("emit", () => {
			console.log("emit");
		});
	}
}
module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /.less$/,
				use: [path.resolve(__dirname, "loaders", "style-loader.js"), path.resolve(__dirname, "loaders", "less-loader.js")],
			},
		],
	},
	plugins: [new P()],
};

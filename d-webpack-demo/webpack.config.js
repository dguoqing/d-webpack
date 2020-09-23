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
	resolveLoader: {
		alias: {
			"loader-demo": path.resolve(__dirname, "loaders", "loader-demo"),
		},
		// modules: ["node_modules", path.resolve(__dirname, "loaders")],
	},
	module: {
		rules: [
			// {
			// 	test: /.js$/,
			// 	use: [
			// 		{
			// 			loader: "loader-demo",
			// 		},
			// 		// {
			// 		// 	loader: "babel-loader",
			// 		// 	options: {
			// 		// 		presets: ["@babel/preset-env"],
			// 		// 	},
			// 		// },
			// 	],
			// },
			{
				test: /.less$/,
				use: [path.resolve(__dirname, "loaders", "style-loader.js"), path.resolve(__dirname, "loaders", "less-loader.js")],
			},
		],
	},
	plugins: [],
};

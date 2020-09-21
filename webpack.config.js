const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	resolveLoader: {
		// alias: {
		// 	"loader-demo": path.resolve(__dirname, "loaders", "loader-demo"),
		// },
		modules: ["node_modules", path.resolve(__dirname, "loaders")],
	},
	module: {
		rules: [
			{
				test: /.js$/,
				use: [
					{
						loader: "loader-demo",
					},
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
						},
					},
				],
			},
		],
	},
};

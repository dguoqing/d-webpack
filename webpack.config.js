const path = require("path");

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
	},
	module: {
		rules: [
			{
				test: /.js$/,
				use: [
					{
						loader: "loader-demo",
						options: {
							preset: ["@babel/preset-env"],
						},
					},
				],
			},
		],
	},
};

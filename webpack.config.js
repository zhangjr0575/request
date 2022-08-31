const path = require("path");

module.exports = {
	entry: {
		index: "./src/main.ts"
	},
	mode: "production",
	output: {
		filename: "[name].js",
		libraryTarget: "umd",
		library: "Request",
		path: path.resolve(__dirname, "dist")
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src")
		},
		extensions: [".tsx", ".ts", ".jsx", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ["ts-loader"],
				include: [path.resolve(__dirname, "src")]
			}
		]
	},
	performance: {
		hints: false
	}
};

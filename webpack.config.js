const path = require('path');

module.exports = {
	entry: {
		index: './src/main.ts',
		alipay: './src/adapters/mp-alipay.ts'
	},
	mode: 'production',
	// mode: 'development',
	output: {
		filename: '[name].js',
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		},
		extensions: ['.tsx', '.ts', '.jsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ['ts-loader'],
				include: [path.resolve(__dirname, 'src')]
			}
		]
	}
};

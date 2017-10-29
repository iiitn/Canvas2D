module.exports = {
	entry: {
		"index": './Canvas/browser.ts'
	},
	output: {
		filename: 'bundle/[name].js'
	},

	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader'
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	}
};
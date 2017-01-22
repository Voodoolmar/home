var webpack = require("webpack");
module.exports = {
	entry: './server/server.tsx',
	devtool: 'inline-source-map',
	output: {
		filename: './server/serverBundle.js',
		libraryTarget: 'commonjs2'
	},

	target: 'node',
	externals: /^[a-z][a-z\.\-0-9]*$/,
	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false
	},
	noParse: /pickmeup]\/js\/jquery.pickmeup.min.js/,
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.tsx', '.ts', '.js']
	},
	module: {
		loaders: [
			{ test: /\.ts(x?)$/, loader: 'awesome-typescript-loader' }
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
		})
	]
}
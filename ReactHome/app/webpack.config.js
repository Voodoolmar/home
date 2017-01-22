var webpack = require("webpack");   
// var package = require("./package.json");
// var modules = [];
// for(var x in package.dependencies) {
// 	modules.push(x);
// }

module.exports = {
		watch: true,
		entry: './app/bootstrap.tsx',
		devtool: 'inline-source-map',
		output: {
			filename: './public/js/bundle.js'
		},
		resolve: {
			extensions: ['', '.webpack.js', '.web.js', '.tsx', '.ts', '.js']
		},
		module: {
			loaders: [
				{ test: /\.ts(x?)$/,  loader: 'awesome-typescript-loader' },
				{
					test: /\.ts(x?)$/,
					loader: 'imports?$=jquery'
				},
				{
					test: /controls/,
					loader: 'imports?ui=jquery-ui'
				},
				{
					test: /\DatePicker.ts(x?)$/,
					loader: 'imports?datetimepicker=eonasdan-bootstrap-datetimepicker'
				}
			]
		},
		plugins: [
			new webpack.optimize.DedupePlugin()
		]
}
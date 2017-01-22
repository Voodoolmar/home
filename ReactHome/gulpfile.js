var gulp = require('gulp');
var tsc = require('typescript');
var gutil = require('gulp-util');
var webpack = require('webpack');
var clientConfig = require('./app/webpack.config');
var serverConfig = require('./server/webpack.config');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('build', ['client']);

gulp.task('client', function (callback) {
	if(gutil.env.needcallback){
		clientConfig.watch = false;
	}
	webpack(clientConfig, function (err, stats) {
		if (err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
			colors: true,
			children: false,
			chunks: false,
			modules: false
		}));
		if(!clientConfig.watch){
			callback()
		}
	});
});

gulp.task("server", function (callback) {
	webpack(serverConfig, function (err, stats) {
		if (err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
			colors: true,
			children: false,
			chunks: false,
			modules: false
		}));
		callback();
	});
});


gulp.task('default', ['client', 'server']);
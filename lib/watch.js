require('./util.js');
const shell = require('./cli.js');
const chokidar = require('chokidar');
const _ = require('underscore');

var watcher = null;
var ready = false;
module.exports.start = function() {

	if (!watcher) {
		watcher = chokidar.watch(X.Config.Watch, {
			persistent: true,
			ignored: '*.html',
			ignoreInitial: false,
			followSymlinks: true,
			disableGlobbing: false,
		});
	}

	watcher
		.on('change', onChange)
		.on('error', function(err) {
			Error(err);
		})
		.on('add', function(path) {

		})
		.on('ready', function() {
			X.Info('自动编译工具已启动监听...');
			ready = true;
		})

	function onChange(path) {
		var ext = path.substring(path.lastIndexOf('.') + 1, path.length),
			flag = false;
		X.Log('[%s]:%s', ext, path);
		if (_.indexOf(X.Config.IgnoreExt, ext) == -1) {
			X.Config.IgnoreFile.forEach(function(v) {
				flag = path.indexOf(v) > -1;
			})
			if (!flag) {
				_.throttle(function() {
					shell.autoBuild();
				}, 400)();
			}
		}
	}
}
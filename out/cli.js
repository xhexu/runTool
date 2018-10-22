require('shelljs/global');
const chokidar = require('chokidar');
const iconv = require('iconv-lite');
const _ = require('underscore');

var watcher = null;
var ready = false;

module.exports.start = function() {

	if (!watcher) {
		watcher = chokidar.watch('D:/GIT_APP/dev/HRPMobileOffice/HRPApp2.0/www/', {
			persistent: true,
			ignored: '*.html',
			ignoreInitial: false,
			followSymlinks: true,
			disableGlobbing: false,
		});
	}

	var notExistsFile = [
		'kyee.build.all.js'
	];

	var notExistsExt = ['html', 'css']

	watcher
		.on('add', function(path) {

		})
		.on('change', function(path) {
			var ext = path.substring(path.lastIndexOf('.') + 1, path.length),
				flag = false;
			console.log('%s is change:%s', ext, path);
			if (_.indexOf(notExistsExt, ext) == -1) {
				notExistsFile.forEach(function(v) {
					flag = path.indexOf(v) > -1;
				})
				if (!flag) {
					_.throttle(function() {
						cd("D:/GIT_APP/dev/HRPMobileOffice/HRPApp2.0/builder/grunt/dev")
						ls("*.json")
						var child = exec("grunt", {
							async: true,
							encoding: 'buffer'
						});
						child.stdout.on('data', function(chunk) {
							console.log(iconv.decode(chunk, 'GBK'));
						})
					}, 400)();
				}
			}
		})
		.on('error', function(err) {
			console.error(err);
		})
		.on('ready', function() {
			console.log('自动编译工具已启动...');
			ready = true;
		})
}
require('shelljs/global');
require('./util.js');

const option = {
	async: true,
	silent: true
}

function autoBuild() {
	cd(X.Config.Grunt);
	exec("grunt", {
		async: true,
		encoding: 'utf-8'
	}).stdout.on('data', function(chunk) {
		X.Log(chunk);
	})
}

//监控系统服务
function monitorSysPID() {

	exec("tasklist", option).stdout.on('data', function(chunk) {
		var array = [];
		array.push(chunk);
		var fs = require('fs');
		var out = fs.createWriteStream('./cmd.txt');
		out.write(chunk);
		X.Log(array);
	})
}

function oneKeyStart() {
	const keys = Object.keys(X.Config.OneKeyStart);
	console.log(keys);

	//启动模拟器
	cd(X.Config.OneKeyStart.NemuPlayer);
	exec("NemuPlayer.exe", option).stdout.on('data', function(chunkA) {})
	//模拟器连接
	exec("adb connect 127.0.0.1:7555",option);


	cd("C:/Program Files (x86)/Youdao/YoudaoNote/");
	exec("YoudaoNote.exe", {
		async: true
	}).stdout.on('data', function(chunk) {
		X.Log(chunk);
	})

	// 
	// cd("C:/Windows/System32")
}

module.exports = {
	autoBuild: autoBuild,
	oneKeyStart: oneKeyStart
};

if (require.main === module) {
	monitorSysPID();
}
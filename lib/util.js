const fs = require('fs');
const path = require('path');
const clc = require('cli-color');

var X = Object.create(null);
X.Config = JSON.parse(fs.readFileSync(path.join(__dirname,'config.json')));
var Log = console.log.bind(Log);
X.Log = Log;
X.Info = function(info){
	console.log(clc.blue(info));
}
X.Error = function (error){
	console.log(clc.red(error));
};
global.X = X;

if(require.main === module){
	console.log(clc.green());
}
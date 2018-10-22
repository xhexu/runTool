require('shelljs/global');
// var shell =require('shelljs');


function run() {
	console.log('shell run...');

	ls('*.js').forEach(function(v) {
		// var str = cat('-n', v);
		// echo('hello world');
		// var obj = echo('hello world');
		// console.dir(Object.getOwnPropertyNames(obj));
		// echo('-n', 'no newline at end');
	});

	rm('-rf', '../out');
	cp('-R', '../lib', '../out');

	var obj = exec('node --version',{silent:true}).stdout;

	console.log(obj);


}



module.exports = run;


if (require.main === module) {
	run();
}
let Poliparser = require('..');

let data = '    ciao   ';

let p = {
	base: new Poliparser({
		f: 'str_trim'
	}).run(data),
	start: new Poliparser({
		f: 'str_trim',
		end: false
	}).run(data),
	end: new Poliparser({
		f: 'str_trim',
		start: false
	}).run(data),
	custom: new Poliparser({
		f: 'str_trim',
		value: [' ', '\t', 'c', 'o']
	}).run(data)
};

console.log(p);
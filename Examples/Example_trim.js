let Poliparser = require('..');

let data = '    ciao   ';

let p = {
	base: new Poliparser({
		m: 'str_trim'
	}).parse(data),
	start: new Poliparser({
		m: 'str_trim',
		end: false
	}).parse(data),
	end: new Poliparser({
		m: 'str_trim',
		start: false
	}).parse(data),
	custom: new Poliparser({
		m: 'str_trim',
		value: [' ', '\t', 'c', 'o']
	}).parse(data)
};

console.log(p);
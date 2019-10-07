let Poliparser = require('..');

let data = '    ciao   ';

let p = new Poliparser({
	base: {
		f: 'trim'
	},
	start: {
		f: 'trim',
		end: false
	},
	end: {
		f: 'trim',
		start: false
	},
	custom: {
		f: 'trim',
		value: [' ', '\t', 'c', 'o']
	}
});

let output = p.run(data);

console.log(output);
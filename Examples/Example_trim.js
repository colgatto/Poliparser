let Multiparser = require('..');

let data = '    ciao   ';

let m = new Multiparser({
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

let output = m.run(data);

console.log(output);
let Poliparser = require('..');

let data = `Contact Admin 011-11122111 Headquarter Industry Inc. 011-22211222`;

let p = new Poliparser({
	name: {
		f: 'regex',
		value: /Headquarter ([a-zA-Z0-9 ]+\.) .*/,
		only: 'matches'
	},
	phone: {
		f: 'regex',
		value: /[0-9]{3}-[0-9]{8}/g,
		only: 'full'
	}
});

let output = p.run(data);

console.log(output);
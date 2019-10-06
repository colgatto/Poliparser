let Multiparser = require('..');

let data = `Contact Admin 011-11122111 Headquarter Industry Inc. 011-22211222`;

let m = new Multiparser({
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

let output = m.run(data);

console.log(output);
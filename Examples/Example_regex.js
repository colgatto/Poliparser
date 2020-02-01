let Poliparser = require('..');

let data = `Contact Admin 011-11122111 Headquarter Industry Inc. 011-22211222`;

let p_name = new Poliparser({
	f: 'regex',
	value: /Headquarter ([a-zA-Z0-9 ]+\.) .*/,
	only: 'matches'
});

let p_phone = new Poliparser({
	f: 'regex',
	value: /[0-9]{3}-[0-9]{8}/g,
	only: 'full'
});

console.log(p_name.run(data));
console.log(p_phone.run(data));
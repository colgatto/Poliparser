let Poliparser = require('..');

let data = {name: 'foo', phone: '011-111222333'};

let p = new Poliparser({
	m: 'obj_getKey',
	value: 'phone'
});

let output = p.parse(data);

console.log(output);
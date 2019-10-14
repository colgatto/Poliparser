let Poliparser = require('..');

let data = {name: 'foo', phone: '011-111222333'};

let p = new Poliparser({
	val: {
		f: 'getKey',
		value: 'phone'
	}
});

let output = p.run(data);

console.log(output.val);
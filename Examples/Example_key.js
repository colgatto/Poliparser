let Poliparser = require('..');

let data = {name: 'foo', phone: '011-111222333'};

let p = new Poliparser({
	val: {
		f: 'key',
		value: 'phone'
	}
});

let output = p.run(data);

console.log(output.val);
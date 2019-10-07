let Multiparser = require('..');

let data = [
	{ val: 'data1' },
	{ val: 'data2' },
	{ val: 'data3' }
];

let m = new Multiparser({
	val: {
		f: 'custom',
		value: (d) => d.map( x => x.val)
	}
});

let output = m.run(data);

console.log(output.val);
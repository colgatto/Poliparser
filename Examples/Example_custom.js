let Poliparser = require('..');

let data = [
	{ val: 'data1' },
	{ val: 'data2' },
	{ val: 'data3' }
];

let p = new Poliparser({
	f: 'custom',
	value: (d) => d.map( x => x.val)
});

let output = p.run(data);

console.log(output);
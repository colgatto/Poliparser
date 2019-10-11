let Poliparser = require('..');

let data = [ 1, 1, [ 2, 2, [ 3, 3, [ 4 ] ], 2, 2, [ 3, 3 ] ], 1, 1, 1, [ 2, 2 ], 1 ];

let p = new Poliparser({
	base: {
		f: 'array_flat'
	},
	deep_1: {
		f: 'array_flat',
		deep: 1
	},
	deep_2: {
		f: 'array_flat',
		deep: 2
	},
	inverseDeep_1: {
		f: 'array_flat',
		deep: -1
	},
	inverseDeep_2: {
		f: 'array_flat',
		deep: -2
	}
});

let output = p.run(data);

console.log(output);
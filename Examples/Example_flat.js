let Poliparser = require('..');

let data = [ 1, 1, [ 2, 2, [ 3, 3, [ 4 ] ], 2, 2, [ 3, 3 ] ], 1, 1, 1, [ 2, 2 ], 1 ];

let p_base = new Poliparser({
	m: 'array_flat'
});
console.log('BASE:');
console.log(p_base.parse(data));

let p_deep_1 = new Poliparser({
	m: 'array_flat',
	deep: 1
})
console.log('DEEP 1:');
console.log(p_deep_1.parse(data));

let p_deep_2 = new Poliparser({
	m: 'array_flat',
	deep: 2
});
console.log('DEEP 2:');
console.log(p_deep_2.parse(data));

let p_inverseDeep_1 = new Poliparser({
	m: 'array_flat',
	deep: -1
});
console.log('INVERSE DEEP 1:');
console.log(p_inverseDeep_1.parse(data));

let p_inverseDeep_2 = new Poliparser({
	m: 'array_flat',
	deep: -2
});
console.log('INVERSE DEEP 2:');
console.log(p_inverseDeep_2.parse(data));

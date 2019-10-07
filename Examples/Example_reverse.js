let Poliparser = require('..');

let data = 'questa è una stringa da reversare';
let data2 = [
	'questa è',
	'una stringa da reversare'
];

let p = new Poliparser({
	val: {
		f: 'reverse'
	}
});

let output = p.run(data);
let output2 = p.run(data2);

console.log(output);
console.log(output2);
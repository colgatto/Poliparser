let Multiparser = require('..');

let data = 'questa è una stringa da reversare';
let data2 = [
	'questa è',
	'una stringa da reversare'
];

let m = new Multiparser({
	val: {
		f: 'reverse'
	}
});

let output = m.run(data);
let output2 = m.run(data2);

console.log(output);
console.log(output2);
let Poliparser = require('..');

let data = 'Hello my name is Poliparser';
let data64 = 'SGVsbG8gbXkgbmFtZSBpcyBQb2xpcGFyc2Vy';
let p = new Poliparser({
	val: {
		f: 'str_base64',
		value: 'encode'
	}
});
let p64 = new Poliparser({
	val: {
		f: 'str_base64',
		value: 'decode'
	}
});

let output = p.run(data);
let output64 = p64.run(data64);

console.log(output.val);
console.log(output64.val);
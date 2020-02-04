let Poliparser = require('..');

let data = 'Hello my name is Poliparser';
let data64 = 'SGVsbG8gbXkgbmFtZSBpcyBQb2xpcGFyc2Vy';

let p = new Poliparser({
	m: 'str_base64',
	value: 'encode'
});

let p64 = new Poliparser({
	m: 'str_base64',
	value: 'decode'
});



let output = p.parse(data);
let output64 = p64.parse(data64);

console.log(output);
console.log(output64);
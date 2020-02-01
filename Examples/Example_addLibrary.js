const Poliparser = require('..');

let p = new Poliparser();

//from object
p.setLibrary('myLib', {
	mul: (data, block) => {
		return data * block.value;
	},
	sum: (data, block) => {
		return data + block.value;
	}
});

//from file
p.requireLibrary('requiredLibrary', __dirname + '/myLibrary.js');

p.setParser({
	f: 'myLib_mul',
	value: 3
});
console.log(p.run(10));

p.setParser({
	f: 'myLib_sum',
	value: 2
});
console.log(p.run(10));

p.setParser({
	f: 'requiredLibrary_mod1',
});
console.log(p.run(10));
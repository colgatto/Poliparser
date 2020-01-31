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
	val_mul: {
		f: 'myLib_mul',
		value: 3
	},
	val_sum: {
		f: 'myLib_sum',
		value: 2
	},
	lib_require: {
		f: 'requiredLibrary_mod1',
	}
});

let out = p.run(10);

console.log(out);

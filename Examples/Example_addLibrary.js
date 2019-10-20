const Poliparser = require('..');

let p = new Poliparser({
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

p.setLibrary('myLib', {

	mul: (data, block) => {
		return data * block.value;
	},

	sum: (data, block) => {
		return data + block.value;
	}

});

//add by require method
p.requireLibrary('requiredLibrary', __dirname + '/myLibrary.js');

let out = p.run(10);

console.log(out);

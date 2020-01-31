const Poliparser = require('..');

let p = new Poliparser();

//from function
p.setModule('my_sum', function(data, block){
	return data + block.value;
});

//from file
p.requireModule('my_mul', __dirname + '/myModule.js');

//define parser
p.setParser({
	val_mul: {
		f: 'my_mul',
		value: 3
	},
	val_sum: {
		f: 'my_sum',
		value: 2
	}
});

let out = p.run(10);

console.log(out);

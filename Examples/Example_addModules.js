const Poliparser = require('..');

let p = new Poliparser({
	val_mul: {
		f: 'my_parse_module_mul',
		value: 3
	},
	val_sum: {
		f: 'my_parse_module_sum',
		value: 2
	},
	val_hello: {
		f: 'myModule'
	},
},{
	//add by constructor
	my_parse_module_mul: (data, block) => {
		return data * block.value;
	}
});

//add by method
p.setModule('my_parse_module_sum', (data, block) => {
	return data + block.value;
});

//add by require method
p.requireModule('myModule', __dirname + '/myModule.js');

let out = p.run(10);

console.log(out);

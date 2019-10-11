const Poliparser = require('..');

let p = new Poliparser({
	val_mul: {
		f: 'my_parse_block_mul',
		value: 3
	},
	val_sum: {
		f: 'my_parse_block_sum',
		value: 2
	},
},{
	my_parse_block_mul: (data, block) => {
		return data * block.value;
	}
});

p.setModule('my_parse_block_sum', (data, block) => {
	return data + block.value;
});

let out = p.run(10);

console.log(out);

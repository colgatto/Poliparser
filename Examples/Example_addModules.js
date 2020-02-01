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
	f: 'my_mul',
	value: 3
});
console.log(p.run(10));

p.setParser({
	f: 'my_sum',
	value: 2
});
console.log(p.run(10));

let Poliparser = require('..');

let data = [1,1,2,3,4,4,4,5,6,7,8,9,9,9,0,0];

let p = new Poliparser({
	val: {
		f: 'uniq'
	}
});

let output = p.run(data);

console.log(output.val);
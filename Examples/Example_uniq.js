let Multiparser = require('..');

let data = [1,1,2,3,4,4,4,5,6,7,8,9,9,9,0,0];

let m = new Multiparser({
	val: {
		f: 'uniq'
	}
});

let output = m.run(data);

console.log(output.val);
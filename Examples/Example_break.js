let Poliparser = require('..');

let p = new Poliparser();

const data1 = [1, 2, -1, -2];
const data2 = [1, 2, 3];

p.setParser([{
	m: 'array_sum'
},{
	m: 'break',
	condition: (data) => data === 0,
	return: 'invalid'
},{
	m: 'custom',
	value: (data) => data * 2
}]);

let val1 = p.parse(data1);
let val2 = p.parse(data2);

console.log('val1: ' + val1);
console.log('val2: ' + val2);
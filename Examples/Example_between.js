let Poliparser = require('..');

let data = 'Hello my name is <p>Poliparser</p>';

let p = new Poliparser({
	m: 'str_between',
	from: '<p>',
	to: '</p>'
});

let output = p.parse(data);

console.log(output);
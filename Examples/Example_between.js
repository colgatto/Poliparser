let Poliparser = require('..');

let data = 'Hello my name is <p>Poliparser</p>';

let p = new Poliparser({
	f: 'str_between',
	from: '<p>',
	to: '</p>'
});

let output = p.run(data);

console.log(output);
let Multiparser = require('..');

let data = 'Hello my name is <p>Multiparser</p>';

let m = new Multiparser({
	name: {
		f: 'between',
		from: '<p>',
		to: '</p>'
	}
});

let output = m.run(data);

console.log(output.name);
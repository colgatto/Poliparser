let Multiparser = require('..');

let data = '{"a":34,"b":"ciao","we":{"we2":"23"}}';

let m = new Multiparser({
	json: [{
		f: 'json',
		value: 'parse'
	},{
		f: 'log'
	},{
		f: 'json',
		value: 'stringify',
		pretty: true,
		space: 2
	}],
});

let output = m.run(data);

console.log(output.json);
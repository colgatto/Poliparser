let Poliparser = require('..');

let data = '{"a":34,"b":"ciao","we":{"we2":"23"}}';

let p = new Poliparser([{
	m: 'json',
	value: 'parse'
},{
	m: 'log'
},{
	m: 'json',
	value: 'stringify',
	pretty: true,
	space: 2
}]);

let output = p.parse(data);

console.log(output);
let Poliparser = require('..');

let data = '{"a":34,"b":"ciao","we":{"we2":"23"}}';

let p = new Poliparser([{
	f: 'json',
	value: 'parse'
},{
	f: 'log'
},{
	f: 'json',
	value: 'stringify',
	pretty: true,
	space: 2
}]);

let output = p.run(data);

console.log(output);
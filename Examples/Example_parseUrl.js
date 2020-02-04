let Poliparser = require('..');

let p_label = new Poliparser({
	m: 'dom',
	value: '.prendi a',
	attr: 'href'
});

//p_label.parseUrl('http://127.0.0.1:3001/index.html').then( (data) => {
p_label.parseUrl('https://raw.githubusercontent.com/colgatto/Poliparser/master/Examples/data.html').then((data) => {
	console.log(data);
}).catch(console.error);
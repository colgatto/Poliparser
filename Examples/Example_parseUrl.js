let Poliparser = require('..');

let p_label = new Poliparser({
	m: 'dom',
	value: '.prendi a',
	attr: 'href'
});

//p_label.parseUrl('https://raw.githubusercontent.com/colgatto/Poliparser/master/Examples/data.html').then((data) => {
p_label.parseUrl('https://no').then((data) => {
	console.log(data);
}).catch((e)=>console.error(e.message));
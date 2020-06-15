let Poliparser = require('..');

let p_label = new Poliparser({
	m: 'dom',
	value: 'a.hiper',
	attr: 'href'
});

p_label.parseUrl('https://raw.githubusercontent.com/colgatto/Poliparser/master/Examples/data.html').then((data) => {
	console.log(data);
}).catch((e)=>console.error(e.message));
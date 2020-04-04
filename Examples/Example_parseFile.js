let Poliparser = require('..');

let p_label = new Poliparser({
	//get attribute href and data-label from all tag <a>
	m: 'dom',
	value: 'a',
	attr: ['href' , 'data-label']
});

console.log(p_label.parseFile('./data.html'));
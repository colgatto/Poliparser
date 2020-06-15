let Poliparser = require('..');

let p = new Poliparser([{
	m: 'dom',
	value: '#ikind-search .results .collection-ia',
},{
	m: 'parallel',
	value: {
		title: [{
			m: 'dom',
			value: 'a',
			normalizeWhitespace: true,
			text: true,
			firstOnly: true
		},{
			m: 'str_trim'
		}],
		items_count: [{
			m: 'dom',
			value: '.num-items.topinblock',
			normalizeWhitespace: true,
			text: true,
			firstOnly: true
		},{
			m: 'str_trim'
		},{
			m: 'str_replace',
			value: /[ \n\t]+/g,
			newValue: ' '
		}],
	}
},{
	m: 'custom',
	value: (data) => {
		let result = [];
		for (let i = 0; i < data.title.length; i++) {
			result.push({
				title: data.title[i],
				items_count: data.items_count[i]
			});
		}
		return result;
	}
}]);

//p.parseUrl('https://web.archive.org/web/20200531234703/https://archive.org').then((data) => {
p.parseUrl('http://127.0.0.1:81/archive/index.html').then((data) => {
	console.log(data);

}).catch((e)=>console.error(e.message));
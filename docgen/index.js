const Poliparser = require('..');
const Handlebars = require('handlebars');
const fs = require('fs');

Handlebars.registerHelper('strEncoder',function(x){
    return new Handlebars.SafeString(x);
});
const md_block_template = Handlebars.compile(fs.readFileSync(__dirname + '/md_block_template.hbs').toString());

const libOrder = [
	{name: 'String', val: 'str'},
	{name: 'Array', val: 'array'},
	{name: 'Object', val: 'obj'},
	{name: 'Crypto', val: 'crypto'},
	{name: 'CSV', val: 'csv'},
];

let poliParam = new Poliparser({
	m: 'regex',
	value: /(.+?)\s+\[(.+)\]\s+(?:<(.+)>|{R})\s+(.+)/,
	only: 'matches'
});

let docMaker = new Poliparser([{
	m: 'regex',
	value: /\/\*\*[\s\S]+\*\//gmi,
	only: 'full'
},{
	m: 'custom',
	value: (data) => data.length == 0 ? '' : data[0]
},{
	m: 'str_split',
	value: /\r?\n/
},{
	m: 'str_trim',
	value: ['\t', ' ', '*', '\\', '/']
},{
	m: 'array_filter',
	value: line => line.match(/@(?:docgen|name|desc|input|output|param|lib)/)
},{
	m: 'custom',
	value: lines => {
		if(lines.length == 0) return [];
		lines.shift();
		let chunked = [[]];
		let push = true;
		for (let i = 0, ind = 0, l = lines.length; i < l; i++) {
			const line = lines[i];	
			if(line.match(/^@docgen/)){
				push = false;
				ind++;
				chunked[ind] = [];
			}else{
				push = true;
			}
			if(push) chunked[ind].push(line);
		}

		chunked = chunked.map( b => b.map(x => ({
			type: x.slice(0, x.indexOf(' ')).slice(1),
			val: x.slice(x.indexOf(' ') + 1)
		})));
		return chunked.map( (list) => {
			let out = {};
			let params = [];
			list.forEach(el => {
				if(el.type == 'param')
					params.push(el.val);
				else
					out[el.type] = el.val;
			});
			out.params = params.map( p => {
				let pData = poliParam.parse(p);
				if(pData == null){
					console.error('ERRORE SU: ', p);
					return false;
				}
				let objPar = {
					name: pData[0],
					type: pData[1],
					desc: pData[3],
					required: typeof pData[2] == "undefined"
				};
				if(!objPar.required)
					objPar.default = pData[2];
				return objPar;
			}).filter(x=>x);
			out.isLib = typeof out.lib != "undefined";
			out.hasParams = out.params.length > 0;
			return out;
		});
	}
}]);

let basList = fs.readdirSync(__dirname + '/../parse_modules').filter(x => x != "library");
let mod_support_bl = [];
for(let i = 0, l = basList.length; i < l; i++){
	let strMod = fs.readFileSync(__dirname + '/../parse_modules/' +  basList[i]).toString();
	mod_support_bl.push(...docMaker.parse(strMod).map( bl => {
		let t = md_block_template(bl);
		return{
			data: bl,
			text: t
		};
	}));
}

let libList = fs.readdirSync(__dirname + '/../parse_modules/library');
for(let i = 0, l = libList.length; i < l; i++){
	let strMod = fs.readFileSync(__dirname + '/../parse_modules/library/' + libList[i]);
	let bList = docMaker.parse(strMod);
	mod_support_bl.push(...bList.map( bl => {
		let t = md_block_template(bl);
		return{
			data: bl,
			text: t
		};
	}) );
}

mod_support_bl = mod_support_bl.sort( (a,b) => {
	if(a.data.name > b.data.name)
		return 1;
	if(a.data.name < b.data.name)
		return -1;
	return 0;
});

let blockList = { basic: [] };

for (let i = 0, l = mod_support_bl.length; i < l; i++) {
	const bl = mod_support_bl[i];
	if(typeof bl.data.lib == "undefined"){
		blockList.basic.push(bl.text);
	}else{
		if(typeof blockList[bl.data.lib] == "undefined") blockList[bl.data.lib] = [];
		blockList[bl.data.lib].push(bl.text);
	}
}

let allRaw = ['# Documentation ', '', '## Basic', ''];

for (let i = 0, l = blockList.basic.length; i < l; i++) {
	allRaw.push(blockList.basic[i]);
}

allRaw.push('', '---', '');

for (let i = 0, l = libOrder.length; i < l; i++) {
	let libV = libOrder[i].val;
	allRaw.push('## ' + libOrder[i].name);
	allRaw.push('');
	if(typeof blockList[libV] == "undefined")
		continue;
	for (let j = 0, ll = blockList[libV].length; j < ll; j++) {
		allRaw.push(blockList[libV][j]);
	}
	allRaw.push('', '---', '');
}
fs.writeFileSync(__dirname + '/../Examples/README.md', allRaw.join('\n'));
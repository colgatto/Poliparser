const Poliparser = require('..');
const Handlebars = require('handlebars');
const fs = require('fs');

const md_block_template = Handlebars.compile(fs.readFileSync(__dirname + '/md_block_template.hbs').toString());


let p = new Poliparser();

let docMaker = new Poliparser({
	val: [{
		f: 'regex',
		value: /\/\*\*[\s\S]+\*\//gmi,
		only: 'full'
	},{
		f: 'custom',
		value: (data) => data.length == 0 ? '' : data[0]
	},{
		f: 'str_split',
		value: /\r?\n/
	},{
		f: 'trim',
		value: ['\t', ' ', '*', '\\', '/']
	},{
		f: 'array_filter',
		value: line => line.match(/@(?:docgen|name|desc|input|output|param|lib)/)
	},{
		f: 'custom',
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
					let pData = new Poliparser({
						v: {
							f: 'regex',
							value: /(.+?)\s+\[(.+)\]\s+(?:<(.+)>|{R})\s+(.+)/,
							only: 'matches'
						}
					}).run(p).v;
					if(pData == null){
						console.error('ERRORE');
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
	}]
});

let mod_support_bl = [];

//TODO: da rifare, dividi tutto in base a @lib del blocco

let allRaw = ['# Block type', '', '## basic', ''];

let basList = fs.readdirSync(__dirname + '/../parse_modules').filter(x=>x!="library");

for (let i = 0, l = basList.length; i < l; i++) {
	let strMod = fs.readFileSync(__dirname + '/../parse_modules/' +  basList[i]).toString();
	mod_support_bl.push(...docMaker.run(strMod).val.map(bl => md_block_template(bl)));
}

allRaw.push(mod_support_bl.join('\n'));

mod_support_bl = [];

let libList = fs.readdirSync(__dirname + '/../parse_modules/library');

for (let i = 0, l = libList.length; i < l; i++) {
	let strMod = fs.readFileSync(__dirname + '/../parse_modules/library/' + libList[i]).toString();
	allRaw.push('## ' + libList[i].slice(0, libList[i].indexOf('.')));
	allRaw.push(...docMaker.run(strMod).val.map(bl => md_block_template(bl)).join('\n'));
	allRaw.push('\n');
}

fs.writeFileSync('README.md', allRaw.join('\n'));

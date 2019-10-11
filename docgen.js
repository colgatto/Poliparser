const Poliparser = require('.');
const fs = require('fs');

let p = new Poliparser();

let docMaker = new Poliparser({
	val: [{
		f: 'regex',
		value: /\/\*\*([\s\S]+)\*\//gmi,
		only: 'matches',
		group: 0
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
		value: (data) => data
	}]
});

let ml = p.modList();

let modules = {
	basic: []
}

ml.forEach((m) => {
	let spm = m.split('_');
	if(spm.length == 1){
		modules.basic.push(spm[0]);
	}else{
		if(typeof modules[spm[0]] == 'undefined') modules[spm[0]] = [];
		modules[spm[0]].push(spm[1]);
	}
});

let mdOut = '';

modules.basic.forEach(mod => {
	mdOut += '### ' + mod;
	let strMod = fs.readFileSync('./parse_modules/' + mod + '.js').toString();
	let parseData = docMaker.run(strMod).val;
	let modData = {};
	if(parseData[0] == 'docgen'){
		modData.name = parseData[1];
		let paramPos = parseData.indexOf('parameters:');
		modData.haveParams = paramPos > 0;
		if(modData.haveParams){
			modData.desc = parseData.slice(2, paramPos).join('\r\n');
			let rawParams = parseData.slice(paramPos+1);
			modData.params = rawParams.map((singleRaw) => {
				let paramObj = {};
				let rawPart = singleRaw.split(' ');
				paramObj.name = rawPart[0];
				paramObj.type = rawPart[1].slice(1,rawPart[1].length - 1);
				let req = rawPart[2];
				paramObj.required = req == '{R}';
				if(!paramObj.required){
					
				}
				return paramObj;
			});
		}else{
			modData.desc = parseData.slice(2).join('\r\n');
		}
	}
	console.log(modData);
});
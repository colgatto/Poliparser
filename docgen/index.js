const fs = require('fs');
const Poliparser = require('..');

const mainParser = new Poliparser();
const innerParser = new Poliparser();

let poliParam = new Poliparser({
	m: 'regex',
	value: /(.+?)\s+\[(.+)\]\s+(?:<(.+)>|{R})\s+(.+)/,
	only: 'matches'
});

let fullList = Object.keys(mainParser.parse_modules);
let doneList = [];

const core_order = [ 'dom', 'regex', 'log', 'custom', 'break' ];

const lib_order = [
	{name: 'String', val: 'str'},
	{name: 'Array', val: 'array'},
	{name: 'Object', val: 'obj'},
	{name: 'Json', val: 'json'},
	{name: 'Crypto', val: 'crypto'},
	{name: 'CSV', val: 'csv'},
];

const blockParse = (name, m) => {
	let out = '### `' + name + '`\n- **Input**: ' + m.input + '\n- **Output**: ' + m.output + '\n\n' + m.desc + '\n\n';
	if(m.hasParams){
		out += '| Parameter | Type | Description | Required |\n| - | - | - | - |\n';
		for (let j = 0, l = m.params.length; j < l; j++) {
			const p = m.params[j];
			out += '| ' + p.name + ' | ' + p.type + ' | ' + p.desc + ' | ' + (p.required ? p.required : 'optional (default:' + p.default + ')') + ' |\n';
		}
	}
	doneList.push(name);
	return out;
};

const spacer = (l) => {
	let out = '';
	for (let i = 0; i < l; i++) out += ' ';
	return out;
}

mainParser.setParser([{
	m: 'regex',
	value: /\/\*\* *@docgen[\s\S]+?\*\*\//gmi,
	only: 'full'
},{
	m: 'str_trim',
},{
	m: 'array_map',
	value: x => x.split(/[\r\n]+/g).map( y => y.trim() )
},{
	m: 'array_map',
	value: x => innerParser.parse( x )
},{
	m: 'array_map',
	value: x => {
		let docBloc = {params:[]};
		for (let i = 0, l = x.length; i < l; i++) {
			let name = x[i][0];
			let v = x[i][1].trim();
			if(name == '@param'){
				let pData = poliParam.parse(v);
				if(pData == null){
					console.error('PARAM ERROR: ', p);
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
				docBloc.params.push(objPar);
			}else{
				docBloc[name.slice(1)] = v;
			}
		}
		docBloc.isLib = typeof docBloc.lib != "undefined";
		docBloc.hasParams = docBloc.params.length > 0;
		return docBloc;
	}
}]);

innerParser.setParser([{
	m: 'array_filter',
	value: line => line.match(/^@(?:name|lib|desc|input|output|param)/)
},{
	m: 'array_map',
	value: data => {
		let r = [];
		r[0] = data.slice(0, data.indexOf(' '));
		r[1] = data.slice(data.indexOf(' '));
		return r;
	}
}]);

let core_file = fs.readdirSync(__dirname + '/../parse_modules').filter(x => x != "library");
let lib_file = fs.readdirSync(__dirname + '/../parse_modules/library');

let modules = [];
for(let i = 0, l = core_file.length; i < l; i++)
	modules[i] = mainParser.parseFile(__dirname + '/../parse_modules/' + core_file[i])[0];

for(let i = 0, l = lib_file.length; i < l; i++)
	modules.push( ...mainParser.parseFile(__dirname + '/../parse_modules/library/' + lib_file[i]) );

let lib = {};

for(let i = 0, l = modules.length; i < l; i++){
	let m = modules[i];
	if(m.isLib){
		if(typeof lib[m.lib] == 'undefined')
			lib[m.lib] = [];
		lib[m.lib].push(m);
		delete modules[i];
	}
}

modules = modules.filter(x=>x);
let core = {};
for (let i = 0; i < modules.length; i++) {
	core[modules[i].name] = modules[i];
}

let md_out = '# Documentation\n\n## Core\n';

for (let i = 0, l = core_order.length; i < l; i++) {
	const m = core[ core_order[i] ];
	md_out += blockParse(m.name, m);
}

for (let i = 0, l = lib_order.length; i < l; i++) {
	md_out += '\n---\n\n## ' + lib_order[i].name + '\n';
	const mList = lib[ lib_order[i].val ];
	for (let j = 0, ll = mList.length; j < ll; j++) {
		const m = mList[j];
		md_out += blockParse(m.lib + '_' + m.name, m);
	}
}

for (let i = 0, l = fullList.length; i < l; i++)
	console.log(fullList[i] + ':' + spacer(20 - fullList[i].length) + ( doneList.includes(fullList[i]) ? 'DONE!' : 'NOT FOUND!') );

fs.writeFileSync(__dirname + '/README.md', md_out);
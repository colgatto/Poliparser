'use strict';

const default_parse_library = {
	obj:  require(__dirname + "/parse_modules/library/obj.js"),
	str:  require(__dirname + "/parse_modules/library/str.js"),
	array:  require(__dirname + "/parse_modules/library/array.js"),
	crypto:  require(__dirname + "/parse_modules/library/crypto.js"),
	csv:  require(__dirname + "/parse_modules/library/csv.js"),
};

const default_parse_modules = {
	log: require(__dirname + "/parse_modules/log.js"),
	custom: require(__dirname + "/parse_modules/custom.js"),
	dom: require(__dirname + "/parse_modules/dom.js"),
	json: require(__dirname + "/parse_modules/json.js"),
	regex: require(__dirname + "/parse_modules/regex.js"),
};

class Poliparser {

	constructor(parser = {}) {
		
		this.parser = parser;

		let base_module_obj = Object.assign({}, default_parse_modules);

		let libs = Object.keys(default_parse_library);
		libs.forEach(lib => {
			let modules = Object.keys(default_parse_library[lib]);
			modules.forEach(mod => {
				base_module_obj[lib + '_' + mod] = default_parse_library[lib][mod];
			});
		});

		this.parse_modules = base_module_obj;
	}

	run(data){
		let out = {};
		for (const k in this.parser)
			out[k] = this._parse(data, this.parser[k]);
		return out;
	}

	setModule(name, new_module){
		this.parse_modules[name] = new_module;
	}

	setParser(parser){
		this.parser = parser;
	}

	requireModule(name, module_path){
		this.parse_modules[name] = require(module_path);
	}

	setLibrary(name, new_library){
		let modules = Object.keys(new_library);
		modules.forEach(mod => {
			this.parse_modules[name + '_' + mod] = new_library[mod];
		});
	}

	requireLibrary(name, library_path){
		let new_library = require(library_path);
		let modules = Object.keys(new_library);
		modules.forEach(mod => {
			this.parse_modules[name + '_' + mod] = new_library[mod];
		});
	}

	_parse(data, block){
		if(block.constructor == Array) {
			let dOut = data;
			for (let i = 0; i < block.length; i++) {
				dOut = this._parse(dOut, block[i]);
			}
			return dOut;
		}
		for (const k in this.parse_modules) {
			if(block.f == k){
				return this.parse_modules[k](data, block);
			}
		}
		return data;
	}
}

module.exports = Poliparser;
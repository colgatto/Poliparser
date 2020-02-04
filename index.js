'use strict';
const fs = require('fs');
const request = require('request');

const normalizeUrl = url => {
	const regex = /^(?:https?:\/\/)?([a-zA-Z0-9.]+)(?:\/(.+)?)?$/;
	let m = regex.exec(url);
	return m == null ? false : ( m[1] + ( typeof m[2] == 'undefined' ? '' : '/' + m[2]) );
}

const default_parse_library = {
	obj: require(__dirname + "/parse_modules/library/obj.js"),
	str: require(__dirname + "/parse_modules/library/str.js"),
	json: require(__dirname + "/parse_modules/library/json.js"),
	array: require(__dirname + "/parse_modules/library/array.js"),
	crypto: require(__dirname + "/parse_modules/library/crypto.js"),
	csv: require(__dirname + "/parse_modules/library/csv.js"),
};

const default_parse_modules = {
	log: require(__dirname + "/parse_modules/log.js"),
	custom: require(__dirname + "/parse_modules/custom.js"),
	dom: require(__dirname + "/parse_modules/dom.js"),
	regex: require(__dirname + "/parse_modules/regex.js"),
	break: require(__dirname + "/parse_modules/break.js"),
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

	parse(data) {
		return this.singleParse(data, this.parser);
	}

	parseFile(data) {
		return this.singleParse(fs.readFileSync(data).toString(), this.parser);;
	}

	parseUrl(url, options) {
		return new Promise((resolve, reject) => {
			try {
				url = normalizeUrl(url);
				if(!url){
					reject('invalid url!');
				}else{
					request('https://' + url, (err, response, body) => {
						/* istanbul ignore else */
						if(!err){
							resolve(this.singleParse(body, this.parser));
						}else{
							reject(err);
						}
					});
				}
			} catch (e) {
				/* istanbul ignore next */
				reject(e);
			}
		});
	}

	setModule(name, new_module) {
		this.parse_modules[name] = new_module;
	}

	setParser(parser) {
		this.parser = parser;
	}

	requireModule(name, module_path) {
		this.parse_modules[name] = require(module_path);
	}

	setLibrary(name, new_library) {
		let modules = Object.keys(new_library);
		modules.forEach(mod => {
			this.parse_modules[name + '_' + mod] = new_library[mod];
		});
	}

	requireLibrary(name, library_path) {
		let new_library = require(library_path);
		let modules = Object.keys(new_library);
		modules.forEach(mod => {
			this.parse_modules[name + '_' + mod] = new_library[mod];
		});
	}

	singleParse(data, block) {
		if (block.constructor == Array) {
			let dOut = data;
			for (let i = 0; i < block.length; i++) {
				try{
					dOut = this.singleParse(dOut, block[i]);
				}catch(e){
					/* istanbul ignore else */
					if(typeof e.break != "undefined" && e.break){
						return e.value;
					}else{
						throw e;
					}
				}
			}
			return dOut;
		}
		for (const k in this.parse_modules) {
			if (block.m == k) {
				return this.parse_modules[k](data, block);
			}
		}
		return data;
	}
}

module.exports = Poliparser;
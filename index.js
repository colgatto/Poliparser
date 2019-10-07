'use strict';

const default_parse_modules = {
	dom: require("./parse_modules/dom.js"),
	regex: require("./parse_modules/regex.js"),
	json: require("./parse_modules/json.js"),
	uniq: require("./parse_modules/uniq.js"),
	trim: require("./parse_modules/trim.js"),
	reverse: require("./parse_modules/reverse.js"),
	between: require("./parse_modules/between.js")
};

class Poliparser {

	constructor(parser, custom_modules = {}) {
		this.parser = parser;
		this.parse_modules = Object.assign({}, default_parse_modules, custom_modules);
	}

	run(data){
		let out = {};
		for (const k in this.parser)
			out[k] = this.parse(this.parser[k], data);
		return out;
	}

	setModule(name, new_module){
		this.parse_modules[name] = new_module;
	}

	parse(p, data){
		switch (p.constructor) {
			case Object:
				switch(p.f){
					case 'custom':
						return p.value(data);
					case 'log':
						console.log(data);
						return data;
				}
				break;
			case Array:
				let dOut = data;
				for (let i = 0; i < p.length; i++) {
					dOut = this.parse(p[i], dOut);
				}
				return dOut;
		}

		for (const k in this.parse_modules) {
			if(p.f == k){
				return this.parse_modules[k](p, data);
			}
		}
		return data;
	}
}

module.exports = Poliparser;
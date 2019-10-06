const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const rec_DOM = (value, data, opt) => {
	if(data.constructor == Array){
		let domp = [];
		for (let i = 0, l = data.length; i < l; i++)
			domp[i] = rec_DOM(value, data[i]);
		return domp;
	}else{
		let domp = new JSDOM(data).window.document;
		let first_out = Array.from(domp.querySelectorAll(value));
		if(opt.attr){
			if(opt.attr.constructor == Array){
				out = first_out.map(o => {
					let block_out = {};
					for (let i = 0, l = opt.attr.length; i < l; i++){
						block_out[opt.attr[i]] = o.getAttribute(opt.attr[i]);
					}
					return block_out;
				});
			}else{
				return first_out.map(o => o.getAttribute(opt.attr));
			}
		}
		return first_out;
	}
}

module.exports = (p, data) => {
	let opt = {
		attr: typeof p.attr == "undefined" ? false : p.attr
	}
	return rec_DOM(p.value, data, opt);
};
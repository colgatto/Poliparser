const HTMLParser = require('fast-html-parser');

const rec_DOM = (value, data, opt) => {
	if(data.constructor == Array){
		let domp = [];
		for (let i = 0, l = data.length; i < l; i++)
			domp[i] = rec_DOM(value, data[i], opt);
		return domp;
	}else{
		var domp = HTMLParser.parse(data);
		let first_out = Array.from(domp.querySelectorAll(value));
		if(opt.attr){
			if(opt.attr.constructor == Array){;
				first_out = first_out.map(o => {
					let block_out = {};
					for (let i = 0, l = opt.attr.length; i < l; i++){
						block_out[opt.attr[i]] = o.attributes[opt.attr[i]];
					}
					return block_out;
				});
			}else{
				return first_out.map(o => o.attributes[opt.attr]);
			}
		}
		return first_out;
	}
}

/** @docgen
@name dom
@desc Parse an html string and get data with a CSS selector like jQuery.
@input `String`
@output `[DomObject]`
@param value [`String`] {R} CSS/jquery selector string
@param attr [`String`/`Array`] <`false`> get attribute value
**/
module.exports = (data, block) => {
	let opt = {
		attr: typeof block.attr == "undefined" ? false : block.attr
	}
	return rec_DOM(block.value, data, opt);
};
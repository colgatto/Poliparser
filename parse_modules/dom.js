const cheerio = require('cheerio');
const lib = require('../lib');

const parseElem = (elem, opt) => {
	let result = {};
	if(opt.attr){
		if(opt.attr.constructor == Array){
			let block_out = {};
			for (let i = 0, l = opt.attr.length; i < l; i++){
				block_out[opt.attr[i]] = elem.attr(opt.attr[i]);
			}
			result.attr = block_out;
		}else{
			result.attr = elem.attr(opt.attr);
		}
	}
	if(opt.html){
		result.html = cheerio.html(elem);
	}
	if(opt.innerHTML){
		result.innerHTML = elem.html();
	}
	if(opt.text){
		result.text = elem.text();
	}
	let k = Object.keys(result);
	if(k.length == 0)
		return elem;
	if(k.length == 1)
		return result[k[0]];
	return result;
};

/** @docgen
@name dom
@desc Parse an html string and get data with a CSS selector like jQuery.
@input `String`
@output `[DomObject]`
@param value [`String`] {R} CSS/jquery selector string.
@param firstOnly [`Boolean`] <`false`> TODO
@param normalizeWhitespace [`Boolean`] <`false`> TODO
@param decodeEntities [`Boolean`] <`false`> TODO
@param html [`Boolean`] <`false`> TODO
@param innerHTML [`Boolean`] <`false`> TODO
@param text [`Boolean`] <`false`> TODO
@param attr [`String`/`Array`] <`undefined`> Get attribute value.
**/
module.exports = (data, block) => {
	return lib._rec_func(data, block, (data, block)=>{
		let value = block.value;
		let opt = {
			firstOnly: typeof block.firstOnly == "undefined" ? false : block.firstOnly,
			normalizeWhitespace: typeof block.normalizeWhitespace == "undefined" ? false : block.normalizeWhitespace,
			decodeEntities: typeof block.decodeEntities == "undefined" ? false : block.decodeEntities,
			html: typeof block.html == "undefined" ? false : block.html,
			innerHTML: typeof block.innerHTML == "undefined" ? false : block.innerHTML,
			text: typeof block.text == "undefined" ? false : block.text,
			attr: typeof block.attr == "undefined" ? false : block.attr,
		}
		let result;
		
		if(data.constructor.toString() == cheerio.load('')().constructor.toString())
			data = cheerio.html(data);

		let $ = cheerio.load(data, {
			normalizeWhitespace: opt.normalizeWhitespace,
			decodeEntities: opt.decodeEntities
		});
		if(opt.firstOnly){
			let el = $(value);
			/* istanbul ignore else */
			if(el.length > 0){
				result = parseElem($(el[0]), opt);
			}
		}else{
			result = [];
			let elems = $(value).toArray();
			for (let i = 0; i < elems.length; i++) {
				result.push(parseElem($(elems[i]), opt));
			}
		}
		return result;
	});
};
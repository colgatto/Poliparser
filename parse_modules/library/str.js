const lib = require('../../lib');

module.exports = {
	/** @docgen
	@lib str
	@name base64
	@desc Encode or decode base64 string
	@input `String`
	@output `String`
	@param value [`String`] {R} `'encode'` or `'decode'`
	**/
	base64: (data, block) => {
		return lib._rec_func(data, block, (data, block)=>{
			switch(block.value){
				case 'encode':
					return Buffer.from(data).toString('base64');
				case 'decode':
					return Buffer.from(data, 'base64').toString('ascii');
			}
		});
	},
	/** @docgen
	@name split
	@lib str
	@desc Split a String object into an array of strings by separating the string into substrings, using a specified separator string to determine where to make each split.
	@input `String`
	@output `Array`
	@param value [ (`String`/`RegExp`) ] {R} Specifies the string which denotes the points at which each split should occur.
	**/
	split: (data, block) => {
		return lib._rec_func(data, block, (data, block)=>{
			return data.split(block.value);
		});
	},
	/** @docgen
	@name charAt
	@lib str
	@desc Returns a new string consisting of the single UTF-16 code unit located at the specified offset into the string.
	@input `String`
	@output `String`
	@param value [`Integer`] <`0`> The offset of char you want. An integer between 0 and 1-less-than the length of the string.
	**/
	charAt: (data, block) => {
		return lib._rec_func(data, block, (data, block)=>{
			if(typeof block.value == "undefined") block.value = 0;
			return data.charAt(block.value);
		});
	},
	/** @docgen
	@name replace
	@lib str
	@desc Returns a new string with some or all matches of a pattern replaced by a replacement. The replacement can be a string or a function to be called for each match. If pattern is a string, only the first occurrence will be replaced.
	@input `String`
	@output `String`
	@param value [ (`String`/`RegExp`) ] {R} A value that is to be replaced by newValue.
	@param newValue [ (`String`/`Function`) ] {R} The String that replaces the substring/regex specified by the value parameter.
	**/
	replace: (data, block) => {
		return lib._rec_func(data, block, (data, block)=>{
			return data.replace(block.value, block.newValue);
		});
	},
	/** @docgen
	@name trim
	@lib str
	@desc Returns a new String with whitespace (or custom values) removed from start, end or both of a string.
	@input `String`
	@output `String`
	@param value [`Array`] <`[' ', '\t', '\r', '\n']`> Array of values you want to trim.
	@param start [`Boolean`] <`true`> If set `false` don't trim start of string.
	@param end [`Boolean`] <`true`> If set `false` don't trim start of string.
	**/
	trim: (data, block) => {
		return lib._rec_func(data, block, (data, block)=>{
			let value = block.value;
			let opt = {
				start: typeof block.start == "undefined" ? true : block.start,
				end: typeof block.end == "undefined" ? true : block.end
			};
			if(value){
				let l = data.length;
				let si = 0;
				let ei = l - 1;
				if(opt.start){
					for (let i = 0; i < l; i++) {
						if(value.includes(data.charAt(i))) si++;
						else break;
					}
				}
				if(opt.end){
					for (let i = l - 1; i >= 0; i--) {
						if(value.includes(data.charAt(i))) ei--;
						else break;
					}
				}
				return data.slice(si, ei + 1);
			}else{
				if(opt.start && !opt.end){
					return data.trimStart();
				}else if(!opt.start && opt.end){
					return data.trimEnd();
				}else{
					return data.trim();
				}
			}
		});
	},
	/** @docgen
	@name between
	@lib str
	@desc Returns the part of the string between `from` parameter and `to` parameter.
	@input `String`
	@output `String`
	@param from [`String`] {R} The start of substring (excluded).
	@param to [`String`] {R} The end of substring (excluded).
	**/
	between: (data, block) => {
		return lib._rec_func(data, block, (data, block)=>{
			data = data.toString();
			let froml = block.from.length;
			let thisl = data.length;
			let fromi = data.indexOf(block.from);
			let toi = data.indexOf(block.to, fromi + froml);
			return data.substr(fromi + froml,  thisl - fromi - block.from.length - (thisl - toi));
		});
	},
	/** @docgen
	@name reverse
	@lib str
	@desc Returns a new string where char are reversed. The first char becomes the last, and the last char becomes the first.
	@input `String`
	@output `String`
	**/
	reverse: (data, block) => {
		return lib._rec_func(data, block, (data, block)=>{
			data = data + '';
			let out = '';
			for (let i = data.length - 1; i >= 0; i--) {
				out += data[i];
			}
			return out;
		});
	}
};
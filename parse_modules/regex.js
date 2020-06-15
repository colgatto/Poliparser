const lib = require('../lib');

/** @docgen
@name regex
@desc Exec regex passed by value parameter and return matches and index.
@input `String`
@output `[Object]`
@param value [`Regex`] {R} Regex to execute.
@param only [`String`] <`false`> If set return only selected element instead of Object, Accept: `'full'`, `'matches'`, `'indexes'`.
@param group [`Integer`] <`false`> Get only selected group.
**/
module.exports = (data, block) => {
	return lib._rec_func(data, block, (data, block)=>{
		let value = block.value;
		let opt = {
			only: typeof block.only == "undefined" ? false : block.only,
			group: typeof block.group == "undefined" ? false : block.group
		};
		let exp = [];
		let arr = [];
		let matches;
		if(value.global){
			while(arr = value.exec(data)) {
				if (arr.index === value.lastIndex)
					value.lastIndex++;
				let full = arr.shift();
				if(opt.group === false){
					matches = [...arr];
				}else{
					matches = arr[opt.group];
				}
				let ret = {
					full,
					matches,
					index: arr.index
				};
				exp.push(opt.only ? ret[opt.only] : ret);
			}
		}else{
			arr = value.exec(data);
			if(arr === null)
				return null;
			
			let full = arr.shift();
			
			if(opt.group === false){
				matches = [...arr];
			}else{
				matches = arr[opt.group];
			}
			let ret = {
				full,
				matches,
				index: arr.index
			};
			exp = opt.only ? ret[opt.only] : ret;
		}
		return exp;
	});
};
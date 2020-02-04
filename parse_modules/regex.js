const rec_regEx = (value, data, opt) => {
	let exp = [];
	if(data.constructor == Array){
		for (let i = 0, l = data.length; i < l; i++)
			exp[i] = rec_regEx(value, data[i], opt);
	}else{
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
	}
	return exp;
};
/** @docgen
@name regex
@desc exec regex passed by value parameter and return matches and index
@input `String`
@output `[Object]`
@param value [`Regex`] {R} regex to execute
@param only [`String`] <`false`> if set return only selected element instead of Object, Accept: `'full'`, `'matches'`, `'indexes'`.
@param group [`Integer`] <`false`> get only selected group
**/
module.exports = (data, block) => {
	var opt = {
		only: typeof block.only == "undefined" ? false : block.only,
		group: typeof block.group == "undefined" ? false : block.group
	};
	return rec_regEx(block.value, data, opt);
};
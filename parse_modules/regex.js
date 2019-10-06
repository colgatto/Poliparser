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
			//	console.log(opt);
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
		//	console.log(opt);
			exp = opt.only ? ret[opt.only] : ret;
		}
	}
	return exp;
};

module.exports = (p, data) => {
	var opt = {
		only: typeof p.only == "undefined" ? false : p.only,
		group: typeof p.group == "undefined" ? false : p.group
	};
	return rec_regEx(p.value, data, opt);
};
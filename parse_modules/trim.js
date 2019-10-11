const rec_trim = (value, data, opt) => {
	if(data.constructor == Array){
		let trimp = [];
		for (let i = 0, l = data.length; i < l; i++)
			trimp[i] = rec_trim(value, data[i], opt);
		return trimp;
	}else{
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
	}
}

module.exports = (data, block) => {
	var opt = {
		start: typeof block.start == "undefined" ? true : block.start,
		end: typeof block.end == "undefined" ? true : block.end
	};
	return rec_trim(typeof block.value == "undefined" ? false : block.value, data, opt);
};
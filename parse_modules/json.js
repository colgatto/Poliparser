module.exports = (p, data) => {
	var opt = {
		pretty: typeof p.pretty == "undefined" ? false : p.pretty,
		spaces: typeof p.spaces == "undefined" ? false : p.spaces
	};
	if(p.value == 'parse'){
		return JSON.parse(data);
	}else{
		if(typeof p.pretty != "undefined" && opt.pretty){
			let sp = typeof p.spaces == "undefined" ? 4 : p.spaces;
			return JSON.stringify(data, null, sp);
		}else{
			return JSON.stringify(data);
		}
	}
};
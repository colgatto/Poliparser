module.exports = (p, data) => {
	var opt = {
		pretty: typeof p.pretty == "undefined" ? false : p.pretty,
		space: typeof p.space == "undefined" ? false : p.space
	};
	if(p.value == 'parse'){
		return JSON.parse(data);
	}else{
		if(typeof p.pretty != "undefined" && opt.pretty){
			let sp = typeof p.space == "undefined" ? 4 : p.space;
			return JSON.stringify(data, null, sp);
		}else{
			return JSON.stringify(data);
		}
	}
};
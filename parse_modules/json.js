module.exports = (data, block) => {
	var opt = {
		pretty: typeof block.pretty == "undefined" ? false : block.pretty,
		space: typeof block.space == "undefined" ? false : block.space
	};
	if(block.value == 'parse'){
		return JSON.parse(data);
	}else{
		if(typeof block.pretty != "undefined" && opt.pretty){
			let sp = typeof block.space == "undefined" ? 4 : block.space;
			return JSON.stringify(data, null, sp);
		}else{
			return JSON.stringify(data);
		}
	}
};
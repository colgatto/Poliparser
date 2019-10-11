module.exports = (data, block) => {
	if(block.value.constructor == Array){
		let out = {};
		for (let i = 0; i < block.value.length; i++) {
			out[block.value[i]] = data[block.value[i]];
		}
		return out;
	}else{
		return data[block.value];
	}
};
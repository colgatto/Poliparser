module.exports = (p, data) => {
	if(p.value.constructor == Array){
		let out = {};
		for (let i = 0; i < p.value.length; i++) {
			out[p.value[i]] = data[p.value[i]];
		}
		return out;
	}else{
		return data[p.value];
	}
};
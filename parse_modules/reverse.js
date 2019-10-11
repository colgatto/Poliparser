module.exports = (data, block) => {
	if(data.constructor == Array){
		data.reverse();
		return data;
	}else{
		data = data + '';
		let out = '';
		for (let i = data.length - 1; i >= 0; i--) {
			out += data[i];
		}
		return out;
	}
};
module.exports = (data, block) => {
	data = data.toString();
	let froml = block.from.length;
	let thisl = data.length;
	let fromi = data.indexOf(block.from);
	let toi = data.indexOf(block.to, fromi + froml);
	return data.substr(fromi + froml,  thisl - fromi - block.from.length - (thisl - toi));
};
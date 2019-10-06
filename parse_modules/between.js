module.exports = (p, data) => {
	data = data.toString();
	let froml = p.from.length;
	let thisl = data.length;
	let fromi = data.indexOf(p.from);
	let toi = data.indexOf(p.to, fromi + froml);
	return data.substr(fromi + froml,  thisl - fromi - p.from.length - (thisl - toi));
};
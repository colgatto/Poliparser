/** @docgen
@name parallel
@desc Run poliparser for every key of value object
@input `Any`
@output `Any`
@param value [`Object`] {R} A list of module
**/
module.exports = (data, block, Poliparser) => {
	let k = Object.keys(block.value);
	let result = {};
	for (let i = 0; i < k.length; i++) {
		let p = new Poliparser(block.value[k[i]]);
		result[k[i]] = p.parse(data);
	}
	return result;
};
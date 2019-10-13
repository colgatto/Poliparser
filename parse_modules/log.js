/** @docgen
@name log
@desc `console.log` the value and return it without changing it
@input `Any`
@output `Any`
**/
module.exports = (data, block) => {
	console.log(data);
	return data;
};
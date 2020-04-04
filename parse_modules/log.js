/** @docgen
@name log
@desc Pass the value to `console.log` and return it without changes.
@input `Any`
@output `Any`
**/
module.exports = (data, block) => {
	console.log(data);
	return data;
};
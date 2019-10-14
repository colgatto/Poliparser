/** @docgen
@name custom
@desc Run a custom function and return data
@input `Any`
@output `Any`
@param value [`Function`] {R} a function that has input data as first parameter and return output data.
**/
module.exports = (data, block) => {
	return block.value(data);
};
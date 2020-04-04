/** @docgen
@name break
@desc Break is a conditional block thats used to exit from an Array of module. it can return a custom value.
@input `Any`
@output `Any`
@param condition [`Function`] {R} If function return true the poliparser exit and return input data, or a custom value if specified, first parameter of function is the input data.
@param return [`Any`] <`undefined`> Custom value that return if condition is true, if undefined the module return the input data.
**/
module.exports = (data, block) => {
	if(block.condition(data)){
		throw {
			break: true,
			value: typeof block.return != 'undefined' ? block.return : data
		};
	}else{
		return data;
	}
};
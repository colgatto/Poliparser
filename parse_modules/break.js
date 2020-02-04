/** @docgen
@name break
@desc break is a conditional block thats used to exit from an Array of module. it can return a custom value.
@input `Any`
@output `Any`
@param condition [`bool`] {R} if condition is true the poliparser exit and return input data, or a custom value if specified
@param return [`Any`] <`undefined`> custom value that return if condition is true, if undefined the module return the input data
**/
module.exports = (data, block) => {
	if(block.condition(data)){
		if(typeof block.return != 'undefined'){
			//rompi waterfall con return
			throw {break: true, value: block.return};
		}else{
			//rompi waterfall con data
			throw {break: true, value: data};
		}
	}else{
		return data;
	}
};
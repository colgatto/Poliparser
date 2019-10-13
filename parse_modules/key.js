/** @docgen
@name key
@desc return a single key from an Object
@input `Object`
@output `Any`
@param value [`String` / `Array`] {R} name of the key you want return, use `Array` if you want more keys
**/
module.exports = (data, block) => {
	if(block.value.constructor == Array){
		let out = {};
		for (let i = 0; i < block.value.length; i++) {
			out[block.value[i]] = data[block.value[i]];
		}
		return out;
	}else{
		return data[block.value];
	}
};
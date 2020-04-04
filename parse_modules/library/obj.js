module.exports = {
	/** @docgen
	@name keys
	@lib obj
	@desc Returns an array of a given object's own enumerable property names, in the same order as we get with a normal loop.
	@input `Object`
	@output `Array`
	**/
	keys: (data, block) => {
		return Object.keys(data);
	},
	/** @docgen
	@name getKey
	@lib obj
	@desc Returns a single key from an Object, or a subObject if specify more then one key.
	@input `Object`
	@output `Any`
	@param value [`String`/`Array`] {R} Name of the key you want return, use `Array` if you want more keys.
	**/
	getKey: (data, block) => {
		if(block.value.constructor == Array){
			let out = {};
			for (let i = 0; i < block.value.length; i++) {
				out[block.value[i]] = data[block.value[i]];
			}
			return out;
		}else{
			return data[block.value];
		}
	},
	/** @docgen
	@name values
	@lib obj
	@desc Returns an array of a given object's own enumerable property values, in the same order as that provided by a `for...in` loop.
	@input `Object`
	@output `Array`
	**/
	values: (data, block) => {
		return Object.values(data);
	},
	/** @docgen
	@name entries
	@lib obj
	@desc Returns an array of a given object's own enumerable string-keyed property [key, value] pairs, in the same order as that provided by a `for...in` loop.
	@input `Object`
	@output `Array`
	**/
	entries: (data, block) => {
		return Object.entries(data);
	},
	/** @docgen
	@name fromEntries
	@lib obj
	@desc Turn a list of key-value pairs into an object.
	@input `Array`
	@output `Object`
	**/
	fromEntries: (data, block) => {
		let out = {};
		for (let i = 0, l = data.length; i < l; i++) {
			out[data[i][0]] = data[i][1];
		}
		return out;
	}
};
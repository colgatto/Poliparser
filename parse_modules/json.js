/** @docgen
@name json
@desc Generate a json string from an object and parse a json string to an object
@input ( `String`, `Object` )
@output ( `Object`, `String` )
@param value [`String`] <`'stringify'`> set json mode (`'stringify'`,`'parse'`)
@param pretty [`Boolean`] <`false`> set `true` for pretty stringify 
@param space [`Integer`] <`4`> set indentation's length for pretty stringify
**/
module.exports = (data, block) => {
	var opt = {
		pretty: typeof block.pretty == "undefined" ? false : block.pretty,
		space: typeof block.space == "undefined" ? false : block.space
	};
	if(block.value == 'parse'){
		return JSON.parse(data);
	}else{
		if(typeof block.pretty != "undefined" && opt.pretty){
			let sp = typeof block.space == "undefined" ? 4 : block.space;
			return JSON.stringify(data, null, sp);
		}else{
			return JSON.stringify(data);
		}
	}
};
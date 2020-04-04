const lib = require('../../lib');

module.exports = {
	/** @docgen
	@name parse
	@lib csv
	@desc Create a new Array of Object from CSV String.
	@input `String`
	@output `Array`
	@param separator [`String`] <`','`> CSV value separator.
	@param stringSeparator [`String`] <`false`> CSV string separator, if false don't use string separator.
	**/
	parse: (data, block) => {
		return lib._csv_parse(data, block);
	},
	/** @docgen
	@name stringify
	@lib csv
	@desc Create a CSV from an array of object.
	@input `Object`
	@output `String`
	@param separator [`String`] <`','`> CSV value separator.
	@param stringSeparator [`String`] <`false`> CSV string separator, if false don't use string separator.
	**/
	stringify: (data, block) => {
		return lib._csv_stringify(data, block);
	},
	/** @docgen
	@name toJson
	@lib csv
	@desc Create a JSON from a CSV.
	@input `String`
	@output `String`
	@param separator [`String`] <`','`> CSV value separator
	@param stringSeparator [`String`] <`false`> CSV string separator, if false don't use string separator.
	@param pretty [`Boolean`] <`false`> Set `true` for pretty JSON.
	@param space [`Integer`] <`4`> JSON space length, used if pretty = `true`.
	**/
	toJson: (data, block) => {
		if(typeof block.pretty != "undefined" && block.pretty){
			let sp = typeof block.space == "undefined" ? 4 : block.space;
			return JSON.stringify(lib._csv_parse(data, block), null, sp);
		}else{
			return JSON.stringify(lib._csv_parse(data, block));
		}
	},
	/** @docgen
	@name fromJson
	@lib csv
	@desc Create a CSV from a JSON.
	@input `String`
	@output `String`
	@param separator [`String`] <`','`> CSV value separator.
	@param stringSeparator [`String`] <`false`> CSV string separator, if false don't use string separator.
	**/
	fromJson: (data, block) => {
		return lib._csv_stringify(JSON.parse(data), block);
	},
};
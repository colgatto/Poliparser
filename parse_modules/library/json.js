const lib = require('../../lib');

module.exports = {
	/** @docgen
	@name parse
	@lib json
	@desc Parse a JSON string to an object.
	@input `String`
	@output `Object`
	**/
	parse: (data, block) => {
		return JSON.parse(data);
	},
	/** @docgen
	@name stringify
	@lib json
	@desc Generate a JSON string from an object.
	@input `Object`
	@output `String`
	@param pretty [`Boolean`] <`false`> Set `true` for pretty stringify.
	@param space [`Integer`] <`4`> Space length for pretty stringify.
	**/
	stringify: (data, block) => {
		var opt = {
			pretty: typeof block.pretty == "undefined" ? false : block.pretty,
			space: typeof block.space == "undefined" ? 4 : block.space
		};
		return opt.pretty ? JSON.stringify(data, null, opt.space) : JSON.stringify(data);
	},
	/** @docgen
	@name toCsv
	@lib json
	@desc Create a CSV from a JSON.
	@input `String`
	@output `String`
	@param separator [`String`] <`','`> CSV value separator.
	@param stringSeparator [`String`] <`false`> CSV string separator, if false don't use string separator.
	**/
	toCsv: (data, block) => {
		return lib._csv_stringify(JSON.parse(data), block);
	},
	/** @docgen
	@name fromCsv
	@lib json
	@desc Create a JSON from a CSV.
	@input `String`
	@output `String`
	@param separator [`String`] <`','`> CSV value separator.
	@param stringSeparator [`String`] <`false`> CSV string separator, if false don't use string separator.
	@param pretty [`Boolean`] <`false`> Set `true` for pretty JSON.
	@param space [`Integer`] <`4`> JSON space length, used if pretty = `true`.
	**/
	fromCsv: (data, block) => {
		if(typeof block.pretty != "undefined" && block.pretty){
			let sp = typeof block.space == "undefined" ? 4 : block.space;
			return JSON.stringify(lib._csv_parse(data, block), null, sp);
		}else{
			return JSON.stringify(lib._csv_parse(data, block));
		}
	},
};
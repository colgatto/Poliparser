module.exports = {
	/** @docgen
	@lib crypto
	@name base64
	@desc encode or decode base64 string
	@input `String`
	@output `String`
	@param value [`String`] {R} `'encode'` or `'decode'`
	**/
	base64: (data, block) => {
		switch(block.value){
			case 'encode':
				return Buffer.from(data).toString('base64');
			case 'decode':
				return Buffer.from(data, 'base64').toString('ascii');
		}
	},
	md5: (data, block) => {
		return data;
	},
	sha1: (data, block) => {
		return data;
	},
	sha256: (data, block) => {
		return data;
	},
	sha512: (data, block) => {
		return data;
	},
};
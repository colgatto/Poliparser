const crypto = require('crypto');

const getHash = (type, data, block) => {
	let digest = typeof block.digest == 'undefined' ? 'hex' : block.digest;
	if(typeof block.secret != 'undefined')
		return crypto.createHmac(type, block.secret).update(data).digest(digest).toString('hex');
	else
		return crypto.createHash(type).update(data).digest(digest).toString('hex');
};

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
		return getHash('md5', data, block);
	},
	sha1: (data, block) => {
		return getHash('sha1', data, block);
	},
	sha256: (data, block) => {
		return getHash('sha256', data, block);
	},
	sha512: (data, block) => {
		return getHash('sha512', data, block);
	},
};
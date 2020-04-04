const crypto = require('crypto');

const getHash = (type, data, block) => {
	let digest = typeof block.digest == 'undefined' ? 'hex' : block.digest;
	if(typeof block.secret != 'undefined')
		return crypto.createHmac(type, block.secret).update(data).digest(digest).toString('hex');
	else
		return crypto.createHash(type).update(data).digest(digest).toString('hex');
};

const valid_chiper_list = {
	'aes-128-cbc': 16,
	'aes-128-cbc-hmac-sha1': 16,
	'aes-128-cbc-hmac-sha256': 16,
	'aes-128-cfb': 16,
	'aes-128-cfb1': 16,
	'aes-128-cfb8': 16,
	'aes-128-ctr': 16,
	'aes-128-ofb': 16,
	'aes128': 16,
	'aria-128-cbc': 16,
	'aria-128-cfb': 16,
	'aria-128-cfb1': 16,
	'aria-128-cfb8': 16,
	'aria-128-ctr': 16,
	'aria-128-ofb': 16,
	'aria128': 16,
	'camellia-128-cbc': 16,
	'camellia-128-cfb': 16,
	'camellia-128-cfb1': 16,
	'camellia-128-cfb8': 16,
	'camellia-128-ctr': 16,
	'camellia-128-ofb': 16,
	'camellia128': 16,
	'id-aes128-GCM': 16,
	'seed': 16,
	'seed-cbc': 16,
	'seed-cfb': 16,
	'seed-ofb': 16,
	'sm4': 16,
	'sm4-cbc': 16,
	'sm4-cfb': 16,
	'sm4-ctr': 16,
	'sm4-ofb': 16,
	'aes-192-cbc': 24,
	'aes-192-cfb': 24,
	'aes-192-cfb1': 24,
	'aes-192-cfb8': 24,
	'aes-192-ctr': 24,
	'aes-192-ofb': 24,
	'aes192': 24,
	'aria-192-cbc': 24,
	'aria-192-cfb': 24,
	'aria-192-cfb1': 24,
	'aria-192-cfb8': 24,
	'aria-192-ctr': 24,
	'aria-192-ofb': 24,
	'aria192': 24,
	'camellia-192-cbc': 24,
	'camellia-192-cfb': 24,
	'camellia-192-cfb1': 24,
	'camellia-192-cfb8': 24,
	'camellia-192-ctr': 24,
	'camellia-192-ofb': 24,
	'camellia192': 24,
	'aes-256-cbc': 32,
	'aes-256-cbc-hmac-sha1': 32,
	'aes-256-cbc-hmac-sha256': 32,
	'aes-256-cfb': 32,
	'aes-256-cfb1': 32,
	'aes-256-cfb8': 32,
	'aes-256-ctr': 32,
	'aes-256-ofb': 32,
	'aes256': 32,
	'aria-256-cbc': 32,
	'aria-256-cfb': 32,
	'aria-256-cfb1': 32,
	'aria-256-cfb8': 32,
	'aria-256-ctr': 32,
	'aria-256-ofb': 32,
	'aria256': 32,
	'camellia-256-cbc': 32,
	'camellia-256-cfb': 32,
	'camellia-256-cfb1': 32,
	'camellia-256-cfb8': 32,
	'camellia-256-ctr': 32,
	'camellia-256-ofb': 32,
	'camellia256': 32,
	'chacha20': 32
};

module.exports = {
	/** @docgen
	@name md5
	@lib crypto
	@desc Create MD5 hash of given value.
	@input `String`
	@output `String`
	@param digest [`String`] <`'hex'`> Hash digest.
	@param secret [`String`] <`false`> Hash secret.
	**/
	md5: (data, block) => {
		return getHash('md5', data, block);
	},
	/** @docgen
	@name sha1
	@lib crypto
	@desc Create SHA1 hash of given value.
	@input `String`
	@output `String`
	@param digest [`String`] <`'hex'`> Hash digest.
	@param secret [`String`] <`false`> Hash secret.
	**/
	sha1: (data, block) => {
		return getHash('sha1', data, block);
	},
	/** @docgen
	@name sha256
	@lib crypto
	@desc Create SHA256 hash of given value.
	@input `String`
	@output `String`
	@param digest [`String`] <`'hex'`> Hash digest.
	@param secret [`String`] <`false`> Hash secret.
	**/
	sha256: (data, block) => {
		return getHash('sha256', data, block);
	},
	/** @docgen
	@name sha512
	@lib crypto
	@desc Create SHA512 hash of given value.
	@input `String`
	@output `String`
	@param digest [`String`] <`'hex'`> Hash digest.
	@param secret [`String`] <`false`> Hash secret.
	**/
	sha512: (data, block) => {
		return getHash('sha512', data, block);
	},
	/** @docgen
	@name encrypt
	@lib crypto
	@desc Generate an encrypted string using the algorithm you have chosen with salt and password, return a string composed of salt, iv and ciphertext separated by the separator.
	@input `String`
	@output `String`
	@param password [`String`] {R} The password used to encrypt text.
	@param salt [`String`] <`random Buffer`> The salt for the password.
	@param separator [`String`] <`'$'`> The separator of the output string.
	@param mode [`String`] <`'aes-256-cbc'`> The algorithm used for encryption, see [Here](https://github.com/colgatto/Poliparser/blob/master/parse_modules/library/crypto.js#L11) for a complete list.
	**/
	encrypt: (data, block) => {
		const separator = typeof block.separator == 'undefined' ? '$' : block.separator;
		const algorithm = typeof block.mode == 'undefined' ? 'aes-256-cbc' : block.mode;
		if(typeof valid_chiper_list[algorithm] == 'undefined')
			throw new Error('Invalid mode');
		let salt = typeof block.salt == 'undefined' ? crypto.randomBytes(16).toString('hex') : block.salt;
		let key = crypto.scryptSync(block.password, salt, valid_chiper_list[algorithm]);
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv(algorithm, key, iv);
		return salt + separator + iv.toString('hex') + separator + cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
	},
	/** @docgen
	@name decrypt
	@lib crypto
	@desc Decode an encrypted string generated with crypto_encrypt module, the string must contains salt, iv and ciphertext separated by the separator.
	@input `String`
	@output `String`
	@param password [`String`] {R} The password used to encrypt the original text.
	@param separator [`String`] <`'$'`> The separator of the input string.
	@param mode [`String`] <`'aes-256-cbc'`> The algorithm to use for decryption.
	**/
	decrypt: (data, block) => {
		const separator = typeof block.separator == 'undefined' ? '$' : block.separator;
		const algorithm = typeof block.mode == 'undefined' ? 'aes-256-cbc' : block.mode;
		if(typeof valid_chiper_list[algorithm] == 'undefined')
			throw new Error('Invalid mode');
		let part = data.split(separator);
		let key = crypto.scryptSync(block.password, part[0], valid_chiper_list[algorithm]);
		const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(part[1], 'hex'));
		return decipher.update(part[2], 'hex', 'utf8') + decipher.final('utf8');
	}
};
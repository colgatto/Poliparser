const crypto = require('crypto');

const getHash = (type, data, block) => {
	let digest = typeof block.digest == 'undefined' ? 'hex' : block.digest;
	if(typeof block.secret != 'undefined')
		return crypto.createHmac(type, block.secret).update(data).digest(digest).toString('hex');
	else
		return crypto.createHash(type).update(data).digest(digest).toString('hex');
};

const validChip = {
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
	@desc create MD5 hash of given value.
	@input `String`
	@output `String`
	@param digest [`String`] <`'hex'`> hash digest
	@param secret [`String`] <`false`> hash secret
	**/
	md5: (data, block) => {
		return getHash('md5', data, block);
	},
	/** @docgen
	@name sha1
	@lib crypto
	@desc create SHA1 hash of given value.
	@input `String`
	@output `String`
	@param digest [`String`] <`'hex'`> hash digest
	@param secret [`String`] <`false`> hash secret
	**/
	sha1: (data, block) => {
		return getHash('sha1', data, block);
	},
	/** @docgen
	@name sha256
	@lib crypto
	@desc create SHA256 hash of given value.
	@input `String`
	@output `String`
	@param digest [`String`] <`'hex'`> hash digest
	@param secret [`String`] <`false`> hash secret
	**/
	sha256: (data, block) => {
		return getHash('sha256', data, block);
	},
	/** @docgen
	@name sha512
	@lib crypto
	@desc create SHA512 hash of given value.
	@input `String`
	@output `String`
	@param digest [`String`] <`'hex'`> hash digest
	@param secret [`String`] <`false`> hash secret
	**/
	sha512: (data, block) => {
		return getHash('sha512', data, block);
	},
	crypt: (data, block) => {
		const separator = typeof block.separator == 'undefined' ? '$' : block.separator;
		const algorithm = typeof block.mode == 'undefined' ? 'aes-256-cbc' : block.mode;
		if(typeof validChip[algorithm] == 'undefined')
			throw new Error('Invalid mode');
		let salt = typeof block.salt == 'undefined' ? crypto.randomBytes(16).toString('hex') : block.salt;
		let key = crypto.scryptSync(block.password, salt, validChip[algorithm]);
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv(algorithm, key, iv);
		return salt + separator + iv.toString('hex') + separator + cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
	},
	decrypt: (data, block) => {
		const separator = typeof block.separator == 'undefined' ? '$' : block.separator;
		const algorithm = typeof block.mode == 'undefined' ? 'aes-256-cbc' : block.mode;
		if(typeof validChip[algorithm] == 'undefined')
			throw new Error('Invalid mode');
		let part = data.split(separator);
		let key = crypto.scryptSync(block.password, part[0], validChip[algorithm]);
		const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(part[1], 'hex'));
		return decipher.update(part[2], 'hex', 'utf8') + decipher.final('utf8');
	}
};
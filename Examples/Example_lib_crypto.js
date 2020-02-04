let Poliparser = require('..');

let data = 'secret data';

let p = {
	
	sha512: new Poliparser({
		m: 'crypto_sha512'
	}).parse(data),

	sha512_2: new Poliparser({
		m: 'crypto_sha512'
	}).parse(data),

	sha512_secret: new Poliparser({
		m: 'crypto_sha512',
		secret: 'wei'
	}).parse(data),
	
	aes: new Poliparser({
		m: 'crypto_crypt',
		mode: 'aes128',
		password: 'str0ngP4$$worD'
	}).parse(data)
};

console.log(p);
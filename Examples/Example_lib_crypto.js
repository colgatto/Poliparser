let Poliparser = require('..');

let data = 'secret data';

let p = {
	
	sha: new Poliparser({
		f: 'crypto_sha512'
	}).run(data),
	
	aes: new Poliparser({
		f: 'crypto_crypt',
		mode: 'aes128',
		password: 'str0ngP4$$worD'
	}).run(data)
};

console.log(p);
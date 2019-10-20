let Poliparser = require('..');

let data = 'secret data';

let p = new Poliparser({
	sha: {
		f: 'crypto_sha512'
	},
	aes: {
		f: 'crypto_crypt',
		mode: 'aes128',
		password: 'pippone'
	},
	err: {
		f: 'crypto_crypt',
		mode: 'moda',
		password: 'pippone'
	},
});

let output = p.run(data);

console.log(output);
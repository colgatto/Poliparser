module.exports = (p, data) => {
	switch(p.value){
		case 'encode':
			return Buffer.from(data).toString('base64');
		case 'decode':
			return Buffer.from(data, 'base64').toString('ascii');
	}
};
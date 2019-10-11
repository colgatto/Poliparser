/** docgen
 base64
 * 	fai la base64 delle cose
 *	parameters:
		value [String] descrizione della cosa 
 * 
**/
module.exports = (data, block) => {
	switch(block.value){
		case 'encode':
			return Buffer.from(data).toString('base64');
		case 'decode':
			return Buffer.from(data, 'base64').toString('ascii');
	}
};
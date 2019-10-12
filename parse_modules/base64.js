/** @docgen
@name base64
@desc fai la base64 delle cose
@input String
@output String
@param value [String] {R} descrizione della cosa 
@param FUFA [aNY ony] <qualcosa o qualcos'altro > descrizione della cosa 
@return   [Stri  ng] descrizione del ritorno
**/
module.exports = (data, block) => {
	switch(block.value){
		case 'encode':
			return Buffer.from(data).toString('base64');
		case 'decode':
			return Buffer.from(data, 'base64').toString('ascii');
	}
};
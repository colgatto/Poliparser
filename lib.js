module.exports = {
	_csv_parse: (data, block) => {
		let separator = typeof block.separator == 'undefined' ? ',' : block.separator;
		let stringSeparator = typeof block.stringSeparator == 'undefined' ? '' : block.stringSeparator;
		let parseNumber = typeof block.parseNumber == 'undefined' ? true : block.parseNumber;
		const csvsep = data => {
			let r = [];
			let s = '';
			for(let i = 0, bar = 0, instr = 0; i < data.length; i++){
				if(bar){
					s += data[i];
					bar = 0;
					continue;
				}
				if(data[i] == "\\"){
					s += data[i];
					bar = 1;
					continue;
				}
				if(data[i] == stringSeparator){
					s += data[i];
					instr =! instr;
					continue;
				}
				if(data[i] == separator && !instr){
					r.push(s);
					s = "";
				}else{
					s += data[i];
				}
			}
			r.push(s);
			return r;
		}
		let lines = data.split(/\r?\n/);
		lines = lines.filter(x=>x);
		if(lines.length == 0) return [];
		let out = [];
		let keys = csvsep(lines.shift());
		for (let i = 0, l = lines.length; i < l; i++) {
			let rowVal = csvsep(lines[i]);
			out[i] = {};
			for (let j = 0, l = keys.length; j < l; j++) {
				let val = rowVal[j];
				let stringed = false;
				if(stringSeparator === ''){
					out[i][keys[j]] = val;
				}else{
					if(val[0] == stringSeparator && val[val.length-1] == stringSeparator){
						stringed = true;
						val = val.slice( 1, val.length - 1 );
						val = val.split('\\' + stringSeparator).join(stringSeparator);
					}
					if(!stringed && parseNumber){
						val = Number.parseFloat(val);
					}
					out[i][keys[j]] = val;
				}
			}
		}
		return out;
	},
	_csv_stringify: (data, block) => {
		if(data.length == 0) return '';
		let lines = [];
		let separator = typeof block.separator == 'undefined' ? ',' : block.separator;
		let stringSeparator = ( typeof block.stringSeparator == 'undefined' || !block.stringSeparator ) ? '' : block.stringSeparator;
		let keys = [];
		for (let i = 0, l = data.length; i < l; i++){
			let k = Object.keys(data[i]);
			for (let j = 0, l = k.length; j < l; j++){
				if(!keys.includes(k[j]))
					keys.push(k[j]);
			}
		}
	
		//CSV HEADER
		lines.push(keys.join(separator));
	
		for (let i = 0, l = data.length; i < l; i++) {
			let line = [];
			for (let j = 0, ll = keys.length; j < ll; j++) {
				let v = data[i][keys[j]];
				if(typeof v == 'string'){
					line.push(stringSeparator + (stringSeparator == '' ? v : v.split(stringSeparator).join('\\' + stringSeparator) ) + stringSeparator);
				}else{
					line.push(v);
				}
			}
			lines.push(line.join(separator));
		}
	
		return lines.join('\n');
	}
}
var request = require('request');

const str = [
	'http://www.pierotofy.it',
	//'http://www.pierotofy.it/',
	//'http://regex101.com/ciao/wela',
	//'http://www.regex101.com',
	//'NO!',
	//'https://www.regex101.com/wei.html',
	//'regex101.com/cosa/cosa2?ciao=23&x=no',
	//'www.regex101.com/'
];

const normalizeUrl = url => {
	const regex = /^(?:https?:\/\/)?([a-zA-Z0-9.]+)(?:\/(.+)?)?$/;
	let m = regex.exec(url);
	let path = false;
	let param = {};
	if(m == null){
		return false;
	}
	return m[1] + ( typeof m[2] == 'undefined' ? '' : '/' + m[2]);
}

const parseUrl = (url) => {
	return new Promise((resolve, reject) => {
		try {
			url = normalizeUrl(url);
			if(!url){
				reject('invalid url!');
			}else{
				request('https://' + url, function (err, response, body) {
					if(err){
						reject(err);
					}else{
						resolve(body);
					}
				});
			}
		} catch (e) {
			reject(e);
		}
	});
}


for (let i = 0; i < str.length; i++) {
	parseUrl(str[i]).then((data) => {
		console.log(data.length);
	});
}
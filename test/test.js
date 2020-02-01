'use strict';

const expect = require('chai').expect;
const Poliparser = require('..');

describe('test blocks type', function() {
    it('base64', function() {
		
		let data = 'Hello my name is Poliparser';
		let data64 = 'SGVsbG8gbXkgbmFtZSBpcyBQb2xpcGFyc2Vy';
		let p = new Poliparser({
			f: 'str_base64',
			value: 'encode'
		});
		let output = p.run(data);

		let p64 = new Poliparser();
		p64.setParser({
			f: 'str_base64',
			value: 'decode'
		});
		let output64 = p64.run(data64);

		expect(output).to.equal(data64);
		expect(output64).to.equal(data);
    });
    it('between', function() {
		let data = 'Hello my name is <p>Poliparser</p>';
		let m = new Poliparser({
			f: 'str_between',
			from: '<p>',
			to: '</p>'
		});
		let output = m.run(data);
		expect(output).to.equal('Poliparser');
    });
	it('custom', function() {
		let data = [
			{ val: 'data1' },
			{ val: 'data2' },
			{ val: 'data3' }
		];
		let m = new Poliparser({
			f: 'custom',
			value: (d) => d.map( x => x.val)
		});
		let output = m.run(data);
		expect(JSON.stringify(output)).to.equal(JSON.stringify(['data1','data2','data3']));
	});
	it('dom', function() {
		let data = `<html><head><title>prova</title></head><body>
			<a href="link1.html" class="hiper">hello</a> world<br>
			<a href="link2.html" class="hiper" data-label="byebye">bye</a> world<br>
			<a href="link3.html" class="not-hiper" data-label="adios">ciao3</a> world<br>
		</body></html>`;
		let arr_data = ['<a>dato1</a>','<a>dato<br>2</a>','<a>dato3</a>'];
		let m = {
			link: new Poliparser({
				f: 'dom',
				value: 'a.hiper',
				attr: 'href'
			}).run(data),
			link_and_label: new Poliparser({
				f: 'dom',
				value: 'a',
				attr: ['href' , 'data-label']
			}).run(data)
		};
		let m_arr = new Poliparser([{
			f: 'dom',
			value: 'a'
		},{
			f:'custom',
			value: (data) => data.map( x => x[0].text )
		}]).run(arr_data);

		expect(JSON.stringify(m.link)).to.equal(JSON.stringify([ 'link1.html', 'link2.html' ]));
		expect(JSON.stringify(m.link_and_label)).to.equal(JSON.stringify([
			{ href: 'link1.html' },
			{ href: 'link2.html', 'data-label': 'byebye' },
			{ href: 'link3.html', 'data-label': 'adios' }
		]));

		expect(JSON.stringify(m_arr)).to.equal(JSON.stringify(['dato1', 'dato2', 'dato3']));
	});

	it('json', function() {
		let str_json = '{"a":34,"b":"ciao","we":{"we2":"23"}}';
		let obj_json = {
			a: 34, b: "ciao",
			we: {
				we2: "23"
			}
		};
		let m1 = new Poliparser({
			f: 'json',
			value: 'stringify'
		}).run(obj_json);
		let m2 = new Poliparser({
			f: 'json',
			value: 'parse'
		}).run(str_json);
		let m3 = new Poliparser({
			f: 'json',
			value: 'stringify',
			pretty: true,
			space: 2
		}).run(obj_json);
		let m4 = new Poliparser({
			f: 'json',
			value: 'stringify',
			pretty: true
		}).run(obj_json);
		expect(JSON.stringify(obj_json)).to.equal(m1);
		expect(JSON.stringify(m2)).to.equal(str_json);
		expect(JSON.stringify(obj_json, null, 2)).to.equal(m3);
		expect(JSON.stringify(obj_json, null, 4)).to.equal(m4);
	});
	it('key', function() {
		let data = {name: 'foo', phone: '011-111222333', surname: 'bar'};
		let p = new Poliparser({
			f: 'obj_getKey',
			value: 'phone'
		});
		let pp = new Poliparser({
			f: 'obj_getKey',
			value: ['name', 'surname']
		});
		let output = p.run(data);
		let output2 = pp.run(data);
		expect(output).to.equal(data.phone);
		expect(JSON.stringify(output2)).to.equal(JSON.stringify({name: 'foo', surname: 'bar'}));
	});
	
	it('regex', function() {
		let data = `Contact Admin 011-11122111 Headquarter Industry Inc. 011-22211222`;
		let arr_data = [
			'Admin 011-11122111',
			'Headquarter 011-22211222'
		];
		let empty = '';
		let m ={
			name:  new Poliparser({
				f: 'regex',
				value: /Headquarter ([a-zA-Z0-9 ]+\.) .*/,
				only: 'matches'
			}).run(data),
			phone: new Poliparser({
				f: 'regex',
				value: /[0-9]{3}-[0-9]{8}/g,
				only: 'full'
			}).run(data),
			nullD: new Poliparser({
				f: 'regex',
				value: /data unwrited/
			}).run(data),
			glob: new Poliparser({
				f: 'regex',
				value: /(\d)$/g,
				only: 'index'
			}).run(data)
		};
		let arr_m = {
			rec: new Poliparser({
				f: 'regex',
				value: /[a-zA-Z]+ ([0-9-]+)$/,
				only: 'matches',
				group: 0
			}).run(arr_data),
			rec_g: new Poliparser({
				f: 'regex',
				value: /[a-zA-Z]+ ([0-9-]+)$/g,
				only: 'matches',
				group: 0
			}).run(arr_data)
		};
		let emp = {
			val_g: new Poliparser({
				f: 'regex',
				value: /(hi)?/g
			}).run(empty),
			val: new Poliparser({
				f: 'regex',
				value: /(hi)?/
			}).run(empty)
		};
		expect(JSON.stringify(m.name)).to.equal(JSON.stringify([ 'Industry Inc.' ]));
		expect(JSON.stringify(m.phone)).to.equal(JSON.stringify([ '011-11122111', '011-22211222' ]));
		expect(m.nullD).to.equal(null);
		
		expect(JSON.stringify(emp.val_g)).to.equal(JSON.stringify([{
			full: "",
			matches: [ null ],
			index: 0 
		}]));
		expect(JSON.stringify(emp.val)).to.equal(JSON.stringify({
			full: "",
			matches: [ null ],
			index: 0 
		}));

		expect(JSON.stringify(m.glob)).to.equal(JSON.stringify([64]));
		
		expect(JSON.stringify(arr_m.rec)).to.equal(JSON.stringify([ '011-11122111', '011-22211222' ]));
		expect(JSON.stringify(arr_m.rec_g)).to.equal(JSON.stringify([ ['011-11122111'], ['011-22211222'] ]));
	});
	
	it('trim', function() {
		let data = '    ciao   ';
		let arr_data = ['    ciao   ','ciao   ','    ciao'];
		let m = {
			base: new Poliparser({
				f: 'str_trim'
			}).run(data),
			start: new Poliparser({
				f: 'str_trim',
				end: false
			}).run(data),
			end: new Poliparser({
				f: 'str_trim',
				start: false
			}).run(data),
			custom: new Poliparser({
				f: 'str_trim',
				value: [' ', '\t', 'c', 'o']
			}).run(data),
			start_c: new Poliparser({
				f: 'str_trim',
				value: [' ', '\t', 'c', 'o'],
				end: false
			}).run(data),
			end_c: new Poliparser({
				f: 'str_trim',
				value: [' ', '\t', 'c', 'o'],
				start: false
			}).run(data),
		};
		let m_arr = new Poliparser({
			f: 'str_trim'
		}).run(arr_data);
		expect(m.base).to.equal('ciao');
		expect(m.start).to.equal('ciao   ');
		expect(m.start_c).to.equal('iao   ');
		expect(m.end).to.equal('    ciao');
		expect(m.end_c).to.equal('    cia');
		expect(m.custom).to.equal('ia');
		expect(JSON.stringify(m_arr)).to.equal(JSON.stringify(['ciao','ciao','ciao']));
	});
	it('log', function() {
		let data = 'hi';
		let m = new Poliparser({
			f: 'log'
		});
		let output = m.run(data);
		expect(output).to.equal('hi');
	});
	it('array_uniq', function() {
		let data = [1,1,2,3,4,4,4,5,6,7,8,9,9,9,0,0];
		let m = new Poliparser({
			f: 'array_uniq'
		});
		let output = m.run(data);
		expect(JSON.stringify(output)).to.equal(JSON.stringify([1,2,3,4,5,6,7,8,9,0]));
	});
	it('array_mix', function() {
		let data = [1,0,1,2,9,8,7,4,5,6,3,3,3,9,9,0];
		let sData = Array.from(data);
		sData.sort();
		let sdData = Array.from(data);
		sdData.sort( (a, b) => {
			return b < a ? -1 : 1;
		});
		let rData = Array.from(data);
		rData.reverse();
		let m = {
			min: new Poliparser({ f: 'array_min' }),
			max: new Poliparser({ f: 'array_max' }),
			indexMax: new Poliparser({ f: 'array_indexMax' }),
			indexMin: new Poliparser({ f: 'array_indexMin' }),
			count: new Poliparser({ f: 'array_count' }),
			sum: new Poliparser({ f: 'array_sum' }),
			map: new Poliparser({
				f: 'array_map',
				value: x => 'MM' + x
			}),
			filter: new Poliparser({
				f: 'array_filter',
				value: x => x > 7
			}),
			reduce: new Poliparser({
				f: 'array_reduce',
				start: 10,
				value: (x, tot) => x + tot
			}),
			reduce_no_start: new Poliparser({
				f: 'array_reduce',
				value: (x, tot) => x + tot
			}),
			join: new Poliparser({
				f: 'array_join',
				value: '-'
			}),
			empty_join: new Poliparser({
				f: 'array_join'
			}),
			indexOf: new Poliparser({
				f: 'array_indexOf',
				value: 9
			}),
			lastIndexOf: new Poliparser({
				f: 'array_lastIndexOf',
				value: 9
			}),
			indexOf_s: new Poliparser({
				f: 'array_indexOf',
				value: 9,
				position: 5
			}),
			lastIndexOf_s: new Poliparser({
				f: 'array_lastIndexOf',
				value: 9,
				position: 10
			}),
			pop: new Poliparser({
				f: 'array_pop'
			}),
			shift: new Poliparser({
				f: 'array_shift'
			}),
			slice: new Poliparser({
				f: 'array_slice'
			}),
			slice_def: new Poliparser({
				f: 'array_slice',
				start: 2,
				end: 5
			}),
			sort: new Poliparser({
				f: 'array_sort'
			}),
			sort_def: new Poliparser({
				f: 'array_sort',
				value: (a, b) => {
					return b < a ? -1 : 1;
				}
			}),
			reverse: new Poliparser({
				f: 'array_reverse'
			})
		};


		let output = {};
		for (const k in m) {
			output[k] = m[k].run(data);
		}

		let null_output = {};
		for (const k in m) {
			null_output[k] = m[k].run([]);
		}

		expect(JSON.stringify(null_output)).to.equal(JSON.stringify({
			min: null, max: null, indexMax: null, indexMin: null, count: 0, sum: 0, map: [], filter: [], reduce: 10, reduce_no_start: null, join: '', empty_join: '',
			indexOf: -1, lastIndexOf: -1, indexOf_s: -1, lastIndexOf_s: -1, pop: [], shift: [], slice: [], slice_def: [], sort: [], sort_def: [], reverse: []
		}));
		expect(JSON.stringify(output)).to.equal(JSON.stringify({
			min: 0, max: 9, indexMax: 4, indexMin: 1, count: 16, sum: 70,
			map: data.map( x => 'MM' + x), filter: data.filter(x => x > 7),  reduce: data.reduce( (t, x) => x + t, 10),  reduce_no_start: data.reduce( (t, x) => x + t),
			join: data.join('-'), empty_join: data.join(''), indexOf: 4, lastIndexOf: 14, indexOf_s: 13, lastIndexOf_s: 4,
			pop: [1,0,1,2,9,8,7,4,5,6,3,3,3,9,9], shift: [0,1,2,9,8,7,4,5,6,3,3,3,9,9,0],
			slice: data, slice_def: [1,2,9], sort: sData, sort_def: sdData, reverse: rData
		}));
	});
	
	/**/
	it('array_flat', function() {
		let data = [ 1, 1, [ 2, 2, [ 3, 3, [ 4 ] ], 2, 2, [ 3, 3 ] ], 1, 1, 1, [ 2, 2 ], 1 ];
		let data_1 = [ 1, 1, 2, 2, [ 3, 3, [ 4 ] ], 2, 2, [ 3, 3 ], 1, 1, 1, 2, 2, 1 ];
		let data_2 = [ 1, 1, 2, 2, 3, 3, [ 4 ], 2, 2, 3, 3, 1, 1, 1, 2, 2, 1 ];
		let data_i1 = [ 1, 1, [ 2, 2, [ 3, 3, 4 ], 2, 2, 3, 3 ], 1, 1, 1, 2, 2, 1 ];
		let data_i2 = [ 1, 1, [ 2, 2, 3, 3, 4, 2, 2, 3, 3 ], 1, 1, 1, 2, 2, 1 ];
		let data_clean = [ 1, 1, 2, 2, 3, 3, 4, 2, 2, 3, 3, 1, 1, 1, 2, 2, 1 ];

		let base = new Poliparser({
			f: 'array_flat'
		});
		let deep_1 = new Poliparser({
			f: 'array_flat',
			deep: 1
		});
		let deep_2 = new Poliparser({
			f: 'array_flat',
			deep: 2
		});
		let inverseDeep_1 = new Poliparser({
			f: 'array_flat',
			deep: -1
		});
		let inverseDeep_2 = new Poliparser({
			f: 'array_flat',
			deep: -2
		});

		expect(JSON.stringify(base.run(data))).to.equal(JSON.stringify(data_clean));
		expect(JSON.stringify(deep_1.run(data))).to.equal(JSON.stringify(data_1));
		expect(JSON.stringify(deep_2.run(data))).to.equal(JSON.stringify(data_2));
		expect(JSON.stringify(inverseDeep_1.run(data))).to.equal(JSON.stringify(data_i1));
		expect(JSON.stringify(inverseDeep_2.run(data))).to.equal(JSON.stringify(data_i2));
		expect(JSON.stringify(base.run([]))).to.equal(JSON.stringify([]));
	});
	it('str_mix', function() {
		let data = "1234567890";
		let m = {
			split: new Poliparser({ f: 'str_split', value: '6' }).run(data),
			reverse: new Poliparser({ f: 'str_reverse' }).run(data),
			charAt: new Poliparser({ f: 'str_charAt', value: 2 }).run(data),
			charAt_0: new Poliparser({ f: 'str_charAt' }).run(data),
			replace: new Poliparser({
				f: 'str_replace',
				value: '2345',
				newValue: 'Z'
			}).run(data)
		};
		expect(JSON.stringify(m.split)).to.equal(JSON.stringify(["12345","7890"]));
		expect(m.reverse).to.equal('0987654321');
		expect(m.charAt).to.equal('3');
		expect(m.charAt_0).to.equal('1');
		expect(m.replace).to.equal('1Z67890');
	});
	it('obj_mix', function() {
		let data = {
			key1: 'val1',
			key2: 'val2'
		};		
		let m = {
			key: new Poliparser({ f: 'obj_keys' }).run(data),
			value: new Poliparser({ f: 'obj_values' }).run(data),
			entries: new Poliparser({ f: 'obj_entries' }).run(data)
		};

		let dataArr = [["key1","val1"],["key2","val2"]];
		let mArr = new Poliparser({ f: 'obj_fromEntries' }).run(dataArr);

		expect(JSON.stringify(m.key)).to.equal(JSON.stringify(["key1","key2"]));
		expect(JSON.stringify(m.value)).to.equal(JSON.stringify(["val1","val2"]));
		expect(JSON.stringify(m.entries)).to.equal(JSON.stringify([["key1","val1"],["key2","val2"]]));
		expect(JSON.stringify(mArr)).to.equal(JSON.stringify(data));
	});

	it('crypto_mix', function() {
		let data = "ciao";
		let m = {
			md5: new Poliparser({ f: 'crypto_md5' }).run(data),
			md5_s: new Poliparser({ f: 'crypto_md5', digest: 'ascii', secret: 'segretissimo' }).run(data),
			sha1: new Poliparser({ f: 'crypto_sha1' }).run(data),
			sha1_s: new Poliparser({ f: 'crypto_sha1', secret: 'segretissimo', digest: 'ascii' }).run(data),
			sha256: new Poliparser({ f: 'crypto_sha256' }).run(data),
			sha256_s: new Poliparser({ f: 'crypto_sha256', secret: 'segretissimo', digest: 'ascii' }).run(data),
			sha512: new Poliparser({ f: 'crypto_sha512' }).run(data),
			sha512_s: new Poliparser({ f: 'crypto_sha512', secret: 'segretissimo', digest: 'ascii' }).run(data),
			aes: new Poliparser([
				{ f: 'crypto_crypt', password: 'segretissimo' },
				{ f: 'crypto_decrypt', password: 'segretissimo'}
			]).run(data),
			aes_salt: new Poliparser([
				{ f: 'crypto_crypt', mode: 'aes-256-cbc', password: 'segretissimo', salt: '1qazxsw23edcvfr4' },
				{ f: 'crypto_decrypt', mode: 'aes-256-cbc', password: 'segretissimo'}
			]).run(data),
			aes_sep: new Poliparser([
				{ f: 'crypto_crypt', mode: 'aes-256-cbc', password: 'segretissimo', separator: '%%' },
				{ f: 'crypto_decrypt', mode: 'aes-256-cbc', password: 'segretissimo',  separator: '%%'}
			]).run(data),
			aes_sep_salt: new Poliparser([
				{ f: 'crypto_crypt', mode: 'aes-256-cbc', password: 'segretissimo', salt: '1qazxsw23edcvfr4', separator: '%%' },
				{ f: 'crypto_decrypt', mode: 'aes-256-cbc', password: 'segretissimo',  separator: '%%'}
			]).run(data)
		};

		expect(m.md5).to.equal('6e6bc4e49dd477ebc98ef4046c067b5f');
		expect(m.md5_s).to.equal('e\t9\u000e,N5<Z\u001fx,\fk"(');
		expect(m.sha1).to.equal('1e4e888ac66f8dd41e00c5a7ac36a32a9950d271');
		expect(m.sha1_s).to.equal('0\f\u001bs\u0005\rl\u001awqDgM $]o;\u0017y');
		expect(m.sha256).to.equal('b133a0c0e9bee3be20163d2ad31d6248db292aa6dcb1ee087a2aa50e0fc75ae2');
		expect(m.sha256_s).to.equal('\u001b}\b\u000fB\u0003H\u0014S\u0010Cr^eW,H#Yb+\u00077&xk66+\rH}');
		expect(m.sha512).to.equal('a0c299b71a9e59d5ebb07917e70601a3570aa103e99a7bb65a58e780ec9077b1902d1dedb31b1457beda595fe4d71d779b6ca9cad476266cc07590e31d84b206');
		expect(m.sha512_s).to.equal('XN}Vo5J50U?w}-{g3\r[\u0003\u000e;4f|\b\u0019U \r\u000f1\u0010\n`%B\u0019yap*!D\f^8\u001a6C\t\u0001%#dD\f3%P^[L/');
		expect(m.aes).to.equal(data);
		expect(m.aes_salt).to.equal(data);
		expect(m.aes_sep).to.equal(data);
		expect(m.aes_sep_salt).to.equal(data);

		m = new Poliparser();

		m.setParser({
			f: 'crypto_crypt',
			mode: 'impossible_mode',
			password: 'cogito'
		});
		
		let passed = false;
		try{
			m.run(data);
		}catch(e){
			if(e.message == 'Invalid mode')
				passed = true;
		}
		expect(passed).to.equal(true);

		m.setParser({
			f: 'crypto_decrypt',
			mode: 'impossible_mode',
			password: 'cogito'
		});
		
		passed = false;
		try{
			m.run(data);
		}catch(e){
			if(e.message == 'Invalid mode')
				passed = true;
		}
		expect(passed).to.equal(true);
	});

	it('undefined block', function() {
		let data = 'hi';
		let m = new Poliparser( 42 );
		let output = m.run(data);
		expect(output).to.equal('hi');
	});
	it('add module', function() {
		let data = 10;
		let m = new Poliparser();

		m.setModule('testing_parser', (data, block) => {
			return data * block.value;
		})

		m.requireModule('my_mul', __dirname + '/myModule.js');

		m.setParser({
			f: 'testing_parser',
			value:  2
		});
		expect(m.run(data)).to.equal(20);

		m.setParser({
			f: 'testing_parser',
			value: 4 
		});
		expect(m.run(data)).to.equal(40);
		
		m.setParser({
			f: 'my_mul',
			value: 3
		});
		expect(m.run(data)).to.equal(30);

	});

	it('add library', function() {
		let data = 10;
		let m = new Poliparser();

		m.setLibrary('testingLib', {
			mod1: (data, block) => {
			return data * block.value;
			},
			mod2: (data, block) => {
				return data + 'XX';
			}
		});

		m.requireLibrary('my_lib', __dirname + '/myLibrary.js');
		
		m.setParser({
			f: 'testingLib_mod1',
			value:  3
		});
		expect(m.run(data)).to.equal(30);

		m.setParser({
			f: 'testingLib_mod2',
			value: 4 
		});
		expect(m.run(data)).to.equal("10XX");

		m.setParser({
			f: 'my_lib_mod1'
		});
		expect(m.run(data)).to.equal("MyLibrary_mod1 hello 10");
	});
});
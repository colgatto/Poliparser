'use strict';

const expect = require('chai').expect;
const Poliparser = require('..');

describe('test blocks type', function (done) {
	it('base64', function () {

		let data = 'Hello my name is Poliparser';
		let data64 = 'SGVsbG8gbXkgbmFtZSBpcyBQb2xpcGFyc2Vy';
		let p = new Poliparser({
			m: 'str_base64',
			value: 'encode'
		});
		let output = p.parse(data);

		let p64 = new Poliparser();
		p64.setParser({
			m: 'str_base64',
			value: 'decode'
		});
		let output64 = p64.parse(data64);

		expect(output).to.equal(data64);
		expect(output64).to.equal(data);
	});
	it('between', function () {
		let data = 'Hello my name is <p>Poliparser</p>';
		let m = new Poliparser({
			m: 'str_between',
			from: '<p>',
			to: '</p>'
		});
		let output = m.parse(data);
		expect(output).to.equal('Poliparser');
	});
	it('custom', function () {
		let data = [
			{ val: 'data1' },
			{ val: 'data2' },
			{ val: 'data3' }
		];
		let m = new Poliparser({
			m: 'custom',
			value: (d) => d.map(x => x.val)
		});
		let output = m.parse(data);
		expect(JSON.stringify(output)).to.equal(JSON.stringify(['data1', 'data2', 'data3']));
	});
	it('dom', function () {
		let data = `<html><head><title>prova</title></head><body>
			<a href="link1.html" class="hiper">hello</a> world<br>
			<a href="link2.html" class="hiper" data-label="byebye">bye</a> world<br>
			<a href="link3.html" class="not-hiper" data-label="adios">ciao3</a> world<br>
		</body></html>`;
		let arr_data = ['<a>dato1</a>', '<a>dato<br>2</a>', '<a>dato3</a>'];
		let m = {
			link: new Poliparser({
				m: 'dom',
				value: 'a.hiper',
				attr: 'href'
			}).parse(data),
			link_and_label: new Poliparser({
				m: 'dom',
				value: 'a',
				attr: ['href', 'data-label']
			}).parse(data)
		};
		let m_arr = new Poliparser([{
			m: 'dom',
			value: 'a'
		}, {
			m: 'custom',
			value: (data) => data.map(x => x[0].text)
		}]).parse(arr_data);

		expect(JSON.stringify(m.link)).to.equal(JSON.stringify(['link1.html', 'link2.html']));
		expect(JSON.stringify(m.link_and_label)).to.equal(JSON.stringify([
			{ href: 'link1.html' },
			{ href: 'link2.html', 'data-label': 'byebye' },
			{ href: 'link3.html', 'data-label': 'adios' }
		]));

		expect(JSON.stringify(m_arr)).to.equal(JSON.stringify(['dato1', 'dato2', 'dato3']));
	});
	it('json', function () {
		let str_json = '{"a":34,"b":"ciao","we":{"we2":"23"}}';
		let obj_json = {
			a: 34, b: "ciao",
			we: {
				we2: "23"
			}
		};
		let m1 = new Poliparser({
			m: 'json_stringify',
		}).parse(obj_json);
		let m2 = new Poliparser({
			m: 'json_parse'
		}).parse(str_json);
		let m3 = new Poliparser({
			m: 'json_stringify',
			pretty: true,
			space: 2
		}).parse(obj_json);
		let m4 = new Poliparser({
			m: 'json_stringify',
			pretty: true
		}).parse(obj_json);
		expect(JSON.stringify(obj_json)).to.equal(m1);
		expect(JSON.stringify(m2)).to.equal(str_json);
		expect(JSON.stringify(obj_json, null, 2)).to.equal(m3);
		expect(JSON.stringify(obj_json, null, 4)).to.equal(m4);
	});
	it('key', function () {
		let data = { name: 'foo', phone: '011-111222333', surname: 'bar' };
		let p = new Poliparser({
			m: 'obj_getKey',
			value: 'phone'
		});
		let pp = new Poliparser({
			m: 'obj_getKey',
			value: ['name', 'surname']
		});
		let output = p.parse(data);
		let output2 = pp.parse(data);
		expect(output).to.equal(data.phone);
		expect(JSON.stringify(output2)).to.equal(JSON.stringify({ name: 'foo', surname: 'bar' }));
	});
	it('regex', function () {
		let data = `Contact Admin 011-11122111 Headquarter Industry Inc. 011-22211222`;
		let arr_data = [
			'Admin 011-11122111',
			'Headquarter 011-22211222'
		];
		let empty = '';
		let m = {
			name: new Poliparser({
				m: 'regex',
				value: /Headquarter ([a-zA-Z0-9 ]+\.) .*/,
				only: 'matches'
			}).parse(data),
			phone: new Poliparser({
				m: 'regex',
				value: /[0-9]{3}-[0-9]{8}/g,
				only: 'full'
			}).parse(data),
			nullD: new Poliparser({
				m: 'regex',
				value: /data unwrited/
			}).parse(data),
			glob: new Poliparser({
				m: 'regex',
				value: /(\d)$/g,
				only: 'index'
			}).parse(data)
		};
		let arr_m = {
			rec: new Poliparser({
				m: 'regex',
				value: /[a-zA-Z]+ ([0-9-]+)$/,
				only: 'matches',
				group: 0
			}).parse(arr_data),
			rec_g: new Poliparser({
				m: 'regex',
				value: /[a-zA-Z]+ ([0-9-]+)$/g,
				only: 'matches',
				group: 0
			}).parse(arr_data)
		};
		let emp = {
			val_g: new Poliparser({
				m: 'regex',
				value: /(hi)?/g
			}).parse(empty),
			val: new Poliparser({
				m: 'regex',
				value: /(hi)?/
			}).parse(empty)
		};
		expect(JSON.stringify(m.name)).to.equal(JSON.stringify(['Industry Inc.']));
		expect(JSON.stringify(m.phone)).to.equal(JSON.stringify(['011-11122111', '011-22211222']));
		expect(m.nullD).to.equal(null);

		expect(JSON.stringify(emp.val_g)).to.equal(JSON.stringify([{
			full: "",
			matches: [null],
			index: 0
		}]));
		expect(JSON.stringify(emp.val)).to.equal(JSON.stringify({
			full: "",
			matches: [null],
			index: 0
		}));

		expect(JSON.stringify(m.glob)).to.equal(JSON.stringify([64]));

		expect(JSON.stringify(arr_m.rec)).to.equal(JSON.stringify(['011-11122111', '011-22211222']));
		expect(JSON.stringify(arr_m.rec_g)).to.equal(JSON.stringify([['011-11122111'], ['011-22211222']]));
	});
	it('trim', function () {
		let data = '    ciao   ';
		let arr_data = ['    ciao   ', 'ciao   ', '    ciao'];
		let m = {
			base: new Poliparser({
				m: 'str_trim'
			}).parse(data),
			start: new Poliparser({
				m: 'str_trim',
				end: false
			}).parse(data),
			end: new Poliparser({
				m: 'str_trim',
				start: false
			}).parse(data),
			custom: new Poliparser({
				m: 'str_trim',
				value: [' ', '\t', 'c', 'o']
			}).parse(data),
			start_c: new Poliparser({
				m: 'str_trim',
				value: [' ', '\t', 'c', 'o'],
				end: false
			}).parse(data),
			end_c: new Poliparser({
				m: 'str_trim',
				value: [' ', '\t', 'c', 'o'],
				start: false
			}).parse(data),
		};
		let m_arr = new Poliparser({
			m: 'str_trim'
		}).parse(arr_data);
		expect(m.base).to.equal('ciao');
		expect(m.start).to.equal('ciao   ');
		expect(m.start_c).to.equal('iao   ');
		expect(m.end).to.equal('    ciao');
		expect(m.end_c).to.equal('    cia');
		expect(m.custom).to.equal('ia');
		expect(JSON.stringify(m_arr)).to.equal(JSON.stringify(['ciao', 'ciao', 'ciao']));
	});
	it('break', function () {
		let p = new Poliparser();

		const data1 = [1, 2, -1, -2];
		const data2 = [1, 2, 3];

		p.setParser([{
			m: 'array_sum'
		}, {
			m: 'break',
			condition: (data) => data === 0,
			return: 'invalid'
		}, {
			m: 'custom',
			value: (data) => data * 2
		}]);

		let val1 = p.parse(data1);
		let val2 = p.parse(data2);

		expect(val1).to.equal('invalid');
		expect(val2).to.equal(12);

		p.setParser([{
			m: 'array_sum'
		}, {
			m: 'break',
			condition: (data) => data === 0
		}]);
		
		let val3 = p.parse(data1);

		expect(val3).to.equal(0);
	});
	it('log', function () {
		let data = 'hi';
		let m = new Poliparser({
			m: 'log'
		});
		let output = m.parse(data);
		expect(output).to.equal('hi');
	});
	it('array_uniq', function () {
		let data = [1, 1, 2, 3, 4, 4, 4, 5, 6, 7, 8, 9, 9, 9, 0, 0];
		let m = new Poliparser({
			m: 'array_uniq'
		});
		let output = m.parse(data);
		expect(JSON.stringify(output)).to.equal(JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));
	});
	it('array_mix', function () {
		let data = [1, 0, 1, 2, 9, 8, 7, 4, 5, 6, 3, 3, 3, 9, 9, 0];
		let sData = Array.from(data);
		sData.sort();
		let sdData = Array.from(data);
		sdData.sort((a, b) => {
			return b < a ? -1 : 1;
		});
		let rData = Array.from(data);
		rData.reverse();
		let m = {
			min: new Poliparser({ m: 'array_min' }),
			max: new Poliparser({ m: 'array_max' }),
			indexMax: new Poliparser({ m: 'array_indexMax' }),
			indexMin: new Poliparser({ m: 'array_indexMin' }),
			count: new Poliparser({ m: 'array_count' }),
			sum: new Poliparser({ m: 'array_sum' }),
			map: new Poliparser({
				m: 'array_map',
				value: x => 'MM' + x
			}),
			filter: new Poliparser({
				m: 'array_filter',
				value: x => x > 7
			}),
			reduce: new Poliparser({
				m: 'array_reduce',
				start: 10,
				value: (x, tot) => x + tot
			}),
			reduce_no_start: new Poliparser({
				m: 'array_reduce',
				value: (x, tot) => x + tot
			}),
			join: new Poliparser({
				m: 'array_join',
				value: '-'
			}),
			empty_join: new Poliparser({
				m: 'array_join'
			}),
			indexOf: new Poliparser({
				m: 'array_indexOf',
				value: 9
			}),
			lastIndexOf: new Poliparser({
				m: 'array_lastIndexOf',
				value: 9
			}),
			indexOf_s: new Poliparser({
				m: 'array_indexOf',
				value: 9,
				position: 5
			}),
			lastIndexOf_s: new Poliparser({
				m: 'array_lastIndexOf',
				value: 9,
				position: 10
			}),
			pop: new Poliparser({
				m: 'array_pop'
			}),
			shift: new Poliparser({
				m: 'array_shift'
			}),
			slice: new Poliparser({
				m: 'array_slice'
			}),
			slice_def: new Poliparser({
				m: 'array_slice',
				start: 2,
				end: 5
			}),
			sort: new Poliparser({
				m: 'array_sort'
			}),
			sort_def: new Poliparser({
				m: 'array_sort',
				value: (a, b) => {
					return b < a ? -1 : 1;
				}
			}),
			reverse: new Poliparser({
				m: 'array_reverse'
			})
		};


		let output = {};
		for (const k in m) {
			output[k] = m[k].parse(data);
		}

		let null_output = {};
		for (const k in m) {
			null_output[k] = m[k].parse([]);
		}

		expect(JSON.stringify(null_output)).to.equal(JSON.stringify({
			min: null, max: null, indexMax: null, indexMin: null, count: 0, sum: 0, map: [], filter: [], reduce: 10, reduce_no_start: null, join: '', empty_join: '',
			indexOf: -1, lastIndexOf: -1, indexOf_s: -1, lastIndexOf_s: -1, pop: [], shift: [], slice: [], slice_def: [], sort: [], sort_def: [], reverse: []
		}));
		expect(JSON.stringify(output)).to.equal(JSON.stringify({
			min: 0, max: 9, indexMax: 4, indexMin: 1, count: 16, sum: 70,
			map: data.map(x => 'MM' + x), filter: data.filter(x => x > 7), reduce: data.reduce((t, x) => x + t, 10), reduce_no_start: data.reduce((t, x) => x + t),
			join: data.join('-'), empty_join: data.join(''), indexOf: 4, lastIndexOf: 14, indexOf_s: 13, lastIndexOf_s: 4,
			pop: [1, 0, 1, 2, 9, 8, 7, 4, 5, 6, 3, 3, 3, 9, 9], shift: [0, 1, 2, 9, 8, 7, 4, 5, 6, 3, 3, 3, 9, 9, 0],
			slice: data, slice_def: [1, 2, 9], sort: sData, sort_def: sdData, reverse: rData
		}));
	});
	/**/
	it('array_flat', function () {
		let data = [1, 1, [2, 2, [3, 3, [4]], 2, 2, [3, 3]], 1, 1, 1, [2, 2], 1];
		let data_1 = [1, 1, 2, 2, [3, 3, [4]], 2, 2, [3, 3], 1, 1, 1, 2, 2, 1];
		let data_2 = [1, 1, 2, 2, 3, 3, [4], 2, 2, 3, 3, 1, 1, 1, 2, 2, 1];
		let data_i1 = [1, 1, [2, 2, [3, 3, 4], 2, 2, 3, 3], 1, 1, 1, 2, 2, 1];
		let data_i2 = [1, 1, [2, 2, 3, 3, 4, 2, 2, 3, 3], 1, 1, 1, 2, 2, 1];
		let data_clean = [1, 1, 2, 2, 3, 3, 4, 2, 2, 3, 3, 1, 1, 1, 2, 2, 1];

		let base = new Poliparser({
			m: 'array_flat'
		});
		let deep_1 = new Poliparser({
			m: 'array_flat',
			deep: 1
		});
		let deep_2 = new Poliparser({
			m: 'array_flat',
			deep: 2
		});
		let inverseDeep_1 = new Poliparser({
			m: 'array_flat',
			deep: -1
		});
		let inverseDeep_2 = new Poliparser({
			m: 'array_flat',
			deep: -2
		});
		let no_change = new Poliparser({
			m: 'array_flat',
			deep: -1
		});

		expect(JSON.stringify(base.parse(data))).to.equal(JSON.stringify(data_clean));
		expect(JSON.stringify(deep_1.parse(data))).to.equal(JSON.stringify(data_1));
		expect(JSON.stringify(deep_2.parse(data))).to.equal(JSON.stringify(data_2));
		expect(JSON.stringify(inverseDeep_1.parse(data))).to.equal(JSON.stringify(data_i1));
		expect(JSON.stringify(inverseDeep_2.parse(data))).to.equal(JSON.stringify(data_i2));
		expect(JSON.stringify(base.parse([]))).to.equal(JSON.stringify([]));
		expect(JSON.stringify(no_change.parse(data_clean))).to.equal(JSON.stringify(data_clean));
	});
	it('str_mix', function () {
		let data = "1234567890";
		let m = {
			split: new Poliparser({ m: 'str_split', value: '6' }).parse(data),
			reverse: new Poliparser({ m: 'str_reverse' }).parse(data),
			charAt: new Poliparser({ m: 'str_charAt', value: 2 }).parse(data),
			charAt_0: new Poliparser({ m: 'str_charAt' }).parse(data),
			replace: new Poliparser({
				m: 'str_replace',
				value: '2345',
				newValue: 'Z'
			}).parse(data)
		};
		expect(JSON.stringify(m.split)).to.equal(JSON.stringify(["12345", "7890"]));
		expect(m.reverse).to.equal('0987654321');
		expect(m.charAt).to.equal('3');
		expect(m.charAt_0).to.equal('1');
		expect(m.replace).to.equal('1Z67890');
	});
	it('obj_mix', function () {
		let data = {
			key1: 'val1',
			key2: 'val2'
		};
		let m = {
			key: new Poliparser({ m: 'obj_keys' }).parse(data),
			value: new Poliparser({ m: 'obj_values' }).parse(data),
			entries: new Poliparser({ m: 'obj_entries' }).parse(data)
		};

		let dataArr = [["key1", "val1"], ["key2", "val2"]];
		let mArr = new Poliparser({ m: 'obj_fromEntries' }).parse(dataArr);

		expect(JSON.stringify(m.key)).to.equal(JSON.stringify(["key1", "key2"]));
		expect(JSON.stringify(m.value)).to.equal(JSON.stringify(["val1", "val2"]));
		expect(JSON.stringify(m.entries)).to.equal(JSON.stringify([["key1", "val1"], ["key2", "val2"]]));
		expect(JSON.stringify(mArr)).to.equal(JSON.stringify(data));
	});
	it('crypto_mix', function () {
		let data = "ciao";
		let m = {
			md5: new Poliparser({ m: 'crypto_md5' }).parse(data),
			md5_s: new Poliparser({ m: 'crypto_md5', digest: 'ascii', secret: 'segretissimo' }).parse(data),
			sha1: new Poliparser({ m: 'crypto_sha1' }).parse(data),
			sha1_s: new Poliparser({ m: 'crypto_sha1', secret: 'segretissimo', digest: 'ascii' }).parse(data),
			sha256: new Poliparser({ m: 'crypto_sha256' }).parse(data),
			sha256_s: new Poliparser({ m: 'crypto_sha256', secret: 'segretissimo', digest: 'ascii' }).parse(data),
			sha512: new Poliparser({ m: 'crypto_sha512' }).parse(data),
			sha512_s: new Poliparser({ m: 'crypto_sha512', secret: 'segretissimo', digest: 'ascii' }).parse(data),
			aes: new Poliparser([
				{ m: 'crypto_crypt', password: 'segretissimo' },
				{ m: 'crypto_decrypt', password: 'segretissimo' }
			]).parse(data),
			aes_salt: new Poliparser([
				{ m: 'crypto_crypt', mode: 'aes-256-cbc', password: 'segretissimo', salt: '1qazxsw23edcvfr4' },
				{ m: 'crypto_decrypt', mode: 'aes-256-cbc', password: 'segretissimo' }
			]).parse(data),
			aes_sep: new Poliparser([
				{ m: 'crypto_crypt', mode: 'aes-256-cbc', password: 'segretissimo', separator: '%%' },
				{ m: 'crypto_decrypt', mode: 'aes-256-cbc', password: 'segretissimo', separator: '%%' }
			]).parse(data),
			aes_sep_salt: new Poliparser([
				{ m: 'crypto_crypt', mode: 'aes-256-cbc', password: 'segretissimo', salt: '1qazxsw23edcvfr4', separator: '%%' },
				{ m: 'crypto_decrypt', mode: 'aes-256-cbc', password: 'segretissimo', separator: '%%' }
			]).parse(data)
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
			m: 'crypto_crypt',
			mode: 'impossible_mode',
			password: 'cogito'
		});

		let passed = false;
		try {
			m.parse(data);
		} catch (e) {
			if (e.message == 'Invalid mode')
				passed = true;
		}
		expect(passed).to.equal(true);

		m.setParser({
			m: 'crypto_decrypt',
			mode: 'impossible_mode',
			password: 'cogito'
		});

		passed = false;
		try {
			m.parse(data);
		} catch (e) {
			if (e.message == 'Invalid mode')
				passed = true;
		}
		expect(passed).to.equal(true);
	});
	it('csv', function () {
		let base_obj = [{
			val1: "valore 1",
			str: "valore 2",
			num: 345
		}, {
			val1: "valore 3",
			str: "valore 4",
			num: 678
		}];
		let base_obj2 = [{
			val1: "valore 1",
			str: "valore 2",
			num: '345'
		}, {
			val1: "valore 3",
			str: "valore 4",
			num: '678'
		}];
		let data = 'val1,str,num\n"valore 1","valore 2",345\n"valore 3","valore 4",678';
		let data2 = 'val1;str;num\n"valore 1";"valore 2";345\n"valore 3";"valore 4";678';
		let data3 = 'val1,str,num\nvalore 1,valore 2,345\nvalore 3,valore 4,678';
		let data4 = 'val1,str,num\n"valore \\1","valore \\2",345\n"valore \\3","valore \\4",678';
		let jdata = JSON.stringify(base_obj);
		let p_jdata = JSON.stringify(base_obj, null, 4);

		expect(JSON.stringify(new Poliparser({
			m: 'csv_parse',
			stringSeparator: '"'
		}).parse(data))).to.equal(jdata);

		expect(JSON.stringify(new Poliparser({
			m: 'csv_parse',
			stringSeparator: '"',
			parseNumber: false
		}).parse(data))).to.equal(JSON.stringify(base_obj2));

		expect(JSON.stringify(new Poliparser({
			m: 'csv_parse',
		}).parse(data))).to.equal('[{"val1":"\\"valore 1\\"","str":"\\"valore 2\\"","num":"345"},{"val1\":"\\"valore 3\\"","str":"\\"valore 4\\"","num":"678"}]');

		expect(JSON.stringify(new Poliparser({
			m: 'csv_parse',
		}).parse(data))).to.equal('[{"val1":"\\"valore 1\\"","str":"\\"valore 2\\"","num":"345"},{"val1\":"\\"valore 3\\"","str":"\\"valore 4\\"","num":"678"}]');

		expect(new Poliparser({
			m: 'csv_stringify',
			stringSeparator: '"'
		}).parse(base_obj)).to.equal(data);

		let dd = new Poliparser({
			m: 'csv_stringify',
			//stringSeparator: '"',
			separator: ','
		}).parse(base_obj2);
		expect(dd).to.equal(data3);

		expect(new Poliparser({
			m: 'csv_stringify',
		}).parse('')).to.equal('');

		expect(JSON.stringify(new Poliparser({
			m: 'csv_parse',
			separator: ','
		}).parse(''))).to.equal('[]');

		expect(JSON.stringify(new Poliparser({
			m: 'csv_parse',
			separator: ';',
			stringSeparator: '"'
		}).parse(data2))).to.equal('[{"val1":"valore 1","str":"valore 2","num":345},{"val1":"valore 3","str":"valore 4","num":678}]');

		expect(JSON.stringify(new Poliparser({
			m: 'csv_parse',
			stringSeparator: '"'
		}).parse(data4))).to.equal('[{"val1":"valore \\\\1","str":"valore \\\\2","num":345},{"val1":"valore \\\\3","str":"valore \\\\4","num":678}]');

		expect(new Poliparser({
			m: 'csv_toJson',
			stringSeparator: '"'
		}).parse(data)).to.equal(jdata);

		expect(new Poliparser({
			m: 'csv_toJson',
			pretty: true,
			stringSeparator: '"'
		}).parse(data)).to.equal(p_jdata);

		expect(new Poliparser({
			m: 'csv_toJson',
			pretty: true,
			space: 3,
			stringSeparator: '"'
		}).parse(data)).to.equal(JSON.stringify(base_obj, null, 3));

		expect(new Poliparser({
			m: 'csv_fromJson',
			stringSeparator: '"'
		}).parse(p_jdata)).to.equal(data);

	});
	it('undefined block', function () {
		let data = 'hi';
		let m = new Poliparser(42);
		let output = m.parse(data);
		expect(output).to.equal('hi');
	});
	it('add module', function () {
		let data = 10;
		let m = new Poliparser();

		m.setModule('testing_parser', (data, block) => {
			return data * block.value;
		})

		m.requireModule('my_mul', __dirname + '/myModule.js');

		m.setParser({
			m: 'testing_parser',
			value: 2
		});
		expect(m.parse(data)).to.equal(20);

		m.setParser({
			m: 'testing_parser',
			value: 4
		});
		expect(m.parse(data)).to.equal(40);

		m.setParser({
			m: 'my_mul',
			value: 3
		});
		expect(m.parse(data)).to.equal(30);

	});
	it('add library', function () {
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
			m: 'testingLib_mod1',
			value: 3
		});
		expect(m.parse(data)).to.equal(30);

		m.setParser({
			m: 'testingLib_mod2',
			value: 4
		});
		expect(m.parse(data)).to.equal("10XX");

		m.setParser({
			m: 'my_lib_mod1'
		});
		expect(m.parse(data)).to.equal("MyLibrary_mod1 hello 10");
	});
	it('parseFile', function () {


		let link = new Poliparser({
			m: 'dom',
			value: 'a.hiper',
			attr: 'href'
		});

		expect(JSON.stringify(link.parseFile(__dirname + '/data.html'))).to.equal(JSON.stringify(['link1.html', 'link2.html']));

	});
	it('parseUrl', function (done) {

		let link = new Poliparser({
			m: 'dom',
			value: '.prendi a',
			attr: 'href'
		});

		link.parseUrl('google.com').then(data => {
			expect(JSON.stringify(data)).to.equal('[]');
			link.parseUrl('https://raw.githubusercontent.com/colgatto/Poliparser/master/Examples/data.html').then(data => {
				expect(JSON.stringify(data)).to.equal(JSON.stringify(['link3.html']));
				link.parseUrl('INVALID URL!').then(() => { }).catch((e) => {
					expect(e).to.equal('invalid url!');
					done();
				});
			});
		});

	});

});
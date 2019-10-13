'use strict';

const expect = require('chai').expect;
const Poliparser = require('..');

describe('test blocks type', function() {
    it('base64', function() {
		
		let data = 'Hello my name is Poliparser';
		let data64 = 'SGVsbG8gbXkgbmFtZSBpcyBQb2xpcGFyc2Vy';
		let p = new Poliparser({
			val: {
				f: 'crypto_base64',
				value: 'encode'
			}
		});
		let p64 = new Poliparser({
			val: {
				f: 'crypto_base64',
				value: 'decode'
			}
		});

		let output = p.run(data);
		let output64 = p64.run(data64);

		expect(output.val).to.equal(data64);
		expect(output64.val).to.equal(data);
    });
    it('between', function() {
		let data = 'Hello my name is <p>Poliparser</p>';
		let m = new Poliparser({
			name: {
				f: 'between',
				from: '<p>',
				to: '</p>'
			}
		});
		let output = m.run(data);
		expect(output.name).to.equal('Poliparser');
    });
	it('custom', function() {
		let data = [
			{ val: 'data1' },
			{ val: 'data2' },
			{ val: 'data3' }
		];
		let m = new Poliparser({
			val: {
				f: 'custom',
				value: (d) => d.map( x => x.val)
			}
		});
		let output = m.run(data);
		expect(JSON.stringify(output.val)).to.equal(JSON.stringify(['data1','data2','data3']));
	});
	it('dom', function() {
		let data = `<html><head><title>prova</title></head><body>
			<a href="link1.html" class="hiper">hello</a> world<br>
			<a href="link2.html" class="hiper" data-label="byebye">bye</a> world<br>
			<a href="link3.html" class="not-hiper" data-label="adios">ciao3</a> world<br>
		</body></html>`;
		let arr_data = ['<a>dato1</a>','<a>dato<br>2</a>','<a>dato3</a>'];
		let m = new Poliparser({
			link: {
				f: 'dom',
				value: 'a.hiper',
				attr: 'href'
			},
			link_and_label: {
				f: 'dom',
				value: 'a',
				attr: ['href' , 'data-label']
			}
		});
		let m_arr = new Poliparser({
			val: [ {
				f: 'dom',
				value: 'a'
			},{
				f:'custom',
				value: (data) => data.map( x => x[0].text )
			}]
		})
		let output = m.run(data);
		let arr_output = m_arr.run(arr_data);
		expect(JSON.stringify(output.link_and_label)).to.equal(JSON.stringify([
			{ href: 'link1.html' },
			{ href: 'link2.html', 'data-label': 'byebye' },
			{ href: 'link3.html', 'data-label': 'adios' }
		]));
		expect(JSON.stringify(arr_output.val)).to.equal(JSON.stringify(['dato1', 'dato2', 'dato3']));
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
			str: {
				f: 'json',
				value: 'stringify'
			}
		});
		let m2 = new Poliparser({
			obj: {
				f: 'json',
				value: 'parse'
			}
		});
		let m3 = new Poliparser({
			str: {
				f: 'json',
				value: 'stringify',
				pretty: true,
				space: 2
			}
		});
		let m4 = new Poliparser({
			str: {
				f: 'json',
				value: 'stringify',
				pretty: true
			}
		});
		let val1 = m1.run(obj_json);
		let val2 = m2.run(str_json);
		let val3 = m3.run(obj_json);
		let val4 = m4.run(obj_json);
		expect(JSON.stringify(obj_json)).to.equal(val1.str);
		expect(JSON.stringify(val2.obj)).to.equal(str_json);
		expect(JSON.stringify(obj_json, null, 4)).to.equal(val4.str);
	});
	it('key', function() {
		let data = {name: 'foo', phone: '011-111222333', surname: 'bar'};
		let p = new Poliparser({
			val: {
				f: 'key',
				value: 'phone'
			}
		});
		let pp = new Poliparser({
			val: {
				f: 'key',
				value: ['name', 'surname']
			}
		});
		let output = p.run(data);
		let output2 = pp.run(data);
		expect(output.val).to.equal(data.phone);
		expect(JSON.stringify(output2.val)).to.equal(JSON.stringify({name: 'foo', surname: 'bar'}));
	});
	it('regex', function() {
		let data = `Contact Admin 011-11122111 Headquarter Industry Inc. 011-22211222`;
		let arr_data = [
			'Admin 011-11122111',
			'Headquarter 011-22211222'
		];
		let empty = '';
		let m = new Poliparser({
			name: {
				f: 'regex',
				value: /Headquarter ([a-zA-Z0-9 ]+\.) .*/,
				only: 'matches'
			},
			phone: {
				f: 'regex',
				value: /[0-9]{3}-[0-9]{8}/g,
				only: 'full'
			},
			nullD: {
				f: 'regex',
				value: /data unwrited/
			},
			glob: {
				f: 'regex',
				value: /(\d)$/g,
				only: 'index'
			}
		});
		let arr_m = new Poliparser({
			rec: {
				f: 'regex',
				value: /[a-zA-Z]+ ([0-9-]+)$/,
				only: 'matches',
				group: 0
			},
			rec_g: {
				f: 'regex',
				value: /[a-zA-Z]+ ([0-9-]+)$/g,
				only: 'matches',
				group: 0
			}
		});
		let emp = new Poliparser({
			val_g: {
				f: 'regex',
				value: /(hi)?/g
			},
			val: {
				f: 'regex',
				value: /(hi)?/
			}
		})
		let output = m.run(data);
		let empy_output = emp.run(empty);
		let arr_output = arr_m.run(arr_data);
		expect(JSON.stringify(output.name)).to.equal(JSON.stringify([ 'Industry Inc.' ]));
		expect(JSON.stringify(output.phone)).to.equal(JSON.stringify([ '011-11122111', '011-22211222' ]));
		expect(output.nullD).to.equal(null);
		
		expect(JSON.stringify(empy_output.val_g)).to.equal(JSON.stringify([{
			full: "",
			matches: [ null ],
			index: 0 
		}]));
		expect(JSON.stringify(empy_output.val)).to.equal(JSON.stringify({
			full: "",
			matches: [ null ],
			index: 0 
		}));

		expect(JSON.stringify(output.glob)).to.equal(JSON.stringify([64]));
		
		expect(JSON.stringify(arr_output.rec)).to.equal(JSON.stringify([ '011-11122111', '011-22211222' ]));
		expect(JSON.stringify(arr_output.rec_g)).to.equal(JSON.stringify([ ['011-11122111'], ['011-22211222'] ]));
	});
	it('reverse', function() {
		let Poliparser = require('..');
		let data = 'questa è una stringa da reversare';
		let data2 = [ 'questa è', 'una stringa da reversare' ];
		let m = new Poliparser({
			val: {
				f: 'reverse'
			}
		});
		let output = m.run(data);
		let output2 = m.run(data2);
		expect(output.val).to.equal('erasrever ad agnirts anu è atseuq');
		expect(JSON.stringify(output2.val)).to.equal(JSON.stringify([ 'una stringa da reversare', 'questa è' ] ));
	});
	it('trim', function() {
		let data = '    ciao   ';
		let arr_data = ['    ciao   ','ciao   ','    ciao'];
		let m = new Poliparser({
			base: {
				f: 'trim'
			},
			start: {
				f: 'trim',
				end: false
			},
			end: {
				f: 'trim',
				start: false
			},
			custom: {
				f: 'trim',
				value: [' ', '\t', 'c', 'o']
			},
			start_c: {
				f: 'trim',
				value: [' ', '\t', 'c', 'o'],
				end: false
			},
			end_c: {
				f: 'trim',
				value: [' ', '\t', 'c', 'o'],
				start: false
			},
		});
		let m_arr = new Poliparser({
			rec:{
				f: 'trim'
			}
		})
		let output = m.run(data);
		let arr_output = m_arr.run(arr_data);
		expect(output.base).to.equal('ciao');
		expect(output.start).to.equal('ciao   ');
		expect(output.start_c).to.equal('iao   ');
		expect(output.end).to.equal('    ciao');
		expect(output.end_c).to.equal('    cia');
		expect(output.custom).to.equal('ia');
		expect(JSON.stringify(arr_output.rec)).to.equal(JSON.stringify(['ciao','ciao','ciao']));
	});
	it('log', function() {
		let data = 'hi';
		let m = new Poliparser({
			val: {
				f: 'log'
			}
		});
		let output = m.run(data);
		expect(output.val).to.equal('hi');
	});
	it('array_uniq', function() {
		let data = [1,1,2,3,4,4,4,5,6,7,8,9,9,9,0,0];
		let m = new Poliparser({
			val: {
				f: 'array_uniq'
			}
		});
		let output = m.run(data);
		expect(JSON.stringify(output.val)).to.equal(JSON.stringify([1,2,3,4,5,6,7,8,9,0]));
	});
	it('array_mix', function() {
		let data = [1,0,1,2,9,8,7,4,5,6,3,3,3,9,9,0];
		let m = new Poliparser({
			min: { f: 'array_min' },
			max: { f: 'array_max' },
			indexMax: { f: 'array_indexMax' },
			indexMin: { f: 'array_indexMin' },
			count: { f: 'array_count' },
			sum: { f: 'array_sum' },
			map: {
				f: 'array_map',
				value: x => 'MM' + x
			},
			filter: {
				f: 'array_filter',
				value: x => x > 7
			},
			reduce: {
				f: 'array_reduce',
				start: 10,
				value: (x, tot) => x + tot
			},
			join: {
				f: 'array_join',
				value: '-'
			},
			empty_join: {
				f: 'array_join'
			},
			indexOf: {
				f: 'array_indexOf',
				value: 9
			},
			lastIndexOf: {
				f: 'array_lastIndexOf',
				value: 9
			},
			indexOf_s: {
				f: 'array_indexOf',
				value: 9,
				position: 5
			},
			lastIndexOf_s: {
				f: 'array_lastIndexOf',
				value: 9,
				position: 10
			},
			pop: {
				f: 'array_pop'
			},
			shift: {
				f: 'array_shift'
			},
			slice: {
				f: 'array_slice'
			},
			slice_def: {
				f: 'array_slice',
				start: 2,
				end: 5
			}
		});

		let output = m.run(data);
		let null_output = m.run([]);
		expect(JSON.stringify(null_output)).to.equal(JSON.stringify({
			min: null, max: null, indexMax: null, indexMin: null, count: 0, sum: 0, map: [], filter: [], reduce: 10, join: '', empty_join: '',
			indexOf: -1, lastIndexOf: -1, indexOf_s: -1, lastIndexOf_s: -1, pop: [], shift: [], slice: [], slice_def: []
		}));
		expect(JSON.stringify(output)).to.equal(JSON.stringify({
			min: 0, max: 9, indexMax: 4, indexMin: 1, count: 16, sum: 70,
			map: data.map( x => 'MM' + x), filter: data.filter(x => x > 7),  reduce: data.reduce( (x,t) => x + t, 10),
			join: data.join('-'), empty_join: data.join(''), indexOf: 4, lastIndexOf: 14, indexOf_s: 13, lastIndexOf_s: 4,
			pop: [1,0,1,2,9,8,7,4,5,6,3,3,3,9,9], shift: [0,1,2,9,8,7,4,5,6,3,3,3,9,9,0],
			slice: data, slice_def: [1,2,9]
		}));
	});
	it('array_min_max', function() {
		let data = [ 1, 1, [ 2, 2, [ 3, 3, [ 4 ] ], 2, 2, [ 3, 3 ] ], 1, 1, 1, [ 2, 2 ], 1 ];
		let data_1 = [ 1, 1, 2, 2, [ 3, 3, [ 4 ] ], 2, 2, [ 3, 3 ], 1, 1, 1, 2, 2, 1 ];
		let data_2 = [ 1, 1, 2, 2, 3, 3, [ 4 ], 2, 2, 3, 3, 1, 1, 1, 2, 2, 1 ];
		let data_i1 = [ 1, 1, [ 2, 2, [ 3, 3, 4 ], 2, 2, 3, 3 ], 1, 1, 1, 2, 2, 1 ];
		let data_i2 = [ 1, 1, [ 2, 2, 3, 3, 4, 2, 2, 3, 3 ], 1, 1, 1, 2, 2, 1 ];
		let data_clean = [ 1, 1, 2, 2, 3, 3, 4, 2, 2, 3, 3, 1, 1, 1, 2, 2, 1 ];

		let p = new Poliparser({
			base: {
				f: 'array_flat'
			},
			deep_1: {
				f: 'array_flat',
				deep: 1
			},
			deep_2: {
				f: 'array_flat',
				deep: 2
			},
			inverseDeep_1: {
				f: 'array_flat',
				deep: -1
			},
			inverseDeep_2: {
				f: 'array_flat',
				deep: -2
			}
		});

		let output = p.run(data);
		let output_data_empy = p.run([]);
		expect(JSON.stringify(output.base)).to.equal(JSON.stringify(data_clean));
		expect(JSON.stringify(output.deep_1)).to.equal(JSON.stringify(data_1));
		expect(JSON.stringify(output.deep_2)).to.equal(JSON.stringify(data_2));
		expect(JSON.stringify(output.inverseDeep_1)).to.equal(JSON.stringify(data_i1));
		expect(JSON.stringify(output.inverseDeep_2)).to.equal(JSON.stringify(data_i2));
		expect(JSON.stringify(output_data_empy.inverseDeep_2)).to.equal(JSON.stringify([]));
	});
	it('str_mix', function() {
		let data = "1234567890";
		let m = new Poliparser({
			split: { f: 'str_split', value: '6' }
		});
		let output = m.run(data);
		expect(JSON.stringify(output.split)).to.equal(JSON.stringify(["12345","7890"]));
	});
	it('undefined block', function() {
		let data = 'hi';
		let m = new Poliparser({
			val: 42
		});
		let output = m.run(data);
		expect(output.val).to.equal('hi');
	});
	it('add module', function() {
		let data = 10;
		let m = new Poliparser({
			val2: {
				f: 'testing_parser',
				value:  2
			},
			val4: {
				f: 'testing_parser',
				value: 4 
			}
		});
		m.setModule('testing_parser', (data, block) => {
			return data * block.value;
		})
		let output = m.run(data);
		expect(output.val2).to.equal(20);
		expect(output.val4).to.equal(40);
	});
	it('add library', function() {
		let data = 10;
		let m = new Poliparser({
			val1: {
				f: 'testingLib_mod1',
				value:  3
			},
			val2: {
				f: 'testingLib_mod2',
				value: 4 
			}
		});
		m.setLibrary('testingLib', {
			mod1: (data, block) => {
			return data * block.value;
			},
			mod2: (data, block) => {
				return data + 'XX';
			}
		});
		let output = m.run(data);
		expect(output.val1).to.equal(30);
		expect(output.val2).to.equal("10XX");
	});
});
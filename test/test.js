'use strict';

const expect = require('chai').expect;
const Poliparser = require('..');

describe('test blocks type', function() {
    it('base64', function() {
		
		let data = 'Hello my name is Poliparser';
		let data64 = 'SGVsbG8gbXkgbmFtZSBpcyBQb2xpcGFyc2Vy';
		let p = new Poliparser({
			val: {
				f: 'base64',
				value: 'encode'
			}
		});
		let p64 = new Poliparser({
			val: {
				f: 'base64',
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
		let arr_data = ['<a>dato1</a>','<a>dato2</a>','<a>dato3</a>'];
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
				value: (data) => data.map( x => x[0].innerHTML )
			}]
		})
		let output = m.run(data);
		let arr_output = m_arr.run(arr_data);
		expect(JSON.stringify(output.link_and_label)).to.equal(JSON.stringify([
			{ href: 'link1.html', 'data-label': null },
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
	it('uniq', function() {
		let data = [1,1,2,3,4,4,4,5,6,7,8,9,9,9,0,0];
		let m = new Poliparser({
			val: {
				f: 'uniq'
			}
		});
		let output = m.run(data);
		expect(JSON.stringify(output.val)).to.equal(JSON.stringify([1,2,3,4,5,6,7,8,9,0]));
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
		m.setModule('testing_parser',(p, data) => {
			return data * p.value;
		})
		let output = m.run(data);
		expect(output.val2).to.equal(20);
		expect(output.val4).to.equal(40);
	});
});
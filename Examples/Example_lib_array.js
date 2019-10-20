let Poliparser = require('..');

let data = [1,0,1,2,9,8,7,4,5,6,3,3,3,9,9,0];

let p = new Poliparser({

	max: { f: 'array_max' },
	indexMax: { f: 'array_indexMax' },
	min: { f: 'array_min' },
	indexMin: { f: 'array_indexMin' },

	count: { f: 'array_count' },
	sum: { f: 'array_sum' },
	uniq: { f: 'array_uniq' },
	pop: { f: 'array_pop' },
	shift: { f: 'array_shift' },

	map: {
		f: 'array_map',
		value: (v) => {
			return 'Mapped ' +  v;
		}
	},
	filter: {
		f: 'array_filter',
		value: (v) => {
			return v > 7;
		}
	},
	reduce: {
		f: 'array_reduce',
		value: (v, tot) => {
			return v + tot;
		},
		start: 0,
	},
	join: {
		f: 'array_join',
		value: '-'
	},

	indexOf: {
		f: 'array_indexOf',
		value: 9
	},
	lastIndexOf: {
		f: 'array_lastIndexOf',
		value: 9
	}
});

let output = p.run(data);

console.log(output);
let Poliparser = require('..');

let data = [1,0,1,2,9,8,7,4,5,6,3,3,3,9,9,0];

let p = {

	max: new Poliparser({ f: 'array_max' }).run(data),
	indexMax: new Poliparser({ f: 'array_indexMax' }).run(data),
	min: new Poliparser({ f: 'array_min' }).run(data),
	indexMin: new Poliparser({ f: 'array_indexMin' }).run(data),

	count: new Poliparser({ f: 'array_count' }).run(data),
	sum: new Poliparser({ f: 'array_sum' }).run(data),
	uniq: new Poliparser({ f: 'array_uniq' }).run(data),
	pop: new Poliparser({ f: 'array_pop' }).run(data),
	shift: new Poliparser({ f: 'array_shift' }).run(data),

	map: new Poliparser({
		f: 'array_map',
		value: (v) => {
			return 'Mapped ' +  v;
		}
	}).run(data),
	
	filter: new Poliparser({
		f: 'array_filter',
		value: (v) => {
			return v > 7;
		}
	}).run(data),

	reduce: new Poliparser({
		f: 'array_reduce',
		value: (v, tot) => {
			return v + tot;
		},
		start: 0,
	}).run(data),

	join: new Poliparser({
		f: 'array_join',
		value: '-'
	}).run(data),

	indexOf: new Poliparser({
		f: 'array_indexOf',
		value: 9
	}).run(data),

	lastIndexOf: new Poliparser({
		f: 'array_lastIndexOf',
		value: 9
	}).run(data)
};

console.log(p);
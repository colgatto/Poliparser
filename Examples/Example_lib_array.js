let Poliparser = require('..');

let data = [1,0,1,2,9,8,7,4,5,6,3,3,3,9,9,0];

let p = {

	max: new Poliparser({ m: 'array_max' }).parse(data),
	indexMax: new Poliparser({ m: 'array_indexMax' }).parse(data),
	min: new Poliparser({ m: 'array_min' }).parse(data),
	indexMin: new Poliparser({ m: 'array_indexMin' }).parse(data),

	count: new Poliparser({ m: 'array_count' }).parse(data),
	sum: new Poliparser({ m: 'array_sum' }).parse(data),
	uniq: new Poliparser({ m: 'array_uniq' }).parse(data),
	pop: new Poliparser({ m: 'array_pop' }).parse(data),
	shift: new Poliparser({ m: 'array_shift' }).parse(data),

	map: new Poliparser({
		m: 'array_map',
		value: (v) => {
			return 'Mapped ' +  v;
		}
	}).parse(data),
	
	filter: new Poliparser({
		m: 'array_filter',
		value: (v) => {
			return v > 7;
		}
	}).parse(data),

	reduce: new Poliparser({
		m: 'array_reduce',
		value: (v, tot) => {
			return v + tot;
		},
		start: 0,
	}).parse(data),

	join: new Poliparser({
		m: 'array_join',
		value: '-'
	}).parse(data),

	indexOf: new Poliparser({
		m: 'array_indexOf',
		value: 9
	}).parse(data),

	lastIndexOf: new Poliparser({
		m: 'array_lastIndexOf',
		value: 9
	}).parse(data)
};

console.log(p);
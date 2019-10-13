const isIterable = (val) => {
	return val != null && typeof val[Symbol.iterator] == "function";
};

const rFlat = (val, deep) => {
	if (deep == 0) {
		return val;
	} else {
		let out = [];
		for (let i = 0, l = val.length; i < l; i++) {
			let el = val[i];
			if (el.constructor == Array) {
				out.push(...rFlat(el, deep - 1));
			} else {
				out.push(el);
			}
		}
		return out;
	}
};

const invFlat = (val, deep) => {
	const IterableMaxDepth = (val) => {
		if (!isIterable(val)) {
			return 0;
		}
		let r = 0;
		for (let v of val) {
			r = Math.max(r, IterableMaxDepth(v) + 1);
		}
		return r;
	}
	const extract = (val) => {
		if (IterableMaxDepth(val) <= 1) {
			return val;
		}
		let r = [];
		for (let v of val) {
			let d = IterableMaxDepth(v);
			if (d == 0) {
				r.push(v);
			}
			else if (d == 1) {
				r.push(...v);
			}
			else if (d == 2) {
				r.push(rFlat(v, 1));
			}
			else {
				r.push(extract(v));
			}
		}
		return r;
	};
	for (let i = 0; i < deep; i++) {
		val = extract(val);
	}
	return val;
};

module.exports = {
	/** @docgen
	@name min
	@lib array
	@desc prende il minimo
	@input Array
	@output Number
	@param attr [`String` / `Array`] <`false`> get attribute value
	**/
	min: (data, block) => {
		let l = data.length;
		if (l == 0)
			return null;
		let out = data[0];
		for (let i = 1; i < l; i++) {
			if (data[i] < out)
				out = data[i];
		}
		return out;
	},
	max: (data, block) => {
		let l = data.length;
		if (l == 0)
			return null;
		let out = data[0];
		for (let i = 1; i < l; i++) {
			if (data[i] > out)
				out = data[i];
		}
		return out;
	},
	indexMin: (data, block) => {
		let l = data.length;
		if (l == 0)
			return null;
		let out = 0;
		for (let i = 1; i < l; i++) {
			if (data[i] < data[out])
				out = i;
		}
		return out;
	},
	indexMax: (data, block) => {
		let l = data.length;
		if (l == 0)
			return null;
		let out = 0;
		for (let i = 1; i < l; i++) {
			if (data[i] > data[out])
				out = i;
		}
		return out;
	},

	count: (data, block) => {
		return data.length;
	},
	sum: (data, block) => {
		let out = 0;
		for (let i = 0, l = data.length; i < l; i++) {
			out += data[i];
		}
		return out;
	},

	uniq: (data, block) => {
		return [...new Set(data)];
	},
	flat: (data, block) => {
		let deep = typeof block.deep == "undefined" ? Infinity : block.deep;
		if (deep >= 0) {
			return rFlat(data, deep);
		}
		else {
			return invFlat(data, -deep);
		}
	},
	map: (data, block) => {
		let out = [];
		for (let i = 0, l = data.length; i < l; i++) {
			out.push(block.value(data[i]));
		}
		return out;
	},
	filter: (data, block) => {
		let out = [];
		for (let i = 0, l = data.length; i < l; i++) {
			if(block.value(data[i]))
				out.push(data[i]);
		}
		return out;
	},
	reduce: (data, block) => {
		let tot = block.start;
		for (let i = 0, l = data.length; i < l; i++) {
			tot = block.value(data[i], tot);
		}
		return tot;
	},
	join: (data, block) => {
		let glue = typeof block.value == 'undefined' ? '' : block.value;
		return data.join(glue);
	},

	indexOf: (data, block) => {
		return typeof block.position == 'undefined' ? data.indexOf(block.value) : data.indexOf(block.value, block.position);
	},
	lastIndexOf: (data, block) => {
		return typeof block.position == 'undefined' ? data.lastIndexOf(block.value) : data.lastIndexOf(block.value, block.position);
	},
	
	slice: (data, block) => {
		let opt = {
			start: typeof block.start == 'undefined' ? 0 : block.start,
			end: typeof block.end == 'undefined' ? data.length : block.end
		};
		return data.slice(opt.start, opt.end);
	},

	pop: (data, block) => {
		let out = Array.from(data);
		out.pop();
		return out;
	},
	shift: (data, block) => {
		let out =  Array.from(data);
		out.shift();
		return out;
	}
};
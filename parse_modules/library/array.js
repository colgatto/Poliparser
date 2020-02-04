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
	@desc return the lowest value of the array
	@input `Array`
	@output `Number`
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

	/** @docgen
	@name max
	@lib array
	@desc return the highest value of the array
	@input `Array`
	@output `Number`
	**/
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

	/** @docgen
	@name indexMin
	@lib array
	@desc return the index of lowest value of the array
	@input `Array`
	@output `Integer`
	**/
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

	/** @docgen
	@name indexMax
	@lib array
	@desc return the index of highest value of the array
	@input `Array`
	@output `Integer`
	**/
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
	
	/** @docgen
	@name count
	@lib array
	@desc return the number of values of the array
	@input `Array`
	@output `Number`
	**/
	count: (data, block) => {
		return data.length;
	},

	/** @docgen
	@name sum
	@lib array
	@desc returns the sum of values of the array
	@input `Array`
	@output `Number`
	**/
	sum: (data, block) => {
		let out = 0;
		for (let i = 0, l = data.length; i < l; i++) {
			out += data[i];
		}
		return out;
	},

	/** @docgen
	@name uniq
	@lib array
	@desc returns a new array without duplicate values
	@input `Array`
	@output `Array`
	**/
	uniq: (data, block) => {
		return [...new Set(data)];
	},

	/** @docgen
	@name flat
	@lib array
	@desc returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
	@input `Array`
	@output `Array`
	@param deep [`Integer`] <`Infinity`> The depth level specifying how deep a nested array structure should be flattened. If negative start from the deepest array.
	**/
	flat: (data, block) => {
		let deep = typeof block.deep == "undefined" ? Infinity : block.deep;
		if (deep >= 0) {
			return rFlat(data, deep);
		}
		else {
			return invFlat(data, -deep);
		}
	},

	/** @docgen
	@name map
	@lib array
	@desc returns a new array with the results of calling a provided function on every element in the calling array.
	@input `Array`
	@output `Array`
	@param value [`Function`] {R} Function that produces an element of the new Array. Taking three arguments: `( currentValue, <index>, <array> )`
	**/
	map: (data, block) => {
		let out = [];
		for (let i = 0, l = data.length; i < l; i++) {
			out.push(block.value(data[i], i, data));
		}
		return out;
	},

	/** @docgen
	@name filter
	@lib array
	@desc returns a new array with all elements that pass the test implemented by the provided function.
	@input `Array`
	@output `Array`
	@param value [`Function`] {R} Function is a predicate, to test each element of the array. Return true to keep the element, false otherwise.  Taking three arguments: `( currentValue, <index>, <array> )`
	**/
	filter: (data, block) => {
		let out = [];
		for (let i = 0, l = data.length; i < l; i++) {
			if(block.value(data[i]))
				out.push(data[i]);
		}
		return out;
	},

	/** @docgen
	@name reduce
	@lib array
	@desc executes a reducer function (that you provide) on each element of the array, resulting in a single output value.
	@input `Array`
	@output `Any`
	@param value [`Function`] {R} A function to execute on each element in the array (except for the first, if no start is supplied), taking four arguments: `( accumulator, currentValue, <index>, <array> )`
	@param start [`Any`] <first value of array> first value of accumulator
	**/
	reduce: (data, block) => {
		let initialIndex = 0;
		let tot;
		if(typeof block.start == "undefined"){
			if(data.length == 0) return null;
			else{
				tot = data[0];
				initialIndex = 1;
			}
		}else{
			tot = block.start;
		}
		for (let i = initialIndex, l = data.length; i < l; i++) {
			tot = block.value(tot, data[i], i, data);
		}
		return tot;
	},

	/** @docgen
	@name join
	@lib array
	@desc returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
	@input `Array`
	@output `String`
	@param value [`String`] <`','`> Specifies a string to separate each pair of adjacent elements of the array. 
	**/
	join: (data, block) => {
		let glue = typeof block.value == 'undefined' ? '' : block.value;
		return data.join(glue);
	},

	/** @docgen
	@name indexOf
	@lib array
	@desc returns the first index at which a given element can be found in the array, or -1 if it is not present.
	@input `Array`
	@output `Integer`
	@param value [`Any`] {R} Element to locate in the array.
	@param position [`Integer`] <0> The index to start the search at. If negative, it is taken as the offset from the end of the array.
	**/
	indexOf: (data, block) => {
		return typeof block.position == 'undefined' ? data.indexOf(block.value) : data.indexOf(block.value, block.position);
	},

	/** @docgen
	@name lastIndexOf
	@lib array
	@desc returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at position value.
	@input `Array`
	@output `Integer`
	@param value [`Any`] {R} Element to locate in the array.
	@param position [`Integer`] <arr.length - 1> The index at which to start searching backwards. If negative, it is taken as the offset from the end of the array. 
	**/
	lastIndexOf: (data, block) => {
		return typeof block.position == 'undefined' ? data.lastIndexOf(block.value) : data.lastIndexOf(block.value, block.position);
	},

	/** @docgen
	@name slice
	@lib array
	@desc returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. 
	@input `Array`
	@output `Array`
	@param start [`Integer`] <0> Zero-based index at which to begin extraction. If negative, indicating an offset from the end of the sequence. 
	@param end [`Integer`] <arr.length> Zero-based index before which to end extraction. slice extracts up to but not including end. A negative index can be used, indicating an offset from the end of the sequence.
	**/
	slice: (data, block) => {
		let opt = {
			start: typeof block.start == 'undefined' ? 0 : block.start,
			end: typeof block.end == 'undefined' ? data.length : block.end
		};
		return data.slice(opt.start, opt.end);
	},

	/** @docgen
	@name pop
	@lib array
	@desc returns a new array without last element
	@input `Array`
	@output `Array`
	**/
	pop: (data, block) => {
		let out = Array.from(data);
		out.pop();
		return out;
	},

	/** @docgen
	@name shift
	@lib array
	@desc returns a new array without first element
	@input `Array`
	@output `Array`
	**/
	shift: (data, block) => {
		let out =  Array.from(data);
		out.shift();
		return out;
	},

	/** @docgen
	@name sort
	@lib array
	@desc  sorts the elements of an array in place and returns the sorted array. The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.
	@input `Array`
	@output `Array`
	@param value [`Function`] <javascript sort> a function that defines the sort order.
	**/
	sort: (data, block) => {
		let cData = Array.from(data);
		if(typeof block.value != "undefined"){
			cData.sort(block.value);
		}else{
			cData.sort();
		}
		return cData;
	},
	/** @docgen
	@name reverse
	@lib array
	@desc return a new array where value are reversed. The first array element becomes the last, and the last array element becomes the first.
	@input `Array`
	@output `Array`
	**/
	reverse: (data, block) => {
		let out = [];
		for (let i = data.length - 1; i >= 0; i--) {
			out.push(data[i]);
		}
		return out;
	}

};
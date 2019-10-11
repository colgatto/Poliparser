# **Poliparser**
[![Build Status](https://travis-ci.org/colgatto/Poliparser.svg?branch=master)](https://travis-ci.org/colgatto/Poliparser) [![Coverage Status](https://coveralls.io/repos/github/colgatto/Poliparser/badge.svg?branch=master)](https://coveralls.io/github/colgatto/Poliparser?branch=master)

This module allows you to extract data from strings in a simple and fast way.

You can use the default parser or easily add your custom one.

## **Install**

```
$ npm install poliparser 
```

## **Usage**

Import Poliparser module

```js
let Poliparser = require('poliparser');
```

Make your output Object template

```js
let template = {
	title:{
		f: 'between',
		from: '<title>',
		to: '</title>'
	},
	link_ext: [{
		f: 'dom',
		value: '.container a',
		attr: 'href'
	},{
		f: 'regex',
		value: /.+\.([a-zA-Z0-9]+)/
	}]
};
```

Note that `template` is an `Object` with many parse keys.

The data is parsed independently for each template key, **with the parse block's executed sequentially in the order of its array**.

The output of each block will become the input for the next one. In the case of `link_ext`, it will execute the `dom` block on the main input, the output will be passed to the `regex` block, and then it will be assigned to the `link_ext` key of the returned `Object`.

Instantiate a Poliparser by passing it a template

```js
let p = new Poliparser(template);
```

Run

```js
let data = `<title>hello</title>
	<div class=".container">
		<a href="link1.html">link1</a>
		<a href="link2.html">link2</a>
		<a href="link3.html">link3</a>
	</div>`;

let output = p.run(data);

console.log(output);
```

## **Documentation**

*See [Examples](https://github.com/colgatto/Poliparser/tree/master/Examples) for all block types.*

### Add Module

You can add a new parser module with the second parameter of the constructor or with the setModule method.
```js
let p = new Poliparser({
	val: {
		f: 'my_parse_block',
		value: 3
	}
},{
	my_parse_block: (data, block) => {
		return data.map(x => x * block.value);
	}
});

let out = p.run([1,2,3]);

console.log(out.val);
```

same as

```js
let p = new Poliparser({
	val: {
		f: 'my_parse_block',
		value: 3
	}
});

p.setModule('my_parse_block', (data, block) => {
	return data.map(x => x * block.value);
});

let out = p.run([1,2,3]);

console.log(out.val);
```

**output**
```js
[ 3, 6, 9 ]
```

### Add Library

You can add a new library with the setLibrary method.

```js
let p = new Poliparser({
	val_mul: {
		f: 'myLib_mul',
		value: 3
	},
	val_sum: {
		f: 'myLib_sum',
		value: 2
	},
});

p.setLibrary('myLib', {

	mul: (data, block) => {
		return data * block.value;
	},

	sum: (data, block) => {
		return data + block.value;
	}

});

let out = p.run(10);

console.log(out);
```

**output**

```js
{
	val_mul: 30,
	val_sum: 12
}
```